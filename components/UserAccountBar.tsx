import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, ShieldCheck, User, Clock } from 'lucide-react';

interface UserAccountBarProps {
  compact?: boolean;
}

const UserAccountBar: React.FC<UserAccountBarProps> = () => {
  const { user, openLoginModal, openAdminModal, logout } = useAuth();

  if (!user) {
    return (
      <button
        onClick={openLoginModal}
        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 border border-amber-300 font-sans"
        title="Đăng nhập để xem từ Trang 1 đến Trang 96"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Đăng nhập</span>
      </button>
    );
  }

  const isAdmin = user.role === 'admin';
  const email = user.email || user.gmail || '';
  const isExpired = Boolean(
    user.isExpired ||
    user.status === 'expired' ||
    (typeof user.status === 'object' && user.status !== null && (user.status as any).isExpired)
  );
  const expDate = user.expireDate || user.endDate;

  return (
    <div className="flex items-center gap-1.5 text-xs font-sans">
      {/* Role / User Badge */}
      {isAdmin ? (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span>Admin</span>
        </div>
      ) : (
        <div 
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-stone-800 font-medium text-[11px]"
          title={`Họ tên: ${user.fullName || email} - Thiết bị: Không giới hạn`}
        >
          <User className="w-3 h-3 text-orange-600 shrink-0" />
          <span className="max-w-[110px] sm:max-w-[150px] truncate">{email}</span>
        </div>
      )}

      {/* Expiry badge for members */}
      {!isAdmin && expDate && (
        <div className={`hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
          isExpired 
            ? 'bg-rose-100 text-rose-800 border border-rose-200' 
            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
        }`}>
          <Clock className="w-2.5 h-2.5 shrink-0" />
          <span>Hạn: {expDate}</span>
        </div>
      )}

      {/* Admin Panel Button */}
      {isAdmin && (
        <button
          onClick={openAdminModal}
          className="px-2 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          title="Mở Bảng điều khiển Quản trị viên"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quản lý Gmail</span>
          <span className="sm:hidden">Quản lý</span>
        </button>
      )}

      {/* Logout Button */}
      <button
        onClick={() => logout()}
        className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
        title="Đăng xuất tài khoản"
      >
        <LogOut className="w-3 h-3 text-stone-500" />
        <span className="hidden sm:inline">Thoát</span>
      </button>
    </div>
  );
};

export default UserAccountBar;
