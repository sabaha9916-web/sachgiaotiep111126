// Auth Manager and Client Authentication State

export interface AuthUser {
  id: string;
  gmail: string;
  fullName: string;
  role: 'admin' | 'member';
  approved: boolean;
  status: 'active' | 'pending' | 'locked' | 'expired';
  startDate?: string;
  durationMonths?: number;
  endDate?: string;
  isExpired?: boolean;
  daysRemaining?: number;
  hasBoundDevice?: boolean;
  deviceId?: string | null;
  deviceName?: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  password?: string;
  note?: string;
}

const TOKEN_KEY = 'tiengtrung_auth_token';
const USER_KEY = 'tiengtrung_auth_user';
const DEVICE_ID_KEY = 'tiengtrung_device_id';

// Generate or retrieve persistent browser device ID
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server_side';
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    const rand = Math.random().toString(36).substring(2, 10);
    const ts = Date.now().toString(36);
    deviceId = `dev_${rand}_${ts}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

// User-friendly device description
export function getDeviceDescription(): string {
  if (typeof window === 'undefined') return 'Không xác định';
  const ua = navigator.userAgent;
  let os = 'Máy tính';
  if (/Android/i.test(ua)) os = 'Điện thoại Android';
  else if (/iPhone/i.test(ua)) os = 'iPhone';
  else if (/iPad/i.test(ua)) os = 'iPad';
  else if (/Windows/i.test(ua)) os = 'Máy tính Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'Máy tính Mac';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Trình duyệt Web';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  const devId = getOrCreateDeviceId();
  const shortCode = devId.slice(-4).toUpperCase();
  return `${browser} trên ${os} (#${shortCode})`;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: AuthUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// API Calls
export async function apiLogin(usernameOrEmail: string, password: string): Promise<{ success: boolean; token?: string; user?: AuthUser; message?: string; code?: string }> {
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
        username: usernameOrEmail,
        password,
        deviceId,
        deviceName,
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      saveSession(data.token, data.user);
      return { success: true, token: data.token, user: data.user };
    } else {
      return {
        success: false,
        message: data.message || 'Đăng nhập không thành công',
        code: data.code,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ: ' + (err.message || 'Vui lòng kiểm tra lại mạng'),
    };
  }
}

export async function apiRegisterRequest(gmail: string, password: string, fullName?: string, note?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/auth/register-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gmail,
        password,
        fullName,
        note,
      }),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message || (res.ok ? 'Đăng ký thành công!' : 'Đăng ký thất bại!'),
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Lỗi gửi yêu cầu đăng ký: ' + err.message,
    };
  }
}

export async function apiCheckSession(): Promise<{ valid: boolean; user?: AuthUser; message?: string }> {
  const token = getStoredToken();
  if (!token) {
    return { valid: false };
  }

  const deviceId = getOrCreateDeviceId();
  try {
    const res = await fetch(`/api/auth/session?deviceId=${encodeURIComponent(deviceId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Device-Id': deviceId,
      },
    });

    const data = await res.json();
    if (res.ok && data.valid && data.user) {
      saveSession(token, data.user);
      return { valid: true, user: data.user };
    } else {
      clearSession();
      return { valid: false, message: data.message };
    }
  } catch {
    // If network transient, keep current stored session to avoid aggressive kicks
    const stored = getStoredUser();
    return { valid: Boolean(stored), user: stored || undefined };
  }
}

export async function apiLogout(): Promise<void> {
  const token = getStoredToken();
  try {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (e) {
    console.error('Logout error:', e);
  } finally {
    clearSession();
  }
}

// ADMIN API CALLS
export async function apiAdminGetUsers(): Promise<{ success: boolean; users?: AuthUser[]; message?: string }> {
  const token = getStoredToken();
  if (!token) return { success: false, message: 'Chưa đăng nhập' };

  try {
    const res = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function apiAdminCreateUser(payload: {
  gmail: string;
  password?: string;
  fullName?: string;
  startDate?: string;
  durationMonths?: number;
  approved?: boolean;
  note?: string;
}): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function apiAdminUpdateUser(payload: {
  id: string;
  gmail?: string;
  password?: string;
  fullName?: string;
  startDate?: string;
  durationMonths?: number;
  approved?: boolean;
  status?: string;
  note?: string;
}): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/update-user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function apiAdminResetDevice(id: string): Promise<{ success: boolean; message?: string; user?: AuthUser }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/reset-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function apiAdminExtendSubscription(id: string, addMonths: number): Promise<{ success: boolean; message?: string; user?: AuthUser }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/extend-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id, addMonths }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function apiAdminDeleteUser(id: string): Promise<{ success: boolean; message?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/delete-user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
