import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

import { apiGetRegisteredGoogleList, RegisteredGoogleAccount } from '../utils/auth';

interface LoginModalProps {
  onClose?: () => void;
  targetPage?: number;
}

// Google Official Icon SVG Component
const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const LoginModal: React.FC<LoginModalProps> = ({ onClose, targetPage }) => {
  const { login, googleLogin, isLoginModalOpen, closeLoginModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'google' | 'password'>('google');
  
  // Google sign in
  const [googleEmail, setGoogleEmail] = useState('');
  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredGoogleAccount[]>([]);
  const [loadingRegistered, setLoadingRegistered] = useState(false);
  
  // Password sign in
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('beihai9916@');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deviceMismatchError, setDeviceMismatchError] = useState(false);

  React.useEffect(() => {
    if (isLoginModalOpen) {
      setLoadingRegistered(true);
      apiGetRegisteredGoogleList().then((res) => {
        setLoadingRegistered(false);
        if (res.success && res.accounts) {
          setRegisteredAccounts(res.accounts);
        }
      });
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    setErrorMessage(null);
    setDeviceMismatchError(false);
    if (onClose) onClose();
    closeLoginModal();
  };

  const handleGoogleSubmit = async (e?: React.FormEvent, directEmail?: string) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setDeviceMismatchError(false);

    const emailToUse = (directEmail || googleEmail).trim().toLowerCase();
    if (!emailToUse || !emailToUse.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ Gmail hợp lệ!');
      return;
    }

    setIsSubmitting(true);
    const res = await googleLogin(emailToUse, emailToUse.split('@')[0], true);
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || res.message || 'Đăng nhập không thành công.');
      if (res.deviceMismatch) {
        setDeviceMismatchError(true);
      }
    } else {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setErrorMessage('Vui lòng điền đầy đủ tài khoản Gmail và mật khẩu.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setDeviceMismatchError(false);

    const res = await login(identifier.trim(), password);
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || res.message || 'Đăng nhập không thành công.');
      if (res.deviceMismatch) {
        setDeviceMismatchError(true);
      }
    } else {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 sm:border-4 border-amber-500 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-4 text-white relative">
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif leading-tight">
                Đăng Nhập Học Tiếng Trung
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-100 mt-0.5">
                {targetPage && targetPage >= 1 
                  ? `Vào xem Trang ${targetPage} yêu cầu đăng nhập tài khoản` 
                  : 'Yêu cầu đăng nhập từ Trang 1 đến Trang 96'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-amber-100/60 p-1 mx-4 mt-3 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('google');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'google' 
                ? 'bg-white text-orange-950 shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>Học viên đăng nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('password');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'password' 
                ? 'bg-white text-orange-950 shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Quản trị</span>
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className={`mx-4 mt-2.5 p-3 rounded-xl border text-xs flex items-start gap-2 ${
            deviceMismatchError 
              ? 'bg-rose-50 border-rose-300 text-rose-800' 
              : 'bg-red-50 border-red-300 text-red-800'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div className="space-y-1">
              <div className="font-bold">
                {deviceMismatchError ? 'Phát hiện thiết bị khác!' : 'Đăng nhập không thành công'}
              </div>
              <div>{errorMessage}</div>
            </div>
          </div>
        )}

        {/* Form Google Tab */}
        {activeTab === 'google' ? (
          <div className="p-4 space-y-3">
            <form onSubmit={(e) => handleGoogleSubmit(e)} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Địa chỉ Gmail của bạn
                </label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="nhaphocvien@gmail.com"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-white text-stone-900"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang xác thực...' : 'Đăng nhập học viên'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Form Password Tab */
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Tài khoản (Gmail hoặc "admin")
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin hoặc hocvien@gmail.com"
                  required
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  className="w-full pl-9 pr-10 py-1.5 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang kiểm tra đăng nhập...' : 'Đăng Nhập'}</span>
            </button>
          </form>
        )}

        {/* Footer Info Box */}
        <div className="bg-stone-50 border-t border-stone-200 p-3 px-4 text-[11px] text-stone-600 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Thông tin đăng nhập:</span>
          </div>
          <div className="space-y-0.5 text-stone-600">
            <div>• <strong>Admin:</strong> Tài khoản: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono font-bold">admin</code> | Mật khẩu: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono font-bold">beihai9916@</code></div>
            <div>• <strong>Học viên:</strong> Đăng nhập bằng Google Gmail (1 tài khoản / 1 thiết bị).</div>
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-stone-200 mt-2 text-stone-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-orange-600" />
              <span>Trang bìa & Mục lục miễn phí</span>
            </span>
            <button
              onClick={handleClose}
              className="text-amber-800 hover:underline font-semibold cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
