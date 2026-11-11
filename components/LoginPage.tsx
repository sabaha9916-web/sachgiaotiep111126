import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  LogIn, 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  LogOut, 
  BookOpen, 
  Sparkles,
  Phone,
  ShieldCheck,
  Smartphone,
  Calendar,
  Clock,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  RotateCcw,
  UserCheck,
  UserX,
  Copy,
  Check,
  FileText,
  ListPlus,
  CheckSquare,
  Square,
  ClipboardPaste,
  Send,
  CalendarCheck
} from 'lucide-react';
import ApiKeyInput from './ApiKeyInput';
import { useAuth } from '../context/AuthContext';
import { AuthUser } from '../types/auth';
import { 
  apiAdminGetUsers, 
  apiAdminCreateUser, 
  apiAdminToggleApproval, 
  apiAdminResetDevice, 
  apiAdminExtendSubscription, 
  apiAdminDeleteUser,
  apiAdminBatchApprove,
  apiGetRegisteredGoogleList,
  RegisteredGoogleAccount,
  getDeviceDescription
} from '../utils/auth';

interface LoginPageProps {
  onSelectPage: (pageNumber: number) => void;
  onGoToToc: () => void;
  onGoToPage1: () => void;
  hasApiKey: boolean;
  onOpenSettings: () => void;
  onSaveApiKey?: (key: string) => void;
}

// Google Official Icon SVG Component
const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
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

