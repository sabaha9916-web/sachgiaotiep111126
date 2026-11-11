import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, LogIn, BookOpen, ShieldAlert, ArrowLeft } from 'lucide-react';

interface PageLockOverlayProps {
  pageNumber: number;
  onGoToCover: () => void;
  onGoToToc: () => void;
  pageTitle?: string;
}

const PageLockOverlay: React.FC<PageLockOverlayProps> = ({
  pageNumber,
  onGoToCover,
  onGoToToc,
  pageTitle,
}) => {
  const { user, openLoginModal } = useAuth();

  let message = 'Bạn cần đăng nhập tài khoản Gmail (hoặc tài khoản Admin) để xem và luyện tập nội dung từ Trang 1 đến Trang 96.';
  let isExpired = false;
  let isNotApproved = false;

  if (user) {
    const isApproved = user.approved !== undefined ? user.approved : user.isApproved;
    const isStatusObj = user.status && typeof user.status === 'object';
    const isExpiredAccount = Boolean(
      user.isExpired ||
      user.status === 'expired' ||
      (isStatusObj && (user.status as any).isExpired) ||
      (user.expireDate && new Date(user.expireDate) < new Date())
    );
    const notStartedAccount = Boolean(isStatusObj && (user.status as any).notStarted);

    if (!isApproved) {
      isNotApproved = true;
      message = 'Tài khoản của bạn đang trong trạng thái chờ kiểm duyệt hoặc đã bị tạm khóa. Vui lòng liên hệ Admin để được cấp quyền mở khóa.';
    } else if (isExpiredAccount) {
      isExpired = true;
      message = `Tài khoản học viên đã hết thời hạn sử dụng (${user.expireDate || user.endDate}) và đã được hệ thống tự động xóa!`;
    } else if (notStartedAccount) {
      message = `Tài khoản của bạn sẽ được bắt đầu từ ngày ${user.startDate}. Hiện tại chưa đến ngày bắt đầu học.`;
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-stone-50 via-amber-50/50 to-stone-100 text-stone-800 relative z-30 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 sm:border-3 border-amber-400 text-center space-y-4 animate-in zoom-in-95 duration-200">
        
        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
          {user ? (
            <ShieldAlert className="w-8 h-8" />
          ) : (
            <Lock className="w-8 h-8" />
          )}
        </div>

        {/* Title */}
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider inline-block mb-2">
            Trang {pageNumber} {pageTitle ? `• ${pageTitle}` : ''}
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {isExpired ? 'Tài Khoản Đã Hết Hạn' : isNotApproved ? 'Tài Khoản Chưa Được Phê Duyệt' : 'Yêu Cầu Đăng Nhập'}
          </h2>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed px-2">
          {message}
        </p>

        {/* Policy note */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 text-left space-y-1">
          <div className="font-bold">Quy định truy cập:</div>
          <div>• Nội dung từ Trang 1 đến Trang 96 chỉ dành cho thành viên đã đăng ký.</div>
          <div>• <strong>Không giới hạn thiết bị:</strong> Học viên có thể đăng nhập trên điện thoại, máy tính bảng và máy tính.</div>
          <div>• Tài khoản Quản trị: <code className="bg-white px-1 py-0.5 rounded border border-amber-300 font-mono text-amber-950 font-bold">admin</code> / Mật khẩu: <code className="bg-white px-1 py-0.5 rounded border border-amber-300 font-mono text-amber-950 font-bold">beihai9916@</code></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={openLoginModal}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{user ? 'Đổi tài khoản đăng nhập' : 'Đăng nhập ngay'}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onGoToCover}
              className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Trang bìa</span>
            </button>

            <button
              onClick={onGoToToc}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem Mục lục</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PageLockOverlay;
