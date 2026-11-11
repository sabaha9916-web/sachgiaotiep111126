import {
  authenticateUser,
  removeSession,
  getUserByToken,
  getUsers,
  adminRegisterUser,
  adminUpdateUser,
  adminResetDevice,
  adminDeleteUser,
  checkUserStatus,
} from './authService.js';

function readJsonBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (typeof req.body === 'string') {
      try {
        return resolve(JSON.parse(req.body));
      } catch {
        return resolve({});
      }
    }
    if (req.readableEnded) {
      return resolve({});
    }

    let body = '';
    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      }
    }, 400);

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (!settled) {
        settled = true;
        clearTimeout(timeout);
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      }
    });

    req.on('error', () => {
      if (!settled) {
        settled = true;
        clearTimeout(timeout);
        resolve({});
      }
    });
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

function extractToken(req) {
  const authHeader = req.headers['authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return '';
}

export async function handleAuthApi(req, res, pathname) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Device-Id',
    });
    res.end();
    return true;
  }

  // 1. POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const { identifier, password, deviceId, deviceInfo } = body;
    const result = authenticateUser(identifier, password, deviceId, deviceInfo);
    if (!result.success) {
      sendJson(res, 400, result);
    } else {
      sendJson(res, 200, result);
    }
    return true;
  }

  // 2. POST /api/auth/logout
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const token = extractToken(req);
    const body = await readJsonBody(req);
    removeSession(token || body.token);
    sendJson(res, 200, { success: true, message: 'Đã đăng xuất thành công.' });
    return true;
  }

  // 3. GET /api/auth/me
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const token = extractToken(req);
    const deviceId = req.headers['x-device-id'] || '';
    const authResult = getUserByToken(token, deviceId);

    if (!authResult) {
      sendJson(res, 401, { success: false, error: 'Chưa đăng nhập hoặc phiên đã hết hạn.' });
      return true;
    }

    if (authResult.deviceMismatch) {
      sendJson(res, 403, {
        success: false,
        deviceMismatch: true,
        error:
          'Tài khoản này đang được sử dụng trên một thiết bị khác. Mỗi tài khoản chỉ được dùng trên 1 thiết bị duy nhất.',
      });
      return true;
    }

    const { user } = authResult;
    const status = checkUserStatus(user);

    sendJson(res, 200, {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName || user.email,
        role: user.role,
        startDate: user.startDate,
        durationMonths: user.durationMonths,
        expireDate: user.expireDate,
        isApproved: user.isApproved,
        boundDeviceId: user.boundDeviceId,
        deviceInfo: user.deviceInfo,
        status,
      },
    });
    return true;
  }

  // === ADMIN ENDPOINTS (Require admin role) ===
  if (pathname.startsWith('/api/admin/')) {
    const token = extractToken(req);
    const authResult = getUserByToken(token);

    if (!authResult || !authResult.user || authResult.user.role !== 'admin') {
      sendJson(res, 403, {
        success: false,
        error: 'Quyền truy cập bị từ chối. Chỉ tài khoản Admin mới có thể thực hiện thao tác này.',
      });
      return true;
    }

    // GET /api/admin/users
    if (pathname === '/api/admin/users' && req.method === 'GET') {
      const users = getUsers();
      const sanitized = users.map((u) => ({
        ...u,
        status: checkUserStatus(u),
      }));
      sendJson(res, 200, { success: true, users: sanitized });
      return true;
    }

    // POST /api/admin/users (Create new member)
    if (pathname === '/api/admin/users' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = adminRegisterUser(body);
      if (!result.success) {
        sendJson(res, 400, result);
      } else {
        sendJson(res, 201, result);
      }
      return true;
    }

    // Match /api/admin/users/:id/...
    const userRouteMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)(\/(.*))?$/);
    if (userRouteMatch) {
      const userId = userRouteMatch[1];
      const subAction = userRouteMatch[3] || '';

      // POST /api/admin/users/:id/reset-device
      if (subAction === 'reset-device' && req.method === 'POST') {
        const result = adminResetDevice(userId);
        sendJson(res, result.success ? 200 : 400, result);
        return true;
      }

      // POST /api/admin/users/:id/toggle-approval
      if (subAction === 'toggle-approval' && req.method === 'POST') {
        const users = getUsers();
        const user = users.find((u) => u.id === userId);
        if (!user) {
          sendJson(res, 404, { success: false, error: 'Không tìm thấy người dùng.' });
          return true;
        }
        const result = adminUpdateUser(userId, { isApproved: !user.isApproved });
        sendJson(res, result.success ? 200 : 400, result);
        return true;
      }

      // PUT /api/admin/users/:id
      if (!subAction && req.method === 'PUT') {
        const body = await readJsonBody(req);
        const result = adminUpdateUser(userId, body);
        sendJson(res, result.success ? 200 : 400, result);
        return true;
      }

      // DELETE /api/admin/users/:id
      if (!subAction && req.method === 'DELETE') {
        const result = adminDeleteUser(userId);
        sendJson(res, result.success ? 200 : 400, result);
        return true;
      }
    }
  }

  return false;
}