const LoginPage: React.FC<LoginPageProps> = ({
  onSelectPage,
  onGoToToc,
  onGoToPage1,
  onSaveApiKey,
}) => {
  const { 
    user, 
    login, 
    googleLogin, 
    registerRequest, 
    logout 
  } = useAuth();

  // Navigation tab for unauthenticated user
  const [activeTab, setActiveTab] = useState<'google' | 'password' | 'register'>('google');

  // Google Login state
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);
  const [showAutoRegisterConfirm, setShowAutoRegisterConfirm] = useState(false);
  const [pendingGoogleEmail, setPendingGoogleEmail] = useState('');

  // Password Login state
  const [loginEmail, setLoginEmail] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('beihai9916@');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Self-register state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNote, setRegNote] = useState('');
  const [regPassword, setRegPassword] = useState('123456');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // General loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Dashboard State (when logged in as admin)
  const [adminTab, setAdminTab] = useState<'create' | 'list' | 'batch'>('list');
  const [adminUsers, setAdminUsers] = useState<AuthUser[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'active' | 'pending' | 'expired'>('all');
  const [adminActionMsg, setAdminActionMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Batch Registration for Google Accounts State (Admin)
  const todayStr = new Date().toISOString().split('T')[0];
  const [batchRawText, setBatchRawText] = useState('');
  const [batchParsedEmails, setBatchParsedEmails] = useState<string[]>([]);
  const [batchDurationMonths, setBatchDurationMonths] = useState<number>(6);
  const [batchStartDate, setBatchStartDate] = useState<string>(todayStr);
  const [batchNote, setBatchNote] = useState<string>('');
  const [isBatchSubmitting, setIsBatchSubmitting] = useState(false);
  const [batchResult, setBatchResult] = useState<{
    total: number;
    added: number;
    updated: number;
    emails: string[];
    startDate: string;
    endDate: string;
  } | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Registered Google accounts for student quick-login
  const [registeredGoogleList, setRegisteredGoogleList] = useState<RegisteredGoogleAccount[]>([]);
  const [loadingRegisteredGoogle, setLoadingRegisteredGoogle] = useState(false);

  // Multi-select for member list
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Admin Create User Form State
  const [adminNewGmail, setAdminNewGmail] = useState('');
  const [adminNewName, setAdminNewName] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('123456');
  const [adminNewStartDate, setAdminNewStartDate] = useState(todayStr);
  const [adminNewMonths, setAdminNewMonths] = useState<number>(6);
  const [adminNewApproved, setAdminNewApproved] = useState<boolean>(true);
  const [adminNewNote, setAdminNewNote] = useState('');

  // Projected expiration date calculation
  const calculateProjectedEnd = (startDate: string, months: number) => {
    try {
      const parts = (startDate || todayStr).split('-').map(Number);
      const target = new Date(parts[0], parts[1] - 1 + Math.max(1, Number(months) || 1), parts[2]);
      const y = target.getFullYear();
      const m = String(target.getMonth() + 1).padStart(2, '0');
      const d = String(target.getDate()).padStart(2, '0');
      return `${d}/${m}/${y}`;
    } catch {
      return '';
    }
  };

  // Load Admin users
  const loadAdminUsers = useCallback(async () => {
    if (user?.role !== 'admin') return;
    setAdminLoading(true);
    const res = await apiAdminGetUsers();
    setAdminLoading(false);
    if (res.success && res.users) {
      setAdminUsers(res.users);
    }
  }, [user]);

  // Load Registered Google Accounts
  const loadRegisteredGoogle = useCallback(async () => {
    setLoadingRegisteredGoogle(true);
    const res = await apiGetRegisteredGoogleList();
    setLoadingRegisteredGoogle(false);
    if (res.success && res.accounts) {
      setRegisteredGoogleList(res.accounts);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAdminUsers();
    }
    loadRegisteredGoogle();
  }, [user, loadAdminUsers, loadRegisteredGoogle]);

  // Handle Google Login submit
  const handleGoogleSubmit = async (e?: React.FormEvent, directEmail?: string, autoRegister: boolean = false) => {
    if (e) e.preventDefault();
    setGoogleError(null);
    setGoogleNotice(null);
    setShowAutoRegisterConfirm(false);

    const emailToUse = (directEmail || googleEmail).trim().toLowerCase();
    if (!emailToUse || !emailToUse.includes('@')) {
      setGoogleError('Vui lòng nhập địa chỉ Gmail tài khoản Google hợp lệ!');
      return;
    }

    setIsSubmitting(true);
    const res = await googleLogin(emailToUse, googleName.trim() || emailToUse.split('@')[0], autoRegister);
    setIsSubmitting(false);

    if (res.success) {
      setGoogleNotice('Đăng nhập bằng tài khoản Google thành công! Đang chuyển đến Trang 1...');
      setTimeout(() => {
        onGoToPage1();
      }, 700);
    } else {
      if (res.notRegistered) {
        setPendingGoogleEmail(emailToUse);
        setShowAutoRegisterConfirm(true);
        setGoogleError(res.message || 'Tài khoản Google này chưa được Admin đăng ký hoặc phê duyệt.');
      } else if (res.pendingApproval || res.isNewRequest) {
        setGoogleNotice(res.message || 'Tài khoản đang chờ Admin kiểm duyệt và cấp thời hạn vào học!');
      } else {
        setGoogleError(res.error || res.message || 'Đăng nhập Google thất bại!');
      }
    }
  };

  // Handle standard password login
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(null);

    const identTrimmed = loginEmail.trim();
    const passTrimmed = loginPassword.trim();

    if (!identTrimmed || !passTrimmed) {
      setLoginError('Vui lòng nhập đầy đủ Tài khoản/Gmail và Mật khẩu.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(identTrimmed, passTrimmed);
    setIsSubmitting(false);

    if (res.success) {
      setLoginSuccess('Đăng nhập thành công! Đang chuyển đến Trang 1...');
      setTimeout(() => {
        onGoToPage1();
      }, 700);
    } else {
      setLoginError(res.error || res.message || 'Đăng nhập thất bại.');
    }
  };

  // Handle member self-register request
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Vui lòng nhập địa chỉ Gmail hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    const res = await registerRequest(
      regEmail.trim().toLowerCase(),
      regPassword.trim() || '123456',
      regFullName.trim() || regEmail.trim().split('@')[0],
      regNote.trim()
    );
    setIsSubmitting(false);

    if (res.success) {
      setRegSuccess(res.message || 'Đã gửi yêu cầu đăng ký cho Admin kiểm duyệt!');
      setRegEmail('');
      setRegFullName('');
      setRegNote('');
    } else {
      setRegError(res.error || res.message || 'Gửi yêu cầu đăng ký thất bại.');
    }
  };

  // Admin: Create User
  const handleAdminCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminActionMsg(null);

    if (!adminNewGmail.trim() || !adminNewGmail.includes('@')) {
      setAdminActionMsg({ text: 'Vui lòng nhập địa chỉ Gmail hợp lệ.', isError: true });
      return;
    }

    setIsSubmitting(true);
    const res = await apiAdminCreateUser({
      email: adminNewGmail.trim().toLowerCase(),
      gmail: adminNewGmail.trim().toLowerCase(),
      password: adminNewPassword.trim() || '123456',
      fullName: adminNewName.trim() || adminNewGmail.trim().split('@')[0],
      startDate: adminNewStartDate,
      durationMonths: Number(adminNewMonths) || 1,
      approved: adminNewApproved,
      note: adminNewNote.trim(),
    });
    setIsSubmitting(false);

    if (res.success) {
      setAdminActionMsg({ text: `Đã đăng ký tài khoản Gmail ${adminNewGmail} thành công!` });
      setAdminNewGmail('');
      setAdminNewName('');
      setAdminNewNote('');
      setAdminNewMonths(6);
      await loadAdminUsers();
      setAdminTab('list');
    } else {
      setAdminActionMsg({ text: res.error || 'Đăng ký tài khoản thất bại.', isError: true });
    }
  };

  // Admin: Toggle Approval
  const handleAdminToggleApprove = async (targetUser: AuthUser) => {
    const res = await apiAdminToggleApproval(targetUser.id);
    if (res.success) {
      setAdminActionMsg({ text: res.message || 'Cập nhật phê duyệt thành công!' });
      await loadAdminUsers();
    }
  };

  // Admin: Reset Device
  const handleAdminResetDevice = async (targetUser: AuthUser) => {
    const confirmMsg = `Xác nhận đặt lại (reset) thiết bị cho tài khoản ${targetUser.email || targetUser.gmail}?\n\nHọc viên sẽ có thể đăng nhập trên 1 thiết bị mới.`;
    if (!window.confirm(confirmMsg)) return;

    const res = await apiAdminResetDevice(targetUser.id);
    if (res.success) {
      setAdminActionMsg({ text: res.message || 'Đã reset thiết bị thành công!' });
      await loadAdminUsers();
    }
  };

  // Admin: Quick Extend Subscription
  const handleAdminExtend = async (targetUser: AuthUser, months: number) => {
    const res = await apiAdminExtendSubscription(targetUser.id, months);
    if (res.success) {
      setAdminActionMsg({ text: res.message || `Đã gia hạn thêm ${months} tháng!` });
      await loadAdminUsers();
    }
  };

  // Admin: Delete user
  const handleAdminDelete = async (targetUser: AuthUser) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${targetUser.email || targetUser.gmail} khỏi hệ thống?`)) {
      return;
    }
    const res = await apiAdminDeleteUser(targetUser.id);
    if (res.success) {
      setAdminActionMsg({ text: res.message || 'Đã xóa tài khoản!' });
      await loadAdminUsers();
    }
  };

  // Admin: Parse copied Gmail text in real-time
  const handleBatchInputChange = (text: string) => {
    setBatchRawText(text);
    const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const unique = Array.from(new Set(matches.map(e => e.trim().toLowerCase())));
    setBatchParsedEmails(unique);
  };

  // Admin: Submit batch registration of Google accounts (Multiple Gmails at once)
  const handleBatchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (batchParsedEmails.length === 0) {
      setAdminActionMsg({ text: 'Vui lòng dán hoặc nhập ít nhất 1 địa chỉ Gmail hợp lệ.', isError: true });
      return;
    }

    setIsBatchSubmitting(true);
    setAdminActionMsg(null);

    const res = await apiAdminBatchApprove({
      emails: batchParsedEmails,
      rawText: batchRawText,
      durationMonths: Number(batchDurationMonths) || 6,
      startDate: batchStartDate || todayStr,
      note: batchNote.trim(),
    });
    setIsBatchSubmitting(false);

    if (res.success) {
      const finalEnd = res.endDate || calculateProjectedEnd(batchStartDate || todayStr, Number(batchDurationMonths) || 6);
      setBatchResult({
        total: res.total || batchParsedEmails.length,
        added: res.added || 0,
        updated: res.updated || 0,
        emails: res.emails || batchParsedEmails,
        startDate: res.startDate || batchStartDate || todayStr,
        endDate: finalEnd,
      });
      setAdminActionMsg({
        text: `Đã đăng ký thành công ${res.total || batchParsedEmails.length} tài khoản Google với thời hạn ${batchDurationMonths} tháng (hết hạn ngày ${finalEnd})!`,
      });
      await loadAdminUsers();
      await loadRegisteredGoogle();
    } else {
      setAdminActionMsg({ text: res.error || 'Đăng ký hàng loạt thất bại.', isError: true });
    }
  };

  // Admin: Fill sample copied Gmail list
  const handleFillSampleBatch = () => {
    const samples = [
      'hocvien.tiengtrung01@gmail.com',
      'minhanh.chinese@gmail.com',
      'tran.van.tam99@gmail.com',
      'lanhuong.hsk@gmail.com',
      'hoangnam.giao.tiep@gmail.com',
      'phuongthao.chinese88@gmail.com',
      'dangkhoa.tiengtrung@gmail.com'
    ];
    handleBatchInputChange(samples.join('\n'));
  };

  // Admin: Copy approved Gmail list to clipboard
  const handleCopyApprovedEmails = () => {
    const approved = adminUsers
      .filter(u => Boolean(u.approved !== undefined ? u.approved : u.isApproved))
      .map(u => u.email || u.gmail)
      .filter(Boolean) as string[];

    if (approved.length === 0) {
      setCopiedNotice('Chưa có tài khoản Gmail nào được phê duyệt.');
      setTimeout(() => setCopiedNotice(null), 3000);
      return;
    }

    const uniqueApproved = Array.from(new Set(approved));
    const textToCopy = uniqueApproved.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedNotice(`Đã sao chép ${uniqueApproved.length} địa chỉ Gmail đã duyệt vào bộ nhớ tạm (clipboard)!`);
      setTimeout(() => setCopiedNotice(null), 4000);
    }).catch(() => {
      setCopiedNotice(`Không thể truy cập clipboard.`);
      setTimeout(() => setCopiedNotice(null), 3000);
    });
  };

  // Admin: Copy result emails from batch approval
  const handleCopyResultEmails = (emails: string[]) => {
    if (!emails || emails.length === 0) return;
    navigator.clipboard.writeText(emails.join('\n')).then(() => {
      setCopiedNotice(`Đã sao chép ${emails.length} Gmail vừa phê duyệt vào clipboard!`);
      setTimeout(() => setCopiedNotice(null), 3500);
    });
  };

  // Admin: Batch approve selected users in table (6 months from today)
  const handleBatchApproveSelected = async () => {
    if (selectedUserIds.length === 0) return;
    const selectedUsers = adminUsers.filter(u => selectedUserIds.includes(u.id));
    const emailsToApprove = selectedUsers.map(u => u.email || u.gmail).filter(Boolean) as string[];

    if (emailsToApprove.length === 0) return;

    setIsSubmitting(true);
    const res = await apiAdminBatchApprove({
      emails: emailsToApprove,
      durationMonths: 6,
    });
    setIsSubmitting(false);

    if (res.success) {
      setAdminActionMsg({
        text: `Đã phê duyệt ${emailsToApprove.length} tài khoản đã chọn (Thời hạn 6 tháng tính từ thời điểm duyệt)!`,
      });
      setSelectedUserIds([]);
      await loadAdminUsers();
    } else {
      setAdminActionMsg({ text: res.error || 'Phê duyệt thất bại.', isError: true });
    }
  };

  // Admin: Multi-select toggle helpers
  const handleToggleSelectOne = (id: string) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered admin users list
  const filteredUsers = adminUsers.filter((u) => {
    const search = adminSearch.toLowerCase().trim();
    const emailMatch = (u.email || u.gmail || '').toLowerCase().includes(search);
    const nameMatch = (u.fullName || '').toLowerCase().includes(search);
    if (search && !emailMatch && !nameMatch) return false;

    const isApproved = u.approved !== undefined ? u.approved : u.isApproved;
    const isExpired = u.isExpired || (u.endDate && new Date(u.endDate) < new Date());

    if (adminStatusFilter === 'active') return isApproved && !isExpired;
    if (adminStatusFilter === 'pending') return !isApproved;
    if (adminStatusFilter === 'expired') return isExpired;
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-[#f5ede0] text-stone-800 box-border overflow-hidden relative select-none font-serif">
      {/* Ancient Book Page Canvas Frame */}
      <div className="border-[3px] border-[#934b2d]/70 rounded-xl p-2.5 sm:p-4 flex flex-col h-full justify-between relative overflow-hidden bg-[#faf4eb] shadow-xl book-edge-stack-right">
        
        {/* Subtle antique xuan paper grain */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#8c5332_0.75px,transparent_0.75px)] [background-size:14px_14px]" />
        
        {/* Traditional spine stitches on left */}
        <div className="absolute left-1.5 sm:left-2.5 top-0 bottom-0 w-4 flex flex-col justify-around items-center pointer-events-none z-20">
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#8b4513]/40 border-r border-[#8b4513]/20" />
        </div>

        {/* Inner Classical Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#b27d56]/40 rounded-lg pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-2 pl-3 sm:pl-4 border-b border-[#c89f7e]/50 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToToc}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#852b12] hover:bg-[#6c200b] text-[#fff8ee] shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 font-serif"
              title="Quay lại Mục lục"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Mục lục</span>
            </button>
            <span className="hidden sm:inline-block text-[#9e7454] text-xs">•</span>
            <span className="text-xs font-bold text-[#852b12] tracking-wide">
              TRANG ĐĂNG NHẬP
            </span>
          </div>

          <h2 className="text-sm sm:text-base font-black text-amber-950 font-serif tracking-wider uppercase hidden sm:block">
            {user?.role === 'admin' ? 'BẢNG QUẢN TRỊ ADMIN' : 'TÀI KHOẢN HỌC VIÊN'}
          </h2>

          <div className="flex items-center gap-2">
            <ApiKeyInput
              onSave={(key) => {
                if (onSaveApiKey) onSaveApiKey(key);
              }}
              compact={true}
              popoverAlign="right"
            />
          </div>
        </div>

        {/* Main Body Stage */}
        <div className="flex-1 overflow-y-auto pl-3 sm:pl-4 py-2 sm:py-3 relative z-10 scrollbar-thin">
          
          {/* ================================================================= */}
          {/* VIEW 1: ADMIN LOGGED IN (Quản trị viên Hệ thống) */}
          {/* ================================================================= */}
          {user && user.role === 'admin' ? (
            <div className="max-w-4xl mx-auto space-y-3 font-sans">
              
              {/* Admin Top Welcome Banner */}
              <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-tight">
                        Tài Khoản Quản Trị Viên (Admin)
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-orange-900 shadow-2xs">
                        beihai9916@
                      </span>
                    </div>
                    <p className="text-xs text-amber-100 mt-0.5">
                      Đăng ký cho các Gmail • Kiểm duyệt đăng nhập • Thiết lập ngày & số tháng • Không giới hạn thiết bị
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={onGoToPage1}
                    className="px-3 py-1.5 rounded-xl bg-white text-orange-950 font-bold text-xs shadow-xs hover:bg-amber-100 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    title="Vào xem nội dung bài học"
                  >
                    <span>Xem Sách (Trang 1 - 96)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded-xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-xs border border-red-400 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    title="Đăng xuất tài khoản admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>

              {/* Action Notification Message */}
              {adminActionMsg && (
                <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  adminActionMsg.isError 
                    ? 'bg-red-50 border-red-300 text-red-800' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {adminActionMsg.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    <span className="font-semibold">{adminActionMsg.text}</span>
                  </div>
                  <button 
                    onClick={() => setAdminActionMsg(null)}
                    className="text-[11px] underline hover:opacity-75 cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              )}

              {/* Admin Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between bg-white border border-amber-200 rounded-xl p-1 shadow-2xs gap-1">
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    onClick={() => setAdminTab('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      adminTab === 'list'
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50'
                    }`}
                  >
                    <span>Quản lý & Kiểm duyệt ({adminUsers.length})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('batch')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      adminTab === 'batch'
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'text-amber-950 bg-amber-100/60 hover:bg-amber-100'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5 text-orange-600" />
                    <span>📋 Phê duyệt copy danh sách Gmail</span>
                    {batchParsedEmails.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white text-orange-700 font-bold border border-amber-300">
                        {batchParsedEmails.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setAdminTab('create')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      adminTab === 'create'
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Đăng ký 1 Gmail</span>
                  </button>
                </div>

                <button
                  onClick={loadAdminUsers}
                  disabled={adminLoading}
                  className="px-2.5 py-1 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  title="Làm mới danh sách từ backend"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${adminLoading ? 'animate-spin text-orange-600' : ''}`} />
                  <span className="hidden sm:inline">Làm mới</span>
                </button>
              </div>

              {/* ======================================================= */}
              {/* ADMIN TAB 1: FORM ĐĂNG KÝ GMAIL MỚI */}
              {/* ======================================================= */}
              {adminTab === 'create' && (
                <div className="bg-white border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                  <div className="border-b border-amber-100 pb-2">
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-orange-600" />
                      <span>Đăng ký tài khoản Gmail học viên & Cấp thời hạn</span>
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Tài khoản sẽ được lưu vào hệ thống backend với ngày bắt đầu, số tháng (sử dụng không giới hạn thiết bị).
                    </p>
                  </div>

                  <form onSubmit={handleAdminCreate} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Địa chỉ Gmail học viên <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={adminNewGmail}
                            onChange={(e) => setAdminNewGmail(e.target.value)}
                            placeholder="hocvien@gmail.com"
                            required
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Họ và tên học viên
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={adminNewName}
                            onChange={(e) => setAdminNewName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Ngày bắt đầu đăng ký: ngày/tháng/năm */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-orange-600" />
                          <span>Ngày bắt đầu (ngày/tháng/năm)</span>
                        </label>
                        <input
                          type="date"
                          value={adminNewStartDate}
                          onChange={(e) => setAdminNewStartDate(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                        />
                      </div>

                      {/* Thời hạn: số tháng */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-orange-600" />
                          <span>Thời hạn (Số tháng)</span>
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={adminNewMonths}
                            onChange={(e) => setAdminNewMonths(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            required
                            className="w-20 px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                          />
                          <div className="flex gap-1">
                            {[1, 3, 6, 12].map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setAdminNewMonths(m)}
                                className={`px-2 py-1 text-[11px] font-bold rounded-lg border cursor-pointer ${
                                  adminNewMonths === m
                                    ? 'bg-orange-600 text-white border-orange-700'
                                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                                }`}
                              >
                                {m}th
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tự động tính ngày kết thúc */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Ngày hết hạn (tính từ ngày đăng ký)
                        </label>
                        <div className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{calculateProjectedEnd(adminNewStartDate, adminNewMonths)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Mật khẩu đăng nhập phụ (tùy chọn)
                        </label>
                        <input
                          type="text"
                          value={adminNewPassword}
                          onChange={(e) => setAdminNewPassword(e.target.value)}
                          placeholder="Mặc định: 123456"
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                        />
                      </div>

                      {/* Kiểm duyệt cho đăng nhập */}
                      <div className="pt-4">
                        <label className="flex items-center gap-2 p-2.5 rounded-xl border border-amber-300 bg-amber-50/70 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={adminNewApproved}
                            onChange={(e) => setAdminNewApproved(e.target.checked)}
                            className="rounded border-amber-400 text-orange-600 focus:ring-orange-500 w-4 h-4"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-stone-900">Kiểm duyệt cho đăng nhập ngay</span>
                            <p className="text-[11px] text-stone-500">Cho phép học viên truy cập ngay Trang 1 - 96 sau khi đăng ký</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Ghi chú quản trị (tùy chọn)
                      </label>
                      <input
                        type="text"
                        value={adminNewNote}
                        onChange={(e) => setAdminNewNote(e.target.value)}
                        placeholder="Ví dụ: Đăng ký khóa học 6 tháng qua Zalo / Facebook..."
                        className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setAdminTab('list')}
                        className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 cursor-pointer"
                      >
                        Hủy bỏ
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>{isSubmitting ? 'Đang tạo...' : 'Lưu & Đăng ký tài khoản Gmail'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ======================================================= */}
              {/* ADMIN TAB 2: ĐĂNG KÝ NHIỀU TÀI KHOẢN GOOGLE CÙNG LÚC */}
              {/* ======================================================= */}
              {adminTab === 'batch' && (
                <div className="bg-white border-2 border-amber-400 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                  <div className="border-b border-amber-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                        <Copy className="w-4 h-4 text-orange-600" />
                        <span>Đăng Ký Nhiều Tài Khoản Đăng Nhập Google Cùng Lúc</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Google Login
                        </span>
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">
                        Admin copy danh sách Gmail từ Excel, Google Sheets, Zalo, Notepad... và dán vào bên dưới.
                        Sau khi đăng ký, học viên có thể <strong>đăng nhập trực tiếp bằng Google</strong> không giới hạn thiết bị (điện thoại, máy tính, iPad).
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleFillSampleBatch}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                        title="Dán nhanh danh sách 7 Gmail mẫu để kiểm tra"
                      >
                        <ClipboardPaste className="w-3.5 h-3.5 text-orange-600" />
                        <span>Dán danh sách mẫu</span>
                      </button>

                      {batchRawText && (
                        <button
                          type="button"
                          onClick={() => handleBatchInputChange('')}
                          className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                        >
                          Xóa trắng
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Toast/Copied Notice */}
                  {copiedNotice && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2 animate-in fade-in">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{copiedNotice}</span>
                    </div>
                  )}

                  {/* Batch Success Result Banner */}
                  {batchResult && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Đã đăng ký thành công {batchResult.total} tài khoản Google!</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyResultEmails(batchResult.emails)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            title="Sao chép lại các Gmail vừa duyệt vào clipboard"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Sao chép {batchResult.total} Gmail này</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setAdminTab('list')}
                            className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-bold cursor-pointer transition-colors"
                          >
                            Xem danh sách thành viên
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1.5 border-t border-emerald-200/80 text-emerald-950">
                        <div>• Tổng số Gmail: <strong>{batchResult.total}</strong></div>
                        <div>• Đăng ký mới: <strong>{batchResult.added}</strong></div>
                        <div>• Cập nhật gia hạn: <strong>{batchResult.updated}</strong></div>
                        <div>• Hết hạn ngày: <strong>{batchResult.endDate}</strong></div>
                      </div>
                    </div>
                  )}

                  {/* Textarea for pasted Gmails */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-stone-800 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span>Dán nội dung danh sách Gmail tại đây:</span>
                      </label>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
                        batchParsedEmails.length > 0 
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        Đã nhận diện: <strong>{batchParsedEmails.length}</strong> Gmail hợp lệ
                      </span>
                    </div>

                    <textarea
                      rows={5}
                      value={batchRawText}
                      onChange={(e) => handleBatchInputChange(e.target.value)}
                      placeholder="Dán (Ctrl+V) danh sách Gmail vào đây... Ví dụ:&#10;hocvien1@gmail.com&#10;hocvien2@gmail.com&#10;hocvien3@gmail.com, nguyenvana@gmail.com; thanhvien4@gmail.com"
                      className="w-full p-3 rounded-xl border border-stone-300 text-xs font-mono bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden resize-y leading-relaxed text-stone-900"
                    />

                    <div className="text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-1 pt-0.5">
                      <span>• Hỗ trợ mọi định dạng: ngắt dòng, dấu phẩy (,), chấm phẩy (;), tab hoặc khoảng trắng.</span>
                      <span>• Tự động loại trừ trùng lặp và chuyển thành chữ thường.</span>
                    </div>
                  </div>

                  {/* Real-time Preview Chips of Parsed Emails */}
                  {batchParsedEmails.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-950 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Danh sách {batchParsedEmails.length} Gmail sẽ được đăng ký tài khoản Google:</span>
                        </span>
                        <span className="text-[11px] text-stone-500">
                          (Click để xem)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
                        {batchParsedEmails.slice(0, 40).map((em, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white text-stone-800 border border-amber-300 shadow-2xs"
                          >
                            <GoogleIcon className="w-3 h-3" />
                            <span>{em}</span>
                          </span>
                        ))}
                        {batchParsedEmails.length > 40 && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-200 text-amber-900">
                            +{batchParsedEmails.length - 40} Gmail khác...
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Configuration Controls for Batch */}
                  <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>Thời hạn sử dụng:</span>
                      </label>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {[1, 3, 6, 12].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setBatchDurationMonths(m)}
                            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer border ${
                              batchDurationMonths === m
                                ? 'bg-orange-600 text-white border-orange-700 shadow-2xs'
                                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            {m} tháng {m === 6 ? '(Chuẩn)' : ''}
                          </button>
                        ))}
                        <div className="flex items-center gap-1 ml-1">
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={batchDurationMonths}
                            onChange={(e) => setBatchDurationMonths(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-14 px-2 py-1 rounded-lg border border-stone-300 bg-white text-xs font-bold text-center"
                          />
                          <span className="text-stone-600 text-[11px]">tháng</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        <span>Ngày bắt đầu hiệu lực:</span>
                      </label>
                      <input
                        type="date"
                        value={batchStartDate}
                        onChange={(e) => setBatchStartDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-medium focus:ring-1 focus:ring-amber-500"
                      />
                      <div className="text-[11px] text-amber-900 mt-1 font-semibold">
                        ➔ Dự tính hết hạn: <strong>{calculateProjectedEnd(batchStartDate, batchDurationMonths)}</strong>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">
                        Ghi chú / Nhóm học viên (tùy chọn):
                      </label>
                      <input
                        type="text"
                        value={batchNote}
                        onChange={(e) => setBatchNote(e.target.value)}
                        placeholder="Ví dụ: Đăng ký lớp giao tiếp K10, Đợt tuyển sinh tháng 11..."
                        className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Bottom Action and Info Bar */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-950">
                        <CalendarCheck className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>Thời điểm đăng ký: {batchStartDate || todayStr} ➔ Thời hạn: {batchDurationMonths} tháng ({calculateProjectedEnd(batchStartDate || todayStr, batchDurationMonths)})</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        Học viên đăng nhập bằng Google không giới hạn thiết bị, có toàn quyền truy cập Trang 1 đến Trang 96.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleBatchSubmit}
                      disabled={isBatchSubmitting || batchParsedEmails.length === 0}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98 shrink-0"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>
                        {isBatchSubmitting 
                          ? 'Đang tiến hành đăng ký...' 
                          : `Đăng ký & Cấp quyền Google cho ${batchParsedEmails.length > 0 ? `(${batchParsedEmails.length})` : ''} Gmail`}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* ADMIN TAB 3: DANH SÁCH & KIỂM DUYỆT GMAIL */}
              {/* ======================================================= */}
              {adminTab === 'list' && (
                <div className="bg-white border-2 border-amber-300 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
                  
                  {/* Quick Bulk Action Buttons Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setAdminTab('batch')}
                        className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Phê duyệt copy danh sách Gmail hàng loạt</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyApprovedEmails}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                        title="Sao chép toàn bộ danh sách Gmail đã duyệt vào clipboard"
                      >
                        <Copy className="w-3.5 h-3.5 text-amber-700" />
                        <span>Sao chép danh sách Gmail đã duyệt ({adminUsers.filter(u => Boolean(u.approved !== undefined ? u.approved : u.isApproved)).length})</span>
                      </button>
                    </div>

                    {copiedNotice && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                        {copiedNotice}
                      </span>
                    )}
                  </div>

                  {/* Multi-Selection Sticky Bar when accounts are checked */}
                  {selectedUserIds.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-orange-600 text-white flex flex-wrap items-center justify-between gap-2 text-xs shadow-md animate-in slide-in-from-top-2">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-amber-200" />
                        <span className="font-bold">Đã chọn {selectedUserIds.length} tài khoản trong danh sách</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleBatchApproveSelected}
                          disabled={isSubmitting}
                          className="px-3 py-1 rounded-lg bg-white text-orange-950 font-bold hover:bg-amber-100 cursor-pointer shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                          <span>Phê duyệt các mục đã chọn (Cấp 6 tháng)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedUserIds([])}
                          className="px-2 py-1 text-white/80 hover:text-white underline cursor-pointer"
                        >
                          Bỏ chọn
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        placeholder="Tìm kiếm Gmail hoặc Họ tên..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                      />
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {(['all', 'active', 'pending', 'expired'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setAdminStatusFilter(st)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border cursor-pointer whitespace-nowrap transition-colors ${
                            adminStatusFilter === st
                              ? 'bg-amber-600 text-white border-amber-700'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {st === 'all' && `Tất cả (${adminUsers.length})`}
                          {st === 'active' && 'Đang hoạt động'}
                          {st === 'pending' && 'Chờ kiểm duyệt'}
                          {st === 'expired' && 'Hết hạn'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select All Checkbox for filtered list */}
                  {filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between px-1 text-xs text-stone-600 border-b border-stone-200/80 pb-1.5">
                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold select-none">
                        <input
                          type="checkbox"
                          checked={filteredUsers.length > 0 && filteredUsers.every(u => selectedUserIds.includes(u.id))}
                          onChange={() => {
                            const isAll = filteredUsers.every(u => selectedUserIds.includes(u.id));
                            if (isAll) {
                              setSelectedUserIds(prev => prev.filter(id => !filteredUsers.some(f => f.id === id)));
                            } else {
                              setSelectedUserIds(prev => Array.from(new Set([...prev, ...filteredUsers.map(f => f.id)])));
                            }
                          }}
                          className="rounded border-stone-300 text-orange-600 focus:ring-orange-500 w-3.5 h-3.5"
                        />
                        <span>Chọn tất cả {filteredUsers.length} tài khoản trong danh sách hiển thị</span>
                      </label>
                      <span className="text-[11px] text-stone-400">
                        {adminStatusFilter === 'pending' ? 'Chỉ chọn các tài khoản chờ duyệt' : ''}
                      </span>
                    </div>
                  )}

                  {/* Users Cards / List */}
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-8 text-stone-500 text-xs border border-dashed border-stone-300 rounded-xl">
                      Không tìm thấy tài khoản nào phù hợp.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                      {filteredUsers.map((u) => {
                        const email = u.email || u.gmail || '';
                        const isApproved = u.approved !== undefined ? u.approved : u.isApproved;
                        const isExpired = u.isExpired || (u.endDate && new Date(u.endDate) < new Date());
                        const boundDev = u.deviceName || u.deviceInfo || u.deviceId;

                        return (
                          <div 
                            key={u.id}
                            className={`p-3 rounded-xl border transition-all ${
                              selectedUserIds.includes(u.id)
                                ? 'bg-amber-100/70 border-orange-500 shadow-2xs'
                                : !isApproved 
                                  ? 'bg-amber-50/80 border-amber-300' 
                                  : isExpired 
                                    ? 'bg-rose-50/70 border-rose-200' 
                                    : 'bg-white border-stone-200 hover:border-amber-400'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                              {/* Left Info with Selection Checkbox */}
                              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={selectedUserIds.includes(u.id)}
                                  onChange={() => handleToggleSelectOne(u.id)}
                                  className="rounded border-stone-300 text-orange-600 focus:ring-orange-500 w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                                  title="Chọn tài khoản này"
                                />

                                <div className="space-y-1 min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-stone-900 text-xs sm:text-sm">
                                      {u.fullName || email}
                                    </span>
                                    
                                    {/* Gmail Badge */}
                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1">
                                      <GoogleIcon className="w-3 h-3" />
                                      <span>{email}</span>
                                    </span>

                                    {/* Approval Badge */}
                                    {isApproved ? (
                                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        Đã duyệt ({u.durationMonths || 6} tháng)
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                        <Clock className="w-3 h-3 text-amber-700" />
                                        Chờ Admin phê duyệt
                                      </span>
                                    )}

                                    {isExpired && (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                                        Hết hạn
                                      </span>
                                    )}
                                  </div>

                                  {/* Meta details: start date, duration, end date, device */}
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-600 pt-0.5">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3 text-stone-400" />
                                      <span>Thời điểm duyệt: <strong>{u.startDate || 'N/A'}</strong></span>
                                    </span>

                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-stone-400" />
                                      <span>Thời hạn: <strong>{u.durationMonths || 6} tháng</strong></span>
                                    </span>

                                    <span className="flex items-center gap-1 text-amber-900">
                                      <span>Hết hạn: <strong>{u.endDate || u.expireDate || 'N/A'}</strong></span>
                                    </span>

                                    {/* 1-Device Status */}
                                    <span className="flex items-center gap-1">
                                      <Smartphone className="w-3 h-3 text-orange-600" />
                                      <span>Thiết bị: {boundDev ? (
                                        <span className="font-semibold text-stone-800">{boundDev}</span>
                                      ) : (
                                        <span className="text-stone-400 italic">Chưa gắn máy</span>
                                      )}</span>
                                    </span>

                                    {u.password && (
                                      <span className="text-stone-400 font-mono text-[10px]">
                                        Mật khẩu: {u.password}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Right Action Buttons */}
                              <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                                {/* Toggle Approve Button */}
                                <button
                                  onClick={() => handleAdminToggleApprove(u)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                    isApproved 
                                      ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300' 
                                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                                  }`}
                                  title={isApproved ? 'Tạm ngưng phê duyệt' : 'Phê duyệt tài khoản - Cấp 6 tháng tính từ hôm nay'}
                                >
                                  {isApproved ? (
                                    <>
                                      <UserX className="w-3.5 h-3.5 text-stone-500" />
                                      <span>Tạm ngưng</span>
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="w-3.5 h-3.5" />
                                      <span>Phê duyệt (Cấp 6 tháng)</span>
                                    </>
                                  )}
                                </button>

                                {/* Reset Device Button (1-device policy reset) */}
                                {boundDev && (
                                  <button
                                    onClick={() => handleAdminResetDevice(u)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-300 transition-colors flex items-center gap-1 cursor-pointer"
                                    title="Đặt lại thiết bị để học viên có thể đăng nhập trên máy mới"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
                                    <span>Reset thiết bị</span>
                                  </button>
                                )}

                                {/* Quick Extend Subscription (+1, +6 tháng) */}
                                <button
                                  onClick={() => handleAdminExtend(u, 6)}
                                  className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 cursor-pointer"
                                  title="Gia hạn thêm 6 tháng"
                                >
                                  +6 tháng
                                </button>

                                <button
                                  onClick={() => handleAdminExtend(u, 12)}
                                  className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 cursor-pointer"
                                  title="Gia hạn thêm 12 tháng"
                                >
                                  +12 tháng
                                </button>

                                {/* Delete User */}
                                <button
                                  onClick={() => handleAdminDelete(u)}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                                  title="Xóa tài khoản"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

            </div>
          ) : user ? (
            /* ================================================================= */
            /* VIEW 2: MEMBER LOGGED IN */
            /* ================================================================= */
            <div className="w-full max-w-md mx-auto my-auto bg-white/95 backdrop-blur-xs border-2 border-amber-300 rounded-2xl shadow-lg p-3 sm:p-5 font-sans space-y-3.5">
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-white shadow-md mb-2">
                  <User className="w-6 h-6" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                  TÀI KHOẢN HỌC VIÊN
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Đã đăng nhập thành công • Toàn quyền xem Trang 1 đến Trang 96
                </p>
              </div>

              {/* Member Card Details */}
              <div className="p-3.5 bg-gradient-to-br from-amber-50/90 to-orange-50/70 border border-amber-300 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    <GoogleIcon className="w-5 h-5 bg-white p-0.5 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-stone-900 truncate">
                        {user.fullName || user.email || user.gmail}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Đã kiểm duyệt
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 truncate font-mono">{user.email || user.gmail}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                  <div>
                    <span className="text-stone-400 block">Ngày bắt đầu:</span>
                    <strong className="text-stone-800">{user.startDate || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Thời hạn:</span>
                    <strong className="text-stone-800">{user.durationMonths || 1} tháng</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Ngày hết hạn:</span>
                    <strong className="text-amber-900">{user.endDate || user.expireDate || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Số ngày còn lại:</span>
                    <strong className="text-emerald-700">{user.daysRemaining ?? 'N/A'} ngày</strong>
                  </div>
                </div>

                {/* 1-Device Policy indicator */}
                <div className="pt-2 border-t border-amber-200/80 flex items-center gap-2 text-[11px] text-stone-600">
                  <Smartphone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">
                    Thiết bị: <strong>{user.deviceName || user.deviceInfo || getDeviceDescription()}</strong> (1 máy)
                  </span>
                </div>
              </div>

              {/* Ready message */}
              <div className="p-2.5 rounded-xl bg-orange-50/80 border border-orange-200 text-xs text-stone-700 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  Bạn có toàn quyền truy cập từ <strong>Trang 1 đến Trang 96</strong> cùng giáo viên AI và bài học giao tiếp phản xạ hai chiều!
                </span>
              </div>

              {/* Primary Action Button: Go to Page 1 */}
              <button
                onClick={onGoToPage1}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Bắt đầu học ngay: Trang 1 (Phụ âm)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1 gap-2">
                <button
                  onClick={onGoToToc}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xem Mục lục</span>
                </button>

                <button
                  onClick={logout}
                  className="py-1.5 px-3 rounded-lg border border-red-200 bg-red-50/60 hover:bg-red-100 text-xs font-semibold text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>

            </div>
          ) : (
            /* ================================================================= */
            /* VIEW 3: NOT LOGGED IN - LOGIN & REGISTRATION FORMS */
            /* ================================================================= */
            <div className="w-full max-w-md mx-auto my-auto bg-white/95 backdrop-blur-xs border-2 border-amber-300 rounded-2xl shadow-lg p-3 sm:p-5 font-sans">
              
              {/* Header Badge */}
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-white shadow-md mb-2">
                  <LogIn className="w-5 h-5" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                  ĐĂNG NHẬP HỌC VIÊN
                </h1>
                <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                  Đăng nhập để xem và luyện tập nội dung từ Trang 1 đến Trang 96
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex rounded-xl bg-amber-100/70 p-1 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('google');
                    setGoogleError(null);
                    setLoginError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                    setGoogleError(null);
                    setLoginError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'password'
                      ? 'bg-white text-orange-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Quản trị</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setGoogleError(null);
                    setLoginError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-orange-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>Đăng ký mới</span>
                </button>
              </div>

              {/* ======================================================= */}
              {/* TAB 1: HỌC VIÊN ĐĂNG NHẬP */}
              {/* ======================================================= */}
              {activeTab === 'google' && (
                <div className="space-y-3">
                  {googleError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>{googleError}</div>
                    </div>
                  )}

                  {googleNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>{googleNotice}</div>
                    </div>
                  )}

                  {/* If not registered yet, prompt to submit request with 1-click */}
                  {showAutoRegisterConfirm && (
                    <div className="p-3 rounded-xl bg-amber-50 border-2 border-amber-400 text-xs space-y-2">
                      <div className="font-bold text-amber-950">
                        Chưa có trong danh sách phê duyệt:
                      </div>
                      <div className="text-stone-700">
                        Tài khoản <strong>{pendingGoogleEmail}</strong> chưa được Admin kích hoạt. Bạn có muốn gửi yêu cầu đăng ký để Admin kiểm duyệt không?
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGoogleSubmit(undefined, pendingGoogleEmail, true)}
                        disabled={isSubmitting}
                        className="w-full py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Gửi yêu cầu đăng ký tới Admin ngay</span>
                      </button>
                    </div>
                  )}

                  {/* Input Gmail for Student */}
                  <form onSubmit={(e) => handleGoogleSubmit(e)} className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Địa chỉ Gmail của bạn
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={googleEmail}
                          onChange={(e) => setGoogleEmail(e.target.value)}
                          placeholder="nhaphocvien@gmail.com"
                          className="w-full pl-8 pr-3 py-2 rounded-lg border border-stone-300 text-xs bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-hidden text-stone-900"
                        />
                      </div>
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
              )}

              {/* ======================================================= */}
              {/* TAB 2: ADMIN / PASSWORD LOGIN */}
              {/* ======================================================= */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-2.5">
                  {loginError && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}
                  {loginSuccess && (
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{loginSuccess}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Tên tài khoản hoặc Gmail
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin hoặc hocvien@gmail.com"
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-hidden font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-hidden font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-2 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Đang xác thực...' : 'Đăng nhập ngay'}</span>
                  </button>

                  {/* Fill Admin Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('admin');
                      setLoginPassword('beihai9916@');
                    }}
                    className="w-full py-1 text-[11px] text-amber-900 hover:underline text-center cursor-pointer font-medium"
                  >
                    Điền nhanh thông tin Admin: admin / beihai9916@
                  </button>
                </form>
              )}

              {/* ======================================================= */}
              {/* TAB 3: REGISTER NEW ACCOUNT REQUEST */}
              {/* ======================================================= */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-2">
                  {regError && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}
                  {regSuccess && (
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{regSuccess}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Địa chỉ Gmail của bạn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="hocvien@gmail.com"
                        required
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/50 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/50 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Ghi chú mong muốn
                    </label>
                    <input
                      type="text"
                      value={regNote}
                      onChange={(e) => setRegNote(e.target.value)}
                      placeholder="Ví dụ: Xin kích hoạt học tiếng Trung 6 tháng..."
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/50 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-2 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đăng ký tới Admin'}</span>
                  </button>

                  <p className="text-[10px] text-stone-500 text-center pt-1">
                    Admin sẽ kiểm duyệt và cấp quyền thời hạn số tháng cho tài khoản Gmail của bạn.
                  </p>
                </form>
              )}

              {/* Quick links to TOC and Page 1 */}
              <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <button
                  type="button"
                  onClick={onGoToToc}
                  className="hover:text-stone-800 cursor-pointer flex items-center gap-1"
                >
                  <span>← Về Mục lục</span>
                </button>
                <button
                  type="button"
                  onClick={onGoToPage1}
                  className="text-orange-700 hover:text-orange-900 font-bold cursor-pointer flex items-center gap-1"
                >
                  <span>Vào Trang 1 →</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="pt-2 border-t border-[#c89f7e]/50 pl-3 sm:pl-4 flex items-center justify-between text-[#7d5641] text-[11px] sm:text-xs relative z-10 flex-shrink-0">
          <button
            onClick={onGoToToc}
            className="flex items-center gap-1 font-bold text-[#852b12] hover:text-[#5e1a08] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Quay lại Mục lục</span>
          </button>

          <button
            onClick={onGoToPage1}
            className="flex items-center gap-1 font-bold text-[#852b12] hover:text-[#5e1a08] cursor-pointer transition-colors"
          >
            <span>Sang Trang 1 (Phụ âm) →</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Corner Dog-Ear left (flips back to TOC) */}
        <div 
          onClick={onGoToToc}
          className="page-dogear-left" 
          title="Lật về Mục lục"
        />

        {/* Interactive Corner Dog-Ear right (flips to Page 1) */}
        <div 
          onClick={onGoToPage1}
          className="page-dogear" 
          title="Lật sang Trang 1"
        />

      </div>
    </div>
  );
};

export default LoginPage;
