import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthUser, LoginResponse } from '../types/auth';
import { 
  apiLogin, 
  apiGoogleLogin,
  apiRegisterRequest,
  apiLogout, 
  apiGetMe, 
  getStoredAuthToken, 
  setStoredAuthToken 
} from '../utils/auth';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<LoginResponse>;
  googleLogin: (email: string, fullName?: string, autoRegister?: boolean) => Promise<LoginResponse>;
  registerRequest: (gmail: string, password?: string, fullName?: string, note?: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  canAccessPage: (pageNumber: number) => { allowed: boolean; reason?: string };
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredAuthToken);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const refreshUser = useCallback(async () => {
    const currentToken = getStoredAuthToken();
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiGetMe();
      if (res.success && res.user) {
        setUser(res.user);
        setToken(currentToken);
      } else {
        setUser(null);
        setToken(null);
        setStoredAuthToken(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (identifier: string, password: string): Promise<LoginResponse> => {
    setIsLoading(true);
    const res = await apiLogin(identifier, password);
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      setIsLoginModalOpen(false);
      return res;
    }
    return res;
  };

  const googleLogin = async (
    email: string, 
    fullName?: string, 
    autoRegister: boolean = false
  ): Promise<LoginResponse> => {
    setIsLoading(true);
    const res = await apiGoogleLogin(email, fullName, autoRegister);
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      setIsLoginModalOpen(false);
      return res;
    }
    return res;
  };

  const registerRequest = async (
    gmail: string,
    password: string = '123456',
    fullName?: string,
    note?: string
  ) => {
    setIsLoading(true);
    const res = await apiRegisterRequest(gmail, password, fullName, note);
    setIsLoading(false);
    return res;
  };

  const logout = async () => {
    setIsLoading(true);
    await apiLogout();
    setUser(null);
    setToken(null);
    setIsLoading(false);
    setIsAdminModalOpen(false);
  };

  const canAccessPage = useCallback((pageNumber: number): { allowed: boolean; reason?: string } => {
    // Page -1 (Cover 4D), Page 0 (Mục lục), Page 0.5 (Trang Đăng nhập) do not require login
    if (pageNumber <= 0 || pageNumber === 0.5) {
      return { allowed: true };
    }

    // Pages 1 to 96 require valid login
    if (!user) {
      return {
        allowed: false,
        reason: 'Bạn cần đăng nhập tài khoản Gmail (hoặc tài khoản Admin) để xem và luyện tập nội dung từ Trang 1 đến Trang 96.',
      };
    }

    if (user.role === 'admin') {
      return { allowed: true };
    }

    const isApproved = user.approved !== undefined ? user.approved : user.isApproved;
    if (!isApproved) {
      return {
        allowed: false,
        reason: 'Tài khoản của bạn đang trong trạng thái chờ Admin kiểm duyệt hoặc đã bị tạm khóa. Vui lòng liên hệ Admin.',
      };
    }

    const endDate = user.endDate || user.expireDate;
    if (endDate && new Date() > new Date(endDate + 'T23:59:59')) {
      return {
        allowed: false,
        reason: `Tài khoản học viên đã hết thời hạn sử dụng (${endDate}) và đã được hệ thống tự động xóa!`,
      };
    }

    if (user.status && typeof user.status === 'object' && user.status.notStarted) {
      return {
        allowed: false,
        reason: `Tài khoản sẽ được bắt đầu từ ngày ${user.startDate}. Hiện tại chưa đến ngày bắt đầu học.`,
      };
    }

    return { allowed: true };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        googleLogin,
        registerRequest,
        logout,
        refreshUser,
        canAccessPage,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isAdminModalOpen,
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
