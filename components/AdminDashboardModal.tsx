import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthUser } from '../types/auth';
import {
  apiAdminGetUsers,
  apiAdminCreateUser,
  apiAdminUpdateUser,
  apiAdminResetDevice,
  apiAdminToggleApproval,
  apiAdminDeleteUser,
  apiAdminBatchApprove,
} from '../utils/auth';
import {
  Users,
  UserPlus,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Smartphone,
  Calendar,
  Clock,
  KeyRound,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Search,
  X,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Check,
  Plus,
  Copy,
  ClipboardPaste,
  CalendarCheck,
  FileText,
  CheckSquare
} from 'lucide-react';

const AdminDashboardModal: React.FC = () => {
  const { user, isAdminModalOpen, closeAdminModal } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'batch'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'locked'>('all');

  // Batch Registration for Google Accounts (Multiple Gmails at once)
  const todayStr = new Date().toISOString().split('T')[0];
  const [batchRawText, setBatchRawText] = useState('');
  const [batchParsedEmails, setBatchParsedEmails] = useState<string[]>([]);
  const [batchDurationMonths, setBatchDurationMonths] = useState<number>(6);
  const [batchStartDate, setBatchStartDate] = useState<string>(todayStr);
  const [batchNote, setBatchNote] = useState<string>('');
  const [batchApproved, setBatchApproved] = useState<boolean>(true);
  const [isBatchSubmitting, setIsBatchSubmitting] = useState(false);
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);
  const [batchResult, setBatchResult] = useState<{
    total: number;
    added: number;
    updated: number;
    emails: string[];
    startDate: string;
    endDate: string;
  } | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Form State for creating new user
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('123456');
  const [newFullName, setNewFullName] = useState('');
  const [newStartDate, setNewStartDate] = useState(todayStr);
  const [newDurationMonths, setNewDurationMonths] = useState<number>(3);
  const [newIsApproved, setNewIsApproved] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Quick edit modal state
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editMonths, setEditMonths] = useState<number>(1);
  const [editFullName, setEditFullName] = useState('');
  const [editIsApproved, setEditIsApproved] = useState(true);

  // Password visibility map
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const res = await apiAdminGetUsers();
    setIsLoading(false);
    if (res.success && res.users) {
      setUsers(res.users);
    }
  }, []);

  useEffect(() => {
    if (isAdminModalOpen) {
      loadUsers();
    }
  }, [isAdminModalOpen, loadUsers]);

  if (!isAdminModalOpen || user?.role !== 'admin') return null;

  // Calculate projected expiration date from start date and duration months
  const computeProjectedExpireDate = (start: string, months: number) => {
    try {
      const parts = start.split('-').map(Number);
      const target = new Date(parts[0], parts[1] - 1 + Number(months), parts[2]);
      const y = target.getFullYear();
      const m = String(target.getMonth() + 1).padStart(2, '0');
      const d = String(target.getDate()).padStart(2, '0');
      return `${d}/${m}/${y}`;
    } catch {
      return '';
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!newEmail.trim()) {
      setFormError('Vui lòng nhập địa chỉ Gmail của học viên.');
      return;
    }

    if (!newEmail.includes('@')) {
      setFormError('Địa chỉ email không đúng định dạng.');
      return;
    }

    setIsSubmitting(true);
    const res = await apiAdminCreateUser({
      email: newEmail.trim(),
      password: newPassword.trim() || '123456',
      fullName: newFullName.trim() || newEmail.trim().split('@')[0],
      startDate: newStartDate,
      durationMonths: Number(newDurationMonths),
      isApproved: newIsApproved,
    });
    setIsSubmitting(false);

    if (res.success) {
      setFormSuccess(`Đã đăng ký tài khoản thành công cho ${newEmail}!`);
      setNewEmail('');
      setNewFullName('');
      setNewPassword('123456');
      setNewDurationMonths(3);
      await loadUsers();
      setTimeout(() => {
        setActiveTab('list');
        setFormSuccess(null);
      }, 1200);
    } else {
      setFormError(res.error || 'Đăng ký không thành công.');
    }
  };

  const handleToggleApproval = async (targetUser: AuthUser) => {
    const res = await apiAdminToggleApproval(targetUser.id);
    if (res.success) {
      await loadUsers();
    }
  };

  const handleBatchInputChange = (text: string) => {
    setBatchRawText(text);
    const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const unique = Array.from(new Set(matches.map((e) => e.trim().toLowerCase())));
    setBatchParsedEmails(unique);
  };

  const handleBatchSubmit = async () => {
    if (batchParsedEmails.length === 0) return;
    setIsBatchSubmitting(true);
    setBatchSuccessMsg(null);
    const res = await apiAdminBatchApprove({
      emails: batchParsedEmails,
      rawText: batchRawText,
      durationMonths: Number(batchDurationMonths) || 6,
      startDate: batchStartDate || todayStr,
      approved: batchApproved,
      note: batchNote.trim(),
    });
    setIsBatchSubmitting(false);

    if (res.success) {
      const finalEnd = res.endDate || computeProjectedExpireDate(batchStartDate || todayStr, Number(batchDurationMonths) || 6);
      setBatchResult({
        total: res.total || batchParsedEmails.length,
        added: res.added || 0,
        updated: res.updated || 0,
        emails: res.emails || batchParsedEmails,
        startDate: res.startDate || batchStartDate || todayStr,
        endDate: finalEnd,
      });
      setBatchSuccessMsg(
        `Đã đăng ký và phê duyệt thành công ${res.total || batchParsedEmails.length} tài khoản Google với thời hạn ${batchDurationMonths} tháng (hết hạn ngày ${finalEnd})!`
      );
      await loadUsers();
    }
  };

  const handleFillSampleBatch = () => {
    const samples = [
      'hocvien.tiengtrung01@gmail.com',
      'minhanh.chinese@gmail.com',
      'tran.van.tam99@gmail.com',
      'lanhuong.hsk@gmail.com',
      'hoangnam.giao.tiep@gmail.com',
    ];
    handleBatchInputChange(samples.join('\n'));
  };

  const handleCopyApprovedEmails = () => {
    const approved = users
      .filter((u) => u.role !== 'admin' && (u.isApproved || u.approved))
      .map((u) => u.email || u.gmail)
      .filter(Boolean) as string[];

    if (approved.length === 0) return;
    navigator.clipboard.writeText(approved.join('\n')).then(() => {
      setCopiedNotice(`Đã sao chép ${approved.length} Gmail đã duyệt vào clipboard!`);
      setTimeout(() => setCopiedNotice(null), 3000);
    });
  };

  const handleResetDevice = async (targetUser: AuthUser) => {
    if (
      !window.confirm(
        `Xác nhận đặt lại thiết bị cho tài khoản ${targetUser.email}?\n\nHọc viên sẽ có thể đăng nhập trên một thiết bị mới.`
      )
    ) {
      return;
    }

    const res = await apiAdminResetDevice(targetUser.id);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id
            ? { ...u, boundDeviceId: null, deviceInfo: null }
            : u
        )
      );
    }
  };

  const handleDeleteUser = async (targetUser: AuthUser) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa tài khoản ${targetUser.email} không?\n\nHành động này không thể hoàn tác.`
      )
    ) {
      return;
    }

    const res = await apiAdminDeleteUser(targetUser.id);
    if (res.success) {
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
    }
  };

  const handleQuickExtend = async (targetUser: AuthUser, addMonths: number) => {
    const newMonths = (targetUser.durationMonths || 1) + addMonths;
    const res = await apiAdminUpdateUser(targetUser.id, {
      durationMonths: newMonths,
    });
    if (res.success && res.user) {
      await loadUsers();
    }
  };

  const openEditModal = (u: AuthUser) => {
    setEditingUser(u);
    setEditFullName(u.fullName || '');
    setEditPassword(u.password || '');
    setEditStartDate(u.startDate || todayStr);
    setEditMonths(u.durationMonths || 1);
    setEditIsApproved(u.isApproved);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    const res = await apiAdminUpdateUser(editingUser.id, {
      fullName: editFullName,
      password: editPassword,
      startDate: editStartDate,
      durationMonths: editMonths,
      isApproved: editIsApproved,
    });
    if (res.success) {
      setEditingUser(null);
      await loadUsers();
    }
  };

  // Filter users
  const memberUsers = users.filter((u) => u.role !== 'admin');
  const filteredUsers = memberUsers.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'active') return u.isApproved && !u.status?.isExpired;
    if (filterStatus === 'expired') return u.status?.isExpired;
    if (filterStatus === 'locked') return !u.isApproved;

    return true;
  });

  // Stats
  const totalMembers = memberUsers.length;
  const activeMembers = memberUsers.filter((u) => u.isApproved && !u.status?.isExpired).length;
  const expiredMembers = memberUsers.filter((u) => u.status?.isExpired).length;
  const lockedMembers = memberUsers.filter((u) => !u.isApproved).length;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl bg-stone-50 rounded-2xl shadow-2xl border-2 sm:border-4 border-amber-500 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 p-3.5 sm:p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold font-serif tracking-wide">
                  QUẢN TRỊ VIÊN (ADMIN)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-bold text-[10px] uppercase">
                  Toàn Quyền
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-100">
                Đăng ký Gmail, kiểm duyệt truy cập, phân quyền thời hạn & không giới hạn thiết bị
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadUsers}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={closeAdminModal}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Đóng bảng điều khiển"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-amber-50 border-b border-amber-200">
          <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[11px] text-stone-500 font-semibold">Tổng học viên</div>
              <div className="text-xl font-black text-stone-800">{totalMembers}</div>
            </div>
            <Users className="w-6 h-6 text-amber-600 opacity-80" />
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[11px] text-emerald-700 font-semibold">Đang hoạt động</div>
              <div className="text-xl font-black text-emerald-700">{activeMembers}</div>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-600 opacity-80" />
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-rose-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[11px] text-rose-700 font-semibold">Đã hết hạn</div>
              <div className="text-xl font-black text-rose-700">{expiredMembers}</div>
            </div>
            <Clock className="w-6 h-6 text-rose-600 opacity-80" />
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[11px] text-stone-600 font-semibold">Khóa / Chờ duyệt</div>
              <div className="text-xl font-black text-stone-700">{lockedMembers}</div>
            </div>
            <XCircle className="w-6 h-6 text-stone-500 opacity-80" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-white px-3 sm:px-4 pt-2 gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'list'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh sách thành viên ({totalMembers})</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'batch'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Copy className="w-4 h-4 text-orange-600" />
            <span>Đăng ký nhiều tài khoản Google</span>
            {batchParsedEmails.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-orange-100 text-orange-800 font-bold">
                {batchParsedEmails.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'create'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng ký 1 Gmail lẻ</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 scrollbar-thin">
          {activeTab === 'batch' ? (
            /* ========================================================
               BATCH REGISTER GOOGLE ACCOUNTS (MULTIPLE GMAILS AT ONCE)
               ======================================================== */
            <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-2xl border-2 border-amber-400 shadow-sm space-y-4">
              <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                    <Copy className="w-5 h-5 text-orange-600" />
                    <span>Đăng Ký Nhiều Tài Khoản Đăng Nhập Google Cùng Lúc</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Admin dán hoặc nhập danh sách Gmail của học viên. Sau khi đăng ký, học viên có thể <strong>đăng nhập trực tiếp bằng Google</strong> không giới hạn thiết bị (điện thoại, máy tính, iPad).
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleFillSampleBatch}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5 text-orange-600" />
                    <span>Dán 5 Gmail mẫu</span>
                  </button>
                  {batchRawText && (
                    <button
                      type="button"
                      onClick={() => handleBatchInputChange('')}
                      className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg cursor-pointer transition-colors"
                    >
                      Xóa trắng
                    </button>
                  )}
                </div>
              </div>

              {batchSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2 font-medium">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-950">{batchSuccessMsg}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="text-emerald-700 underline font-bold cursor-pointer hover:opacity-80 shrink-0"
                    >
                      Xem danh sách thành viên
                    </button>
                  </div>
                  {batchResult && batchResult.emails.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(batchResult.emails.join('\n'));
                          setCopiedNotice(`Đã sao chép ${batchResult.emails.length} Gmail vào clipboard!`);
                          setTimeout(() => setCopiedNotice(null), 3000);
                        }}
                        className="px-2 py-1 rounded bg-white hover:bg-emerald-100 border border-emerald-300 text-[11px] font-bold text-emerald-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-emerald-700" />
                        <span>Sao chép {batchResult.emails.length} Gmail này</span>
                      </button>
                      {copiedNotice && (
                        <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          {copiedNotice}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Textarea for Gmail List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-stone-700 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span>Dán hoặc nhập danh sách Gmail học viên:</span>
                  </label>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    batchParsedEmails.length > 0
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-stone-100 text-stone-500'
                  }`}>
                    Đã nhận diện: {batchParsedEmails.length} Gmail
                  </span>
                </div>

                <textarea
                  rows={5}
                  value={batchRawText}
                  onChange={(e) => handleBatchInputChange(e.target.value)}
                  placeholder="Dán danh sách Gmail tại đây (hỗ trợ copy từ Excel, Google Sheets, Zalo, Notepad... hoặc nhập mỗi email một dòng)..."
                  className="w-full p-3 text-xs font-mono rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 leading-relaxed"
                />
              </div>

              {/* Real-time Preview of Parsed Gmail Chips */}
              {batchParsedEmails.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span>Danh sách {batchParsedEmails.length} Gmail sẽ được đăng ký cấp quyền Google:</span>
                    <span className="text-[10px] text-stone-500 font-normal">Click (X) để loại bỏ</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {batchParsedEmails.map((em, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white text-stone-800 border border-amber-300 shadow-2xs"
                      >
                        <span>{em}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = batchParsedEmails.filter((_, i) => i !== idx);
                            setBatchParsedEmails(updated);
                            setBatchRawText(updated.join('\n'));
                          }}
                          className="text-stone-400 hover:text-rose-600 cursor-pointer text-xs leading-none"
                          title="Bỏ email này"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Configuration Settings for Duration, Start Date, Note */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Duration */}
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

                {/* Start Date */}
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
                    ➔ Dự tính hết hạn: <strong>{computeProjectedExpireDate(batchStartDate, batchDurationMonths)}</strong>
                  </div>
                </div>

                {/* Optional Note / Class Name */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">
                    Ghi chú / Nhóm học viên (tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={batchNote}
                    onChange={(e) => setBatchNote(e.target.value)}
                    placeholder="Ví dụ: Lớp tiếng Trung giao tiếp K10, Đăng ký tháng 11..."
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Submit Action Bar */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-100/90 to-orange-100/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <CalendarCheck className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Đăng ký: {batchParsedEmails.length} Gmail • Hạn: {batchDurationMonths} tháng ({computeProjectedExpireDate(batchStartDate, batchDurationMonths)})</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Sau khi đăng ký, học viên chỉ cần chọn <strong>Đăng nhập bằng Google</strong> để vào học Trang 1 đến 96 (không giới hạn thiết bị).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBatchSubmit}
                  disabled={isBatchSubmitting || batchParsedEmails.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98 shrink-0"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>
                    {isBatchSubmitting
                      ? 'Đang tiến hành đăng ký...'
                      : `Đăng ký & Cấp quyền ${batchParsedEmails.length > 0 ? `(${batchParsedEmails.length})` : ''} tài khoản Google`}
                  </span>
                </button>
              </div>
            </div>
          ) : activeTab === 'create' ? (
            /* ========================================================
               CREATE / REGISTER NEW GMAIL FORM
               ======================================================== */
            <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-orange-600" />
                  <span>Đăng Ký Tài Khoản Học Viên Mới (Gmail)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Thiết lập ngày đăng ký, thời hạn theo số tháng, mật khẩu và kiểm duyệt cho phép đăng nhập.
                </p>
              </div>

              {formSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Gmail */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Địa chỉ Gmail học viên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ví dụ: hocvien@gmail.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Mật khẩu đăng nhập <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder="Mật khẩu"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setNewPassword(Math.random().toString(36).substring(2, 8))}
                        className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
                        title="Tạo mật khẩu ngẫu nhiên"
                      >
                        Ngẫu nhiên
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Họ và tên / Ghi chú
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Ngày bắt đầu (Ngày đăng ký) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 font-medium"
                    />
                  </div>

                  {/* Duration in months */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Thời hạn (Số tháng tính từ ngày đăng ký) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        min={1}
                        max={120}
                        required
                        value={newDurationMonths}
                        onChange={(e) => setNewDurationMonths(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 font-bold text-center"
                      />
                      <div className="flex-1 flex flex-wrap gap-1">
                        {[1, 3, 6, 12].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setNewDurationMonths(m)}
                            className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                              newDurationMonths === m
                                ? 'bg-orange-600 text-white'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            {m} tháng
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expiration Calculation Banner */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-amber-950">
                      Thời hạn tính từ ngày đăng ký ({newStartDate}):
                    </span>
                  </div>
                  <div className="font-bold text-orange-700 text-sm">
                    Đến hết ngày: {computeProjectedExpireDate(newStartDate, newDurationMonths)}
                  </div>
                </div>

                {/* Approval Checkbox */}
                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">
                      Kiểm duyệt cho phép đăng nhập
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Bật để cho phép học viên bắt đầu đăng nhập ngay lập tức (không giới hạn thiết bị).
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newIsApproved}
                      onChange={(e) => setNewIsApproved(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* 1-Device Policy reminder */}
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5 px-1">
                  <Smartphone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>
                    Hệ thống sẽ tự động liên kết tài khoản với thiết bị đầu tiên mà học viên dùng để đăng nhập.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang tạo...' : 'Đăng Ký Tài Khoản Cho Học Viên'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* ========================================================
               MEMBERS LIST & APPROVAL TABLE
               ======================================================== */
            <div className="space-y-3">
              {/* Quick Bulk Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setActiveTab('batch')}
                    className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Phê duyệt copy danh sách Gmail hàng loạt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyApprovedEmails}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Sao chép toàn bộ danh sách Gmail đã duyệt vào clipboard"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-700" />
                    <span>Sao chép danh sách Gmail đã duyệt ({memberUsers.filter(u => u.isApproved || u.approved).length})</span>
                  </button>
                </div>

                {copiedNotice && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                    {copiedNotice}
                  </span>
                )}
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo Gmail hoặc họ tên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filterStatus === 'all'
                        ? 'bg-stone-800 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Tất cả ({memberUsers.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('active')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filterStatus === 'active'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    Còn hạn ({activeMembers})
                  </button>
                  <button
                    onClick={() => setFilterStatus('expired')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filterStatus === 'expired'
                        ? 'bg-rose-600 text-white'
                        : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    Hết hạn ({expiredMembers})
                  </button>
                  <button
                    onClick={() => setFilterStatus('locked')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filterStatus === 'locked'
                        ? 'bg-stone-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Đã khóa ({lockedMembers})
                  </button>
                </div>
              </div>

              {/* Members Table */}
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 space-y-2">
                  <Users className="w-10 h-10 text-stone-300 mx-auto" />
                  <div className="text-sm font-bold text-stone-700">
                    {searchQuery ? 'Không tìm thấy tài khoản phù hợp' : 'Chưa có tài khoản học viên nào'}
                  </div>
                  <p className="text-xs text-stone-500">
                    Hãy bấm vào tab "Đăng ký Gmail mới" để thêm học viên đầu tiên.
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Đăng ký thành viên ngay</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-amber-100/60 border-b border-amber-200 text-amber-950 font-bold">
                          <th className="p-3">Học viên (Gmail)</th>
                          <th className="p-3">Mật khẩu</th>
                          <th className="p-3">Ngày bắt đầu</th>
                          <th className="p-3">Thời hạn & Hạn dùng</th>
                          <th className="p-3 text-center">Kiểm duyệt đăng nhập</th>
                          <th className="p-3">Thiết bị (1 máy)</th>
                          <th className="p-3 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredUsers.map((u) => {
                          const isPwVisible = Boolean(visiblePasswords[u.id]);
                          const isExpired = u.status?.isExpired;
                          const daysLeft = u.status?.daysLeft || 0;

                          return (
                            <tr key={u.id} className="hover:bg-amber-50/40 transition-colors">
                              {/* Email & FullName */}
                              <td className="p-3">
                                <div className="font-bold text-stone-900">{u.email}</div>
                                {u.fullName && (
                                  <div className="text-[11px] text-stone-500">{u.fullName}</div>
                                )}
                              </td>

                              {/* Password */}
                              <td className="p-3">
                                <div className="flex items-center gap-1 font-mono">
                                  <span>{isPwVisible ? u.password : '••••••'}</span>
                                  <button
                                    onClick={() =>
                                      setVisiblePasswords((prev) => ({
                                        ...prev,
                                        [u.id]: !prev[u.id],
                                      }))
                                    }
                                    className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                                    title={isPwVisible ? 'Ẩn' : 'Xem mật khẩu'}
                                  >
                                    {isPwVisible ? (
                                      <EyeOff className="w-3.5 h-3.5" />
                                    ) : (
                                      <Eye className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </td>

                              {/* Start Date */}
                              <td className="p-3 whitespace-nowrap">
                                <div className="font-medium text-stone-800">{u.startDate}</div>
                                <div className="text-[10px] text-stone-400">Ngày đăng ký</div>
                              </td>

                              {/* Duration & Expiration */}
                              <td className="p-3 whitespace-nowrap">
                                <div className="font-bold text-stone-800">
                                  {u.durationMonths} tháng
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[11px] text-stone-600">
                                    Đến: {u.expireDate}
                                  </span>
                                  {isExpired ? (
                                    <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                                      Hết hạn
                                    </span>
                                  ) : (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                      Còn {daysLeft} ngày
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Approval Status */}
                              <td className="p-3 text-center whitespace-nowrap">
                                <button
                                  onClick={() => handleToggleApproval(u)}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition-all cursor-pointer ${
                                    u.isApproved
                                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                  }`}
                                  title="Bấm để Đổi trạng thái kiểm duyệt"
                                >
                                  {u.isApproved ? (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Đã duyệt ({u.durationMonths || 6} tháng)</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                                      <span className="text-orange-950 font-bold">Phê duyệt (Cấp 6 tháng)</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Device Binding Status */}
                              <td className="p-3 whitespace-nowrap">
                                {u.boundDeviceId ? (
                                  <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1 text-[11px] text-amber-900 font-medium bg-amber-100/70 px-2 py-0.5 rounded-md">
                                      <Smartphone className="w-3 h-3 text-orange-600" />
                                      <span className="max-w-[140px] truncate" title={u.deviceInfo || u.boundDeviceId}>
                                        {u.deviceInfo || 'Đã liên kết 1 máy'}
                                      </span>
                                    </div>
                                    <div>
                                      <button
                                        onClick={() => handleResetDevice(u)}
                                        className="text-[10px] font-bold text-orange-700 hover:text-orange-900 underline cursor-pointer flex items-center gap-0.5"
                                        title="Giải phóng thiết bị để học viên có thể đăng nhập trên máy khác"
                                      >
                                        <RotateCcw className="w-2.5 h-2.5" />
                                        <span>Đặt lại thiết bị</span>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-[11px] text-stone-400 italic">
                                    Chưa liên kết thiết bị
                                  </div>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="p-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1">
                                  {/* Quick Extend */}
                                  <button
                                    onClick={() => handleQuickExtend(u, 1)}
                                    className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold cursor-pointer transition-colors"
                                    title="Gia hạn thêm 1 tháng"
                                  >
                                    +1T
                                  </button>
                                  <button
                                    onClick={() => handleQuickExtend(u, 3)}
                                    className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold cursor-pointer transition-colors"
                                    title="Gia hạn thêm 3 tháng"
                                  >
                                    +3T
                                  </button>

                                  {/* Edit button */}
                                  <button
                                    onClick={() => openEditModal(u)}
                                    className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
                                  >
                                    Sửa
                                  </button>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteUser(u)}
                                    className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                    title="Xóa tài khoản"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with note */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-orange-600" />
            <span>
              Quy định: Các tài khoản sử dụng không giới hạn thiết bị (học viên có thể đăng nhập trên điện thoại, máy tính, iPad thoải mái).
            </span>
          </div>
          <button
            onClick={closeAdminModal}
            className="px-3 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold cursor-pointer text-xs"
          >
            Đóng bảng điều khiển
          </button>
        </div>
      </div>

      {/* ========================================================
          EDIT MEMBER MODAL
          ======================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-amber-500 overflow-hidden flex flex-col">
            <div className="bg-amber-600 text-white p-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm">Chỉnh Sửa Tài Khoản: {editingUser.email}</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-white hover:text-amber-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Họ tên / Ghi chú</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Mật khẩu mới</label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Thời hạn (Tháng)</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={editMonths}
                    onChange={(e) => setEditMonths(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 bg-white font-bold"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                Ngày hết hạn mới: <strong>{computeProjectedExpireDate(editStartDate, editMonths)}</strong>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-stone-700">Kiểm duyệt cho phép đăng nhập</span>
                <input
                  type="checkbox"
                  checked={editIsApproved}
                  onChange={(e) => setEditIsApproved(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardModal;
