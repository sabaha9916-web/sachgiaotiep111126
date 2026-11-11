import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json');

// Helper to format date YYYY-MM-DD
export function formatDate(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate endDate given startDate and duration in months
export function calculateEndDate(startDateStr, months) {
  const numMonths = Math.max(1, parseInt(months, 10) || 1);
  const [y, m, d] = (startDateStr || formatDate()).split('-').map(Number);
  const target = new Date(y, m - 1 + numMonths, d);
  return formatDate(target);
}

// Check if expired
export function isAccountExpired(endDateStr) {
  if (!endDateStr) return false;
  const today = formatDate();
  return today > endDateStr;
}

// Compute days remaining
export function calculateDaysRemaining(endDateStr) {
  if (!endDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = endDateStr.split('-').map(Number);
  const end = new Date(y, m - 1, d);
  end.setHours(0, 0, 0, 0);
  const diffMs = end.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// Check detailed user status
export function checkUserDetailedStatus(u) {
  if (u.role === 'admin') {
    return {
      isValid: true,
      isApproved: true,
      isExpired: false,
      daysLeft: 99999,
      statusLabel: 'Quản trị viên',
      message: 'Toàn quyền truy cập Trang 1 đến Trang 96',
    };
  }

  const isApproved = Boolean(u.approved);
  const expired = isAccountExpired(u.endDate || u.expireDate);
  const daysLeft = calculateDaysRemaining(u.endDate || u.expireDate);
  const isLocked = u.status === 'locked';

  const today = formatDate();
  const notStarted = Boolean(u.startDate && u.startDate > today);

  let statusLabel = 'Đang hoạt động';
  let message = 'Tài khoản hợp lệ, có thể truy cập Trang 1 đến Trang 96';
  let isValid = true;

  if (isLocked) {
    statusLabel = 'Đã khóa';
    message = 'Tài khoản đã bị Admin tạm khóa.';
    isValid = false;
  } else if (!isApproved) {
    statusLabel = 'Chờ kiểm duyệt';
    message = 'Tài khoản đang chờ Admin kiểm duyệt cho phép đăng nhập.';
    isValid = false;
  } else if (expired) {
    statusLabel = 'Hết hạn';
    message = `Tài khoản đã hết hạn (${u.endDate || u.expireDate}). Vui lòng liên hệ Admin để gia hạn.`;
    isValid = false;
  } else if (notStarted) {
    statusLabel = 'Chưa đến ngày';
    message = `Tài khoản có hiệu lực từ ngày ${u.startDate}.`;
    isValid = false;
  }

  return {
    isValid,
    isApproved,
    isExpired: expired,
    notStarted,
    daysLeft,
    statusLabel,
    message,
  };
}

// Persistence and session management
export function saveDb(data) {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Token session management
export const SESSIONS = new Map();

// Tự động xóa tài khoản học viên khi hết thời hạn sử dụng
export function purgeExpiredAccounts(data) {
  if (!data || !Array.isArray(data.users)) return { purgedCount: 0, purgedUsers: [] };
  const initialCount = data.users.length;
  const today = formatDate();
  const purgedUsers = [];

  const remainingUsers = [];
  for (const u of data.users) {
    if (u.role === 'admin') {
      remainingUsers.push(u);
      continue;
    }
    const end = u.endDate || u.expireDate || calculateEndDate(u.startDate || today, u.durationMonths || 1);
    if (isAccountExpired(end)) {
      purgedUsers.push({
        id: u.id,
        email: u.gmail || u.email,
        fullName: u.fullName || '',
        endDate: end
      });
      // Invalidate any active session for this user
      for (const [token, session] of SESSIONS.entries()) {
        if (session.userId === u.id || session.email === (u.gmail || u.email)) {
          SESSIONS.delete(token);
        }
      }
    } else {
      remainingUsers.push(u);
    }
  }

  if (purgedUsers.length > 0) {
    data.users = remainingUsers;
    saveDb(data);
    console.log(
      `[Tự động xóa tài khoản học viên hết hạn] Đã xóa ${purgedUsers.length} tài khoản:`,
      purgedUsers.map(p => `${p.email} (hết hạn ngày: ${p.endDate})`).join(', ')
    );
  }

  return { purgedCount: purgedUsers.length, purgedUsers };
}

// Định kỳ kiểm tra và tự động xóa tài khoản học viên hết hạn mỗi 30 giây
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    try {
      const db = ensureDb();
      purgeExpiredAccounts(db);
    } catch (err) {
      console.error('Error during automatic expired accounts cleanup:', err);
    }
  }, 30 * 1000);
}

// Initial DB seed & Migration
function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultAdmin = {
    username: 'admin',
    password: 'beihai9916@',
    role: 'admin',
    fullName: 'Quản trị viên Hệ thống (Admin)',
    createdAt: new Date().toISOString()
  };

  if (!fs.existsSync(ACCOUNTS_FILE)) {
    const today = formatDate();
    const demoEndDate = calculateEndDate(today, 6);
    const initialData = {
      admin: defaultAdmin,
      users: [
        {
          id: 'usr_sample_hocvien',
          gmail: 'hocvien@gmail.com',
          password: '123456@Hocvien',
          fullName: 'Học viên mẫu',
          approved: true,
          status: 'active', // active | pending | locked | expired
          startDate: today,
          durationMonths: 6,
          endDate: demoEndDate,
          deviceId: null, // First device to login will bind here
          deviceName: null,
          lastLoginAt: null,
          createdAt: new Date().toISOString(),
          note: 'Tài khoản học viên mẫu 6 tháng'
        }
      ]
    };
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(ACCOUNTS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    
    // Ensure admin credentials always strictly adhere to prompt:
    // admin / beihai9916@
    if (!data.admin) {
      data.admin = defaultAdmin;
    } else {
      data.admin.username = 'admin';
      data.admin.password = 'beihai9916@';
      data.admin.role = 'admin';
    }

    if (!Array.isArray(data.users)) {
      data.users = [];
    }

    // Normalize any legacy user properties
    data.users = data.users.map(u => {
      const email = u.gmail || u.email || '';
      const start = u.startDate || formatDate();
      const months = u.durationMonths || 1;
      const end = u.endDate || u.expireDate || calculateEndDate(start, months);
      return {
        ...u,
        gmail: email,
        email: email,
        startDate: start,
        durationMonths: months,
        endDate: end,
        expireDate: end,
        approved: u.approved !== undefined ? Boolean(u.approved) : Boolean(u.isApproved),
        isApproved: u.approved !== undefined ? Boolean(u.approved) : Boolean(u.isApproved),
        deviceId: u.deviceId || u.boundDeviceId || null,
        boundDeviceId: u.deviceId || u.boundDeviceId || null,
        deviceName: u.deviceName || u.deviceInfo || null,
        deviceInfo: u.deviceName || u.deviceInfo || null,
      };
    });

    // Cứ hết thời hạn, tự động xóa tài khoản học viên
    purgeExpiredAccounts(data);

    return data;
  } catch (err) {
    console.error('Error reading accounts file, re-initializing:', err);
    return ensureDb();
  }
}

function generateSessionToken(payload) {
  const randomStr = crypto.randomBytes(24).toString('hex');
  const token = `tok_${payload.userId || payload.role}_${randomStr}`;
  SESSIONS.set(token, {
    ...payload,
    issuedAt: Date.now()
  });
  return token;
}

function verifyToken(token) {
  if (!token) return null;
  const session = SESSIONS.get(token);
  if (!session) return null;
  // 30 days token expiry
  if (Date.now() - session.issuedAt > 30 * 24 * 60 * 60 * 1000) {
    SESSIONS.delete(token);
    return null;
  }
  return session;
}

// Helper to parse JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  const jsonStr = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonStr),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Device-Id',
  });
  res.end(jsonStr);
}

