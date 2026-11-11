import { AuthUser, LoginResponse } from '../types/auth';

const DEVICE_STORAGE_KEY = 'tiengtrung_device_token';
const AUTH_TOKEN_KEY = 'tiengtrung_auth_token';

export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server_device';
  let devId = localStorage.getItem(DEVICE_STORAGE_KEY) || localStorage.getItem('tiengtrung_device_id');
  if (!devId) {
    const randomPart = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    devId = 'dev_' + Date.now().toString(36) + '_' + randomPart;
    localStorage.setItem(DEVICE_STORAGE_KEY, devId);
    localStorage.setItem('tiengtrung_device_id', devId);
  }
  return devId;
}

export function getDeviceDescription(): string {
  if (typeof window === 'undefined') return 'Thiết bị không xác định';
  const ua = navigator.userAgent;
  let os = 'Máy tính';
  if (/Windows/i.test(ua)) os = 'Máy tính Windows';
  else if (/iPhone/i.test(ua)) os = 'Điện thoại iPhone';
  else if (/iPad/i.test(ua)) os = 'Máy tính bảng iPad';
  else if (/Android/i.test(ua)) os = 'Điện thoại Android';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'Máy tính Mac';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Trình duyệt Web';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  const devId = getOrCreateDeviceId();
  const shortCode = devId.slice(-4).toUpperCase();
  return `${browser} trên ${os} (#${shortCode})`;
}

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredAuthToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export async function apiLogin(identifier: string, password: string): Promise<LoginResponse> {
  const deviceId = getOrCreateDeviceId();
  const deviceName = getDeviceDescription();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
      },
      body: JSON.stringify({
        identifier,
        username: identifier,
        gmail: identifier,
        password,
        deviceId,
        deviceName,
        deviceInfo: deviceName,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success && data.token) {
      setStoredAuthToken(data.token);
      return { success: true, token: data.token, user: data.user };
    }
    return {
      success: false,
      error: data.message || data.error || 'Đăng nhập không thành công.',
      message: data.message,
      deviceMismatch: Boolean(data.deviceMismatch || data.code === 'DEVICE_MISMATCH'),
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function apiGoogleLogin(
  email: string,
  fullName?: string,
  autoRegister: boolean = false
): Promise<LoginResponse> {
  const deviceId = getOrCreateDeviceId();
  const deviceName = getDeviceDescription();

  try {
    const res = await fetch('/api/auth/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
      },
      body: JSON.stringify({
        email,
        fullName,
        deviceId,
        deviceName,
        autoRegister,
      }),
    });
    const data = await res.json();

    if (res.ok && data.success && data.token) {
      setStoredAuthToken(data.token);
      return { success: true, token: data.token, user: data.user, message: data.message };
    }

    return {
      success: false,
      error: data.message || data.error || 'Đăng nhập Google không thành công.',
      message: data.message,
      deviceMismatch: Boolean(data.deviceMismatch || data.code === 'DEVICE_MISMATCH'),
      pendingApproval: Boolean(data.pendingApproval),
      notRegistered: Boolean(data.notRegistered),
      isNewRequest: Boolean(data.isNewRequest),
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi kết nối dịch vụ Google.' };
  }
}

export async function apiRegisterRequest(
  gmail: string,
  password: string = '123456',
  fullName?: string,
  note?: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/register-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail, password, fullName, note }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message,
      error: data.message,
    };
  } catch (err: any) {
    return { success: false, error: 'Lỗi gửi yêu cầu đăng ký: ' + err.message };
  }
}

export async function apiLogout(): Promise<void> {
  const token = getStoredAuthToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });
    } catch {
      // ignore
    }
  }
  setStoredAuthToken(null);
}

