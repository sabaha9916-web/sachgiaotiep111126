export interface UserStatus {
  isValid: boolean;
  isApproved: boolean;
  isExpired: boolean;
  notStarted?: boolean;
  daysLeft: number;
  statusLabel: string;
  message: string;
}

export interface AuthUser {
  id: string;
  email: string;
  gmail?: string;
  fullName: string;
  role: 'admin' | 'member';
  startDate: string;
  durationMonths: number;
  expireDate: string;
  endDate?: string;
  isApproved: boolean;
  approved?: boolean;
  boundDeviceId: string | null;
  deviceId?: string | null;
  deviceInfo: string | null;
  deviceName?: string | null;
  createdAt?: string;
  lastLoginAt?: string | null;
  status?: UserStatus | string;
  password?: string;
  note?: string;
  authProvider?: string;
  daysRemaining?: number;
  isExpired?: boolean;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
  message?: string;
  deviceMismatch?: boolean;
  pendingApproval?: boolean;
  notRegistered?: boolean;
  isNewRequest?: boolean;
  code?: string;
}