// Universal sanitized user object supporting both naming formats
function sanitizeUser(u) {
  const email = (u.gmail || u.email || '').toLowerCase();
  const start = u.startDate || formatDate();
  const months = Math.max(1, parseInt(u.durationMonths, 10) || 1);
  const end = u.endDate || u.expireDate || calculateEndDate(start, months);
  const expired = isAccountExpired(end);
  const daysLeft = calculateDaysRemaining(end);
  const devId = u.deviceId || u.boundDeviceId || null;
  const devName = u.deviceName || u.deviceInfo || null;
  const isApproved = Boolean(u.approved || u.isApproved);
  const detailedStatus = checkUserDetailedStatus(u);

  return {
    id: u.id,
    gmail: email,
    email: email,
    fullName: u.fullName || email,
    role: u.role || 'member',
    approved: isApproved,
    isApproved: isApproved,
    status: expired ? 'expired' : (u.status || 'active'),
    startDate: start,
    durationMonths: months,
    endDate: end,
    expireDate: end,
    isExpired: expired,
    daysRemaining: daysLeft,
    hasBoundDevice: false,
    deviceId: devId,
    boundDeviceId: null,
    deviceName: 'Không giới hạn thiết bị',
    deviceInfo: 'Không giới hạn thiết bị',
    lastLoginAt: u.lastLoginAt || null,
    createdAt: u.createdAt || null,
    authProvider: u.authProvider || 'credentials',
    note: u.note || '',
    detailedStatus,
  };
}