export async function apiGetMe(): Promise<{
  success: boolean;
  user?: AuthUser;
  error?: string;
  deviceMismatch?: boolean;
}> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };
  const deviceId = getOrCreateDeviceId();

  try {
    const res = await fetch(`/api/auth/session?deviceId=${encodeURIComponent(deviceId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Device-Id': deviceId,
      },
    });

    if (res.status === 401) {
      setStoredAuthToken(null);
      return { success: false, error: 'Phiên đăng nhập đã hết hạn' };
    }

    const data = await res.json();
    if (res.ok && (data.valid || data.success) && data.user) {
      return { success: true, user: data.user };
    }
    return {
      success: false,
      error: data.message || 'Không thể xác thực phiên',
      deviceMismatch: Boolean(data.deviceMismatch || data.code === 'DEVICE_MISMATCH'),
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi kết nối' };
  }
}

// === Admin API calls ===
export async function apiAdminGetUsers(): Promise<{ success: boolean; users?: AuthUser[]; error?: string; message?: string }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch('/api/admin/users', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      users: data.users || [],
      error: data.message || data.error,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi tải danh sách người dùng' };
  }
}

export async function apiAdminCreateUser(payload: {
  email?: string;
  gmail?: string;
  password?: string;
  fullName?: string;
  startDate?: string;
  durationMonths?: number;
  approved?: boolean;
  isApproved?: boolean;
  note?: string;
}): Promise<{ success: boolean; user?: AuthUser; error?: string; message?: string }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  const finalGmail = payload.email || payload.gmail || '';
  const finalApproved = payload.approved !== undefined ? payload.approved : (payload.isApproved !== undefined ? payload.isApproved : true);

  try {
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        gmail: finalGmail,
        email: finalGmail,
        password: payload.password || '123456',
        fullName: payload.fullName,
        startDate: payload.startDate,
        durationMonths: payload.durationMonths,
        approved: finalApproved,
        isApproved: finalApproved,
        note: payload.note,
      }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      user: data.user,
      error: data.message || data.error,
      message: data.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đăng ký người dùng' };
  }
}

export async function apiAdminUpdateUser(
  id: string,
  data: Partial<AuthUser>
): Promise<{ success: boolean; user?: AuthUser; error?: string; message?: string }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch(`/api/admin/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...data }),
    });
    const resData = await res.json();
    return {
      success: res.ok && resData.success,
      user: resData.user,
      error: resData.message || resData.error,
      message: resData.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi cập nhật người dùng' };
  }
}

export async function apiAdminResetDevice(id: string): Promise<{ success: boolean; message?: string; error?: string; user?: AuthUser }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch(`/api/admin/reset-device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message,
      user: data.user,
      error: data.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đặt lại thiết bị' };
  }
}

export async function apiAdminToggleApproval(id: string): Promise<{ success: boolean; user?: AuthUser; message?: string; error?: string }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch(`/api/admin/toggle-approval`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      user: data.user,
      message: data.message,
      error: data.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đổi trạng thái kiểm duyệt' };
  }
}

export async function apiAdminExtendSubscription(
  id: string,
  addMonths: number
): Promise<{ success: boolean; message?: string; error?: string; user?: AuthUser }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch(`/api/admin/extend-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id, addMonths }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message,
      user: data.user,
      error: data.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi gia hạn thời gian' };
  }
}

export async function apiAdminDeleteUser(id: string): Promise<{ success: boolean; message?: string; error?: string }> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch(`/api/admin/delete-user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message,
      error: data.message,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi xóa người dùng' };
  }
}

export interface RegisteredGoogleAccount {
  email: string;
  fullName: string;
  endDate?: string;
  daysRemaining?: number;
  isExpired?: boolean;
  hasBoundDevice?: boolean;
}

export async function apiGetRegisteredGoogleList(): Promise<{
  success: boolean;
  accounts?: RegisteredGoogleAccount[];
  error?: string;
}> {
  try {
    const res = await fetch('/api/auth/registered-google-list');
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, accounts: data.accounts || [] };
    }
    return { success: false, accounts: [], error: data.message };
  } catch (err: any) {
    return { success: false, accounts: [], error: err?.message };
  }
}

export async function apiAdminBatchRegister(payload: {
  emails?: string[];
  rawText?: string;
  durationMonths?: number;
  startDate?: string;
  approved?: boolean;
  note?: string;
}): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  total?: number;
  added?: number;
  updated?: number;
  emails?: string[];
  users?: AuthUser[];
  startDate?: string;
  endDate?: string;
  durationMonths?: number;
}> {
  const token = getStoredAuthToken();
  if (!token) return { success: false, error: 'Chưa đăng nhập' };

  try {
    const res = await fetch('/api/admin/batch-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message,
      error: data.message || data.error,
      total: data.total,
      added: data.added,
      updated: data.updated,
      emails: data.emails,
      users: data.users,
      startDate: data.startDate,
      endDate: data.endDate,
      durationMonths: data.durationMonths,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đăng ký tài khoản hàng loạt' };
  }
}

export async function apiAdminBatchApprove(payload: {
  emails?: string[];
  rawText?: string;
  durationMonths?: number;
  startDate?: string;
  approved?: boolean;
  note?: string;
}): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  total?: number;
  added?: number;
  updated?: number;
  emails?: string[];
  users?: AuthUser[];
  startDate?: string;
  endDate?: string;
}> {
  return apiAdminBatchRegister(payload);
}