export async function handleAuthApi(req, res) {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Device-Id',
    });
    res.end();
    return true;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Check if this is an auth or admin API route
  if (!pathname.startsWith('/api/auth') && !pathname.startsWith('/api/admin')) {
    return false;
  }

  const db = ensureDb();
  // Cứ hết thời hạn, tự động xóa tài khoản học viên
  purgeExpiredAccounts(db);

  // Helper to extract token & device from headers
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const headerDeviceId = req.headers['x-device-id'] || '';

  try {
    // =========================================================================
    // GET /api/auth/registered-google-list
    // Danh sách các Gmail đã được Admin đăng ký / phê duyệt (để học viên đăng nhập nhanh)
    // =========================================================================
    if (pathname === '/api/auth/registered-google-list' && req.method === 'GET') {
      const activeGoogleUsers = db.users
        .filter(u => u.role !== 'admin' && (u.approved || u.isApproved) && u.status !== 'locked')
        .map(u => ({
          email: u.gmail || u.email,
          fullName: u.fullName || (u.gmail || u.email).split('@')[0],
          endDate: u.endDate || u.expireDate,
          daysRemaining: calculateDaysRemaining(u.endDate || u.expireDate),
          isExpired: isAccountExpired(u.endDate || u.expireDate),
          hasBoundDevice: Boolean(u.deviceId || u.boundDeviceId),
        }));
      sendJson(res, 200, { success: true, accounts: activeGoogleUsers });
      return true;
    }

    // =========================================================================
    // 1. POST /api/auth/google-login
    // Thành viên đăng ký / đăng nhập bằng tài khoản Google (Gmail)
    // 1 Thiết bị duy nhất cho mỗi tài khoản Gmail
    // =========================================================================
    if (pathname === '/api/auth/google-login' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const email = (body.email || body.gmail || '').trim().toLowerCase();
      const fullName = (body.fullName || body.name || '').trim();
      const deviceId = (body.deviceId || headerDeviceId || '').trim();
      const deviceName = (body.deviceName || body.deviceInfo || 'Thiết bị không xác định').trim();
      const autoRegister = Boolean(body.autoRegister);

      if (!email || !email.includes('@')) {
        sendJson(res, 400, { success: false, message: 'Vui lòng cung cấp địa chỉ Gmail hợp lệ!' });
        return true;
      }

      if (!deviceId) {
        sendJson(res, 400, {
          success: false,
          message: 'Không nhận diện được mã thiết bị trình duyệt. Vui lòng bật LocalStorage!',
        });
        return true;
      }

      // Check if user exists
      let user = db.users.find(u => (u.gmail || u.email || '').toLowerCase() === email);

      if (!user) {
        if (!autoRegister) {
          sendJson(res, 404, {
            success: false,
            notRegistered: true,
            email,
            message: `Tài khoản Google (${email}) chưa được Admin phê duyệt. Bạn có muốn gửi yêu cầu để Admin phê duyệt cấp quyền sử dụng 6 tháng không?`,
          });
          return true;
        }

        // Auto create registration request for Admin moderation with 6-month prospective duration
        const today = formatDate();
        const defaultMonths = 6;
        const newUser = {
          id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
          gmail: email,
          email: email,
          password: '',
          fullName: fullName || email.split('@')[0],
          approved: false, // Must be approved by Admin
          status: 'pending',
          startDate: today,
          durationMonths: defaultMonths,
          endDate: calculateEndDate(today, defaultMonths),
          deviceId: null,
          boundDeviceId: null,
          deviceName: null,
          deviceInfo: null,
          lastLoginAt: null,
          createdAt: new Date().toISOString(),
          authProvider: 'google',
          note: 'Đăng ký bằng Tài khoản Google - Chờ Admin phê duyệt cấp 6 tháng'
        };

        db.users.push(newUser);
        saveDb(db);

        sendJson(res, 202, {
          success: false,
          pendingApproval: true,
          email,
          message: `Đã gửi yêu cầu đăng ký Google (${email}) thành công! Vui lòng chờ Admin phê duyệt (thời hạn 6 tháng tính từ thời điểm được duyệt).`,
        });
        return true;
      }

      // User exists -> Check status
      if (user.status === 'locked') {
        sendJson(res, 403, {
          success: false,
          message: 'Tài khoản Google này đã bị khóa bởi Admin. Vui lòng liên hệ để được hỗ trợ.',
        });
        return true;
      }

      if (!user.approved && !user.isApproved) {
        sendJson(res, 403, {
          success: false,
          pendingApproval: true,
          message: `Tài khoản Google (${email}) đang chờ Admin phê duyệt. Khi Admin phê duyệt, tài khoản sẽ được cấp thời hạn sử dụng 6 tháng!`,
        });
        return true;
      }

      const endDate = user.endDate || user.expireDate;
      if (isAccountExpired(endDate)) {
        // Cứ hết thời hạn, tự động xóa tài khoản học viên
        db.users = db.users.filter(u => u.id !== user.id);
        saveDb(db);
        for (const [t, s] of SESSIONS.entries()) {
          if (s.userId === user.id || s.email === email) SESSIONS.delete(t);
        }
        sendJson(res, 403, {
          success: false,
          expired: true,
          deleted: true,
          message: `Tài khoản (${email}) đã hết thời hạn sử dụng (${endDate}) và đã được hệ thống tự động xóa!`,
        });
        return true;
      }

      // Không giới hạn thiết bị: Học viên có thể sử dụng trên máy tính, điện thoại, máy tính bảng...
      user.lastLoginAt = new Date().toISOString();
      user.deviceId = deviceId || user.deviceId || null;
      user.boundDeviceId = null;
      user.deviceName = deviceName || 'Không giới hạn thiết bị';
      user.deviceInfo = 'Không giới hạn thiết bị';
      if (fullName && (!user.fullName || user.fullName === email)) {
        user.fullName = fullName;
      }
      saveDb(db);

      const sessionToken = generateSessionToken({ userId: user.id, role: 'member', email, deviceId });
      const sanitized = sanitizeUser(user);

      sendJson(res, 200, {
        success: true,
        token: sessionToken,
        user: sanitized,
        message: 'Đăng nhập bằng tài khoản Google thành công!',
      });
      return true;
    }

    // =========================================================================
    // 2. POST /api/auth/login
    // Đăng nhập bằng tên đăng nhập / Gmail và mật khẩu
    // Tài khoản Admin: "admin" / "beihai9916@"
    // =========================================================================
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const identifier = (body.identifier || body.username || body.gmail || body.email || '').trim();
      const password = (body.password || '').trim();
      const deviceId = (body.deviceId || headerDeviceId || '').trim();
      const deviceName = (body.deviceName || body.deviceInfo || 'Thiết bị không xác định').trim();

      if (!identifier || !password) {
        sendJson(res, 400, { success: false, message: 'Vui lòng nhập tài khoản / Gmail và mật khẩu!' });
        return true;
      }

      // Check ADMIN LOGIN
      // Prompt requirement: tạo tài khoản "admin" có mật khẩu là "beihai9916@"
      if (identifier === 'admin' || identifier.toLowerCase() === 'admin') {
        const validAdminPass = (password === 'beihai9916@' || password === 'Beihai9916@');
        if (validAdminPass) {
          const sessionToken = generateSessionToken({ userId: 'admin', role: 'admin' });
          const adminObj = {
            id: 'admin',
            email: 'admin',
            gmail: 'admin',
            fullName: 'Quản trị viên Hệ thống (Admin)',
            role: 'admin',
            approved: true,
            isApproved: true,
            status: 'active',
            isExpired: false,
            daysRemaining: 99999,
            startDate: '2026-01-01',
            endDate: '2099-12-31',
            expireDate: '2099-12-31',
            durationMonths: 999,
            deviceId: null,
            boundDeviceId: null,
            deviceName: 'Toàn quyền (Không giới hạn thiết bị)',
            deviceInfo: 'Toàn quyền (Không giới hạn thiết bị)',
          };
          sendJson(res, 200, {
            success: true,
            token: sessionToken,
            user: adminObj,
          });
          return true;
        } else {
          sendJson(res, 401, { success: false, message: 'Mật khẩu tài khoản admin không chính xác!' });
          return true;
        }
      }

      // Check MEMBER GMAIL LOGIN
      const cleanEmail = identifier.toLowerCase();
      const user = db.users.find(u => (u.gmail || u.email || '').toLowerCase() === cleanEmail);

      if (!user) {
        sendJson(res, 404, { 
          success: false, 
          message: `Không tìm thấy tài khoản Gmail "${identifier}"! Vui lòng liên hệ Admin để đăng ký hoặc đăng nhập bằng Google.` 
        });
        return true;
      }

      if (user.password && user.password !== password) {
        sendJson(res, 401, { success: false, message: 'Mật khẩu không chính xác!' });
        return true;
      }

      // Check approval
      if (!user.approved && !user.isApproved) {
        sendJson(res, 403, { 
          success: false, 
          message: 'Tài khoản đang chờ Admin kiểm duyệt! Vui lòng liên hệ Admin để được cấp quyền đăng nhập.' 
        });
        return true;
      }

      // Check locked status
      if (user.status === 'locked') {
        sendJson(res, 403, { 
          success: false, 
          message: 'Tài khoản của bạn đã bị khóa bởi Admin. Vui lòng liên hệ để được hỗ trợ.' 
        });
        return true;
      }

      // Check expiration
      const endDate = user.endDate || user.expireDate;
      if (isAccountExpired(endDate)) {
        // Cứ hết thời hạn, tự động xóa tài khoản học viên
        db.users = db.users.filter(u => u.id !== user.id);
        saveDb(db);
        for (const [t, s] of SESSIONS.entries()) {
          if (s.userId === user.id) SESSIONS.delete(t);
        }
        sendJson(res, 403, { 
          success: false, 
          expired: true,
          deleted: true,
          message: `Tài khoản đã hết thời hạn sử dụng (${endDate}) và đã được hệ thống tự động xóa!` 
        });
        return true;
      }

      // Không giới hạn thiết bị
      user.lastLoginAt = new Date().toISOString();
      user.deviceId = deviceId || user.deviceId || null;
      user.boundDeviceId = null;
      user.deviceName = deviceName || 'Không giới hạn thiết bị';
      user.deviceInfo = 'Không giới hạn thiết bị';
      saveDb(db);

      const sessionToken = generateSessionToken({ userId: user.id, role: 'member', email: user.gmail, deviceId });
      sendJson(res, 200, {
        success: true,
        token: sessionToken,
        user: sanitizeUser(user)
      });
      return true;
    }

    // =========================================================================
    // 3. POST /api/auth/register-request
    // Thành viên tự gửi yêu cầu đăng ký Gmail để Admin kiểm duyệt
    // =========================================================================
    if (pathname === '/api/auth/register-request' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const gmail = (body.gmail || body.email || '').trim().toLowerCase();
      const password = (body.password || '123456').trim();
      const fullName = (body.fullName || '').trim() || gmail.split('@')[0];
      const note = (body.note || '').trim();

      if (!gmail || !gmail.includes('@')) {
        sendJson(res, 400, { success: false, message: 'Địa chỉ Gmail không hợp lệ!' });
        return true;
      }

      const existing = db.users.find(u => (u.gmail || u.email || '').toLowerCase() === gmail);
      if (existing) {
        sendJson(res, 409, { 
          success: false, 
          message: 'Gmail này đã tồn tại trong hệ thống! Vui lòng đăng nhập hoặc liên hệ Admin.' 
        });
        return true;
      }

      const today = formatDate();
      const defaultMonths = 1;
      const newUser = {
        id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
        gmail,
        email: gmail,
        password,
        fullName,
        approved: false, // Must be approved by admin
        isApproved: false,
        status: 'pending',
        startDate: today,
        durationMonths: defaultMonths,
        endDate: calculateEndDate(today, defaultMonths),
        expireDate: calculateEndDate(today, defaultMonths),
        deviceId: null,
        boundDeviceId: null,
        deviceName: null,
        deviceInfo: null,
        lastLoginAt: null,
        createdAt: new Date().toISOString(),
        authProvider: 'request',
        note: note ? `Yêu cầu tự đăng ký: ${note}` : 'Yêu cầu tự đăng ký từ trang Đăng nhập'
      };

      db.users.push(newUser);
      saveDb(db);

      sendJson(res, 201, {
        success: true,
        message: 'Gửi yêu cầu đăng ký thành công! Tài khoản đang chờ Admin kiểm duyệt và cấp thời hạn vào học.',
        user: sanitizeUser(newUser)
      });
      return true;
    }

    // =========================================================================
    // 4. GET /api/auth/session & GET /api/auth/me
    // Kiểm tra trạng thái phiên làm việc hiện tại
    // =========================================================================
    if ((pathname === '/api/auth/session' || pathname === '/api/auth/me') && req.method === 'GET') {
      const sess = verifyToken(token);
      if (!sess) {
        sendJson(res, 401, { valid: false, success: false, message: 'Chưa đăng nhập hoặc phiên làm việc đã hết hạn!' });
        return true;
      }

      if (sess.role === 'admin') {
        const adminObj = {
          id: 'admin',
          gmail: 'admin',
          email: 'admin',
          fullName: 'Quản trị viên Hệ thống (Admin)',
          role: 'admin',
          approved: true,
          isApproved: true,
          status: 'active',
          isExpired: false,
          daysRemaining: 99999,
          startDate: '2026-01-01',
          endDate: '2099-12-31',
          expireDate: '2099-12-31',
          durationMonths: 999,
          deviceId: null,
          boundDeviceId: null,
          deviceName: 'Không giới hạn thiết bị',
          deviceInfo: 'Không giới hạn thiết bị',
        };
        sendJson(res, 200, {
          valid: true,
          success: true,
          user: adminObj
        });
        return true;
      }

      const user = db.users.find(u => u.id === sess.userId);
      if (!user) {
        sendJson(res, 401, { valid: false, success: false, message: 'Tài khoản không tồn tại!' });
        return true;
      }

      if (!user.approved && !user.isApproved) {
        sendJson(res, 403, { valid: false, success: false, message: 'Tài khoản chưa được Admin phê duyệt!' });
        return true;
      }

      if (user.status === 'locked') {
        sendJson(res, 403, { valid: false, success: false, message: 'Tài khoản đã bị tạm khóa!' });
        return true;
      }

      const endDate = user.endDate || user.expireDate;
      if (isAccountExpired(endDate)) {
        // Cứ hết thời hạn, tự động xóa tài khoản học viên
        db.users = db.users.filter(u => u.id !== user.id);
        saveDb(db);
        SESSIONS.delete(token);
        sendJson(res, 403, { 
          valid: false, 
          success: false, 
          expired: true,
          deleted: true,
          message: `Tài khoản học viên đã hết thời hạn sử dụng (${endDate}) và đã được hệ thống tự động xóa!` 
        });
        return true;
      }

      const sanitized = sanitizeUser(user);
      sendJson(res, 200, {
        valid: true,
        success: true,
        user: sanitized
      });
      return true;
    }

    // =========================================================================
    // 5. POST /api/auth/logout
    // =========================================================================
    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      if (token) {
        SESSIONS.delete(token);
      }
      sendJson(res, 200, { success: true, message: 'Đã đăng xuất thành công!' });
      return true;
    }

    // =========================================================================
    // ADMIN ENDPOINTS (Require admin role)
    // - Đăng ký cho các Gmail
    // - Kiểm duyệt cho đăng nhập
    // - Ngày bắt đầu (ngày/tháng/năm)
    // - Thời hạn (số tháng) tính từ ngày đăng ký
    // - Reset thiết bị để thành viên đổi máy
    // =========================================================================
    if (pathname.startsWith('/api/admin')) {
      const adminSession = verifyToken(token);
      const isAdmin = adminSession && adminSession.role === 'admin';

      if (!isAdmin) {
        sendJson(res, 403, { success: false, message: 'Bạn không có quyền quản trị viên (Admin)!' });
        return true;
      }

      // GET /api/admin/users
      if (pathname === '/api/admin/users' && req.method === 'GET') {
        const usersList = db.users.map(u => ({
          ...sanitizeUser(u),
          password: u.password || '123456', // Admin can view/reset passwords
        }));
        sendJson(res, 200, { success: true, users: usersList });
        return true;
      }

      // POST /api/admin/create-user or POST /api/admin/users
      // Tạo tài khoản Gmail, kiểm duyệt, ngày bắt đầu (ngày/tháng/năm), thời hạn số tháng tính từ ngày đăng ký
      if ((pathname === '/api/admin/create-user' || pathname === '/api/admin/users') && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const gmail = (body.gmail || body.email || '').trim().toLowerCase();
        const password = (body.password || '123456').trim();
        const fullName = (body.fullName || '').trim() || gmail.split('@')[0];
        const startDate = body.startDate ? body.startDate.trim() : formatDate();
        const durationMonths = Math.max(1, parseInt(body.durationMonths, 10) || 1);
        const approved = body.approved !== undefined ? Boolean(body.approved) : (body.isApproved !== undefined ? Boolean(body.isApproved) : true);
        const note = (body.note || '').trim();

        if (!gmail || !gmail.includes('@')) {
          sendJson(res, 400, { success: false, message: 'Vui lòng nhập địa chỉ Gmail hợp lệ!' });
          return true;
        }

        const existing = db.users.find(u => (u.gmail || u.email || '').toLowerCase() === gmail);
        if (existing) {
          sendJson(res, 409, { success: false, message: `Gmail ${gmail} đã tồn tại trong hệ thống!` });
          return true;
        }

        const endDate = calculateEndDate(startDate, durationMonths);
        const newUser = {
          id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
          gmail,
          email: gmail,
          password,
          fullName,
          approved,
          isApproved: approved,
          status: approved ? 'active' : 'pending',
          startDate,
          durationMonths,
          endDate,
          expireDate: endDate,
          deviceId: null, // Empty until they log in on their 1 allowed device
          boundDeviceId: null,
          deviceName: null,
          deviceInfo: null,
          lastLoginAt: null,
          createdAt: new Date().toISOString(),
          note
        };

        db.users.unshift(newUser);
        saveDb(db);

        sendJson(res, 201, {
          success: true,
          message: `Đã đăng ký tài khoản Gmail ${gmail} với thời hạn ${durationMonths} tháng thành công!`,
          user: { ...sanitizeUser(newUser), password: newUser.password }
        });
        return true;
      }

      // Check pattern /api/admin/users/:id/...
      const userMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)(\/(.*))?$/);
      if (userMatch) {
        const targetId = userMatch[1];
        const subAction = userMatch[3] || '';
        const user = db.users.find(u => u.id === targetId);

        if (!user) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản!' });
          return true;
        }

        // POST /api/admin/users/:id/reset-device
        if (subAction === 'reset-device' && req.method === 'POST') {
          const oldDevice = user.deviceName || user.deviceInfo || user.deviceId || 'thiết bị cũ';
          user.deviceId = null;
          user.boundDeviceId = null;
          user.deviceName = null;
          user.deviceInfo = null;
          saveDb(db);
          sendJson(res, 200, {
            success: true,
            message: `Đã reset thiết bị (${oldDevice}) cho tài khoản ${user.gmail || user.email}. Học viên có thể đăng nhập trên thiết bị mới!`,
            user: sanitizeUser(user),
          });
          return true;
        }

        // POST /api/admin/users/:id/toggle-approval
        if (subAction === 'toggle-approval' && req.method === 'POST') {
          const newStatus = !(user.approved || user.isApproved);
          user.approved = newStatus;
          user.isApproved = newStatus;
          if (newStatus) {
            // Khi phê duyệt: thời điểm phê duyệt được sử dụng 6 tháng
            user.startDate = formatDate();
            user.durationMonths = 6;
            user.endDate = calculateEndDate(user.startDate, 6);
            user.expireDate = user.endDate;
            user.status = 'active';
          }
          saveDb(db);
          sendJson(res, 200, {
            success: true,
            message: newStatus 
              ? `Đã phê duyệt tài khoản ${user.gmail || user.email}! Thời hạn sử dụng 6 tháng từ hôm nay đến ${user.endDate}.`
              : `Đã tạm ngưng phê duyệt tài khoản ${user.gmail || user.email}!`,
            user: sanitizeUser(user),
          });
          return true;
        }

        // PUT /api/admin/users/:id
        if (!subAction && req.method === 'PUT') {
          const body = await parseJsonBody(req);
          if (body.gmail) user.gmail = body.gmail.trim().toLowerCase();
          if (body.email) user.email = body.email.trim().toLowerCase();
          if (body.password) user.password = body.password.trim();
          if (body.fullName !== undefined) user.fullName = body.fullName.trim();
          if (body.approved !== undefined) {
            user.approved = Boolean(body.approved);
            user.isApproved = Boolean(body.approved);
          }
          if (body.isApproved !== undefined) {
            user.approved = Boolean(body.isApproved);
            user.isApproved = Boolean(body.isApproved);
          }
          if (body.status) user.status = body.status;
          if (body.startDate) user.startDate = body.startDate.trim();
          if (body.durationMonths !== undefined) {
            user.durationMonths = Math.max(1, parseInt(body.durationMonths, 10) || 1);
          }
          if (body.note !== undefined) user.note = body.note.trim();

          user.endDate = calculateEndDate(user.startDate, user.durationMonths);
          user.expireDate = user.endDate;

          saveDb(db);
          sendJson(res, 200, {
            success: true,
            message: 'Cập nhật tài khoản thành công!',
            user: { ...sanitizeUser(user), password: user.password },
          });
          return true;
        }

        // DELETE /api/admin/users/:id
        if (!subAction && (req.method === 'DELETE' || req.method === 'POST')) {
          const idx = db.users.findIndex(u => u.id === targetId);
          if (idx !== -1) {
            const deleted = db.users.splice(idx, 1)[0];
            saveDb(db);
            sendJson(res, 200, {
              success: true,
              message: `Đã xóa tài khoản ${deleted.gmail || deleted.email} khỏi hệ thống!`,
            });
            return true;
          }
        }
      }

      // PUT /api/admin/update-user
      if (pathname === '/api/admin/update-user' && req.method === 'PUT') {
        const body = await parseJsonBody(req);
        const id = body.id;
        const user = db.users.find(u => u.id === id);
        if (!user) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản!' });
          return true;
        }

        if (body.gmail) user.gmail = body.gmail.trim().toLowerCase();
        if (body.email) user.email = body.email.trim().toLowerCase();
        if (body.password) user.password = body.password.trim();
        if (body.fullName !== undefined) user.fullName = body.fullName.trim();
        if (body.approved !== undefined) {
          user.approved = Boolean(body.approved);
          user.isApproved = Boolean(body.approved);
          if (user.approved && user.status === 'pending') {
            user.status = 'active';
          }
        }
        if (body.isApproved !== undefined) {
          user.approved = Boolean(body.isApproved);
          user.isApproved = Boolean(body.isApproved);
          if (user.approved && user.status === 'pending') {
            user.status = 'active';
          }
        }
        if (body.status) user.status = body.status;
        if (body.startDate) user.startDate = body.startDate.trim();
        if (body.durationMonths !== undefined) {
          user.durationMonths = Math.max(1, parseInt(body.durationMonths, 10) || 1);
        }
        if (body.note !== undefined) user.note = body.note.trim();

        // Recompute endDate
        user.endDate = calculateEndDate(user.startDate, user.durationMonths);
        user.expireDate = user.endDate;

        saveDb(db);
        sendJson(res, 200, {
          success: true,
          message: 'Cập nhật tài khoản thành công!',
          user: { ...sanitizeUser(user), password: user.password }
        });
        return true;
      }

      // POST /api/admin/reset-device
      if (pathname === '/api/admin/reset-device' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const id = body.id || body.userId;
        const user = db.users.find(u => u.id === id);
        if (!user) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản!' });
          return true;
        }

        const oldDevice = user.deviceName || user.deviceInfo || user.deviceId || 'thiết bị cũ';
        user.deviceId = null;
        user.boundDeviceId = null;
        user.deviceName = null;
        user.deviceInfo = null;
        saveDb(db);

        sendJson(res, 200, {
          success: true,
          message: `Đã xóa liên kết thiết bị (${oldDevice}) của tài khoản ${user.gmail || user.email}. Thành viên có thể đăng nhập trên thiết bị mới!`,
          user: sanitizeUser(user)
        });
        return true;
      }

      // POST /api/admin/toggle-approval
      if (pathname === '/api/admin/toggle-approval' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const id = body.id || body.userId;
        const user = db.users.find(u => u.id === id);
        if (!user) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản!' });
          return true;
        }

        const newStatus = !(user.approved || user.isApproved);
        user.approved = newStatus;
        user.isApproved = newStatus;
        if (newStatus) {
          // Khi phê duyệt: thời điểm phê duyệt được sử dụng 6 tháng
          user.startDate = formatDate();
          user.durationMonths = 6;
          user.endDate = calculateEndDate(user.startDate, 6);
          user.expireDate = user.endDate;
          user.status = 'active';
        }
        saveDb(db);

        sendJson(res, 200, {
          success: true,
          message: newStatus
            ? `Đã phê duyệt tài khoản ${user.gmail || user.email}! Thời hạn sử dụng 6 tháng tính từ hôm nay đến ${user.endDate}.`
            : `Đã tạm ngưng phê duyệt tài khoản ${user.gmail || user.email}!`,
          user: sanitizeUser(user)
        });
        return true;
      }

      // POST /api/admin/batch-approve or POST /api/admin/batch-register
      // Admin đăng ký mới / phê duyệt nhiều tài khoản Gmail đăng nhập Google cùng lúc
      if ((pathname === '/api/admin/batch-approve' || pathname === '/api/admin/batch-register') && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const emailList = [];

        // Hỗ trợ cả mảng emails và chuỗi văn bản copy từ clipboard/excel/word/zalo
        if (Array.isArray(body.emails)) {
          emailList.push(...body.emails);
        }
        if (typeof body.rawText === 'string' && body.rawText.trim()) {
          const matched = body.rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
          emailList.push(...matched);
        }

        // Làm sạch và lọc các email duy nhất (chữ thường)
        const uniqueEmails = Array.from(
          new Set(
            emailList
              .map(e => (typeof e === 'string' ? e.trim().toLowerCase() : ''))
              .filter(e => e && e.includes('@'))
          )
        );

        if (uniqueEmails.length === 0) {
          sendJson(res, 400, {
            success: false,
            message: 'Không tìm thấy địa chỉ Gmail hợp lệ nào trong danh sách được cung cấp!',
          });
          return true;
        }

        const approvalDate = body.startDate && typeof body.startDate === 'string' && body.startDate.trim() 
          ? body.startDate.trim() 
          : formatDate();
        const durationMonths = Math.max(1, parseInt(body.durationMonths, 10) || 6);
        const isApproved = body.approved !== undefined ? Boolean(body.approved) : true;
        const noteStr = body.note && typeof body.note === 'string' ? body.note.trim() : '';
        const projectedEnd = calculateEndDate(approvalDate, durationMonths);
        let addedCount = 0;
        let updatedCount = 0;
        const processedUsers = [];

        for (const email of uniqueEmails) {
          let user = db.users.find(u => (u.gmail || u.email || '').toLowerCase() === email);

          if (user) {
            // Cập nhật người dùng hiện có: phê duyệt và cấp thời hạn
            user.approved = isApproved;
            user.isApproved = isApproved;
            user.status = isApproved ? 'active' : 'pending';
            user.startDate = approvalDate;
            user.durationMonths = durationMonths;
            user.endDate = projectedEnd;
            user.expireDate = projectedEnd;
            user.authProvider = 'google';
            const extraNote = noteStr || `Đăng ký Google (${durationMonths} tháng)`;
            user.note = (user.note ? user.note + ' | ' : '') + extraNote;
            updatedCount++;
            processedUsers.push(sanitizeUser(user));
          } else {
            // Tạo mới người dùng đăng nhập Google: phê duyệt, thời hạn từ startDate, tuân thủ chính sách 1 thiết bị
            const newUser = {
              id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
              gmail: email,
              email: email,
              password: '123456',
              fullName: email.split('@')[0],
              approved: isApproved,
              isApproved: isApproved,
              status: isApproved ? 'active' : 'pending',
              startDate: approvalDate,
              durationMonths,
              endDate: projectedEnd,
              expireDate: projectedEnd,
              deviceId: null,
              boundDeviceId: null,
              deviceName: null,
              deviceInfo: null,
              lastLoginAt: null,
              createdAt: new Date().toISOString(),
              authProvider: 'google',
              note: noteStr || `Đăng ký tài khoản Google (${durationMonths} tháng từ ${approvalDate})`,
            };
            db.users.unshift(newUser);
            addedCount++;
            processedUsers.push(sanitizeUser(newUser));
          }
        }

        saveDb(db);

        sendJson(res, 200, {
          success: true,
          message: `Đã đăng ký thành công ${uniqueEmails.length} tài khoản Google với thời hạn ${durationMonths} tháng (từ ${approvalDate} đến ${projectedEnd})!`,
          total: uniqueEmails.length,
          added: addedCount,
          updated: updatedCount,
          emails: uniqueEmails,
          startDate: approvalDate,
          endDate: projectedEnd,
          durationMonths,
          users: db.users.map(u => ({ ...sanitizeUser(u), password: u.password || '123456' })),
        });
        return true;
      }

      // POST /api/admin/extend-subscription
      // Gia hạn số tháng
      if (pathname === '/api/admin/extend-subscription' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const id = body.id || body.userId;
        const addMonths = parseInt(body.addMonths, 10) || 1;
        const user = db.users.find(u => u.id === id);
        if (!user) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản!' });
          return true;
        }

        const currentEnd = user.endDate || user.expireDate;
        if (isAccountExpired(currentEnd)) {
          user.startDate = formatDate();
          user.durationMonths = addMonths;
        } else {
          user.durationMonths = (user.durationMonths || 1) + addMonths;
        }
        user.endDate = calculateEndDate(user.startDate, user.durationMonths);
        user.expireDate = user.endDate;
        user.approved = true;
        user.isApproved = true;
        user.status = 'active';

        saveDb(db);
        sendJson(res, 200, {
          success: true,
          message: `Đã gia hạn thêm ${addMonths} tháng cho tài khoản ${user.gmail || user.email}. Ngày hết hạn mới: ${user.endDate}`,
          user: sanitizeUser(user)
        });
        return true;
      }

      // DELETE /api/admin/delete-user
      if (pathname === '/api/admin/delete-user' && (req.method === 'DELETE' || req.method === 'POST')) {
        const body = await parseJsonBody(req);
        const id = body.id || parsedUrl.searchParams.get('id');
        const index = db.users.findIndex(u => u.id === id);
        if (index === -1) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản để xóa!' });
          return true;
        }

        const deleted = db.users.splice(index, 1)[0];
        saveDb(db);

        sendJson(res, 200, {
          success: true,
          message: `Đã xóa tài khoản ${deleted.gmail || deleted.email} khỏi hệ thống!`
        });
        return true;
      }
    }

    sendJson(res, 404, { success: false, message: 'Route không tồn tại' });
    return true;
  } catch (error) {
    console.error('Auth API Error:', error);
    sendJson(res, 500, { success: false, message: 'Lỗi máy chủ nội bộ: ' + (error.message || error) });
    return true;
  }
}
