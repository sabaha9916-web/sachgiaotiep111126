import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  TOTAL_BOOK_PAGES, 
  getPageInfo, 
  getPageNumberForLessonSection 
} from '../data/lessonsData';
import BookCover from './BookCover';
import FrontCover4D from './FrontCover4D';
import LessonBookPage from './LessonBookPage';
import LoginPage from './LoginPage';
import { useAuth } from '../context/AuthContext';
import { playPageFlipSound } from '../utils/soundEffects';
import { resumeSharedAudioContexts, autoPrepareAudioAndMic } from '../utils/audioStreamManager';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  X,
  Sparkles,
  LogIn
} from 'lucide-react';

interface FlipBookProps {
  hasApiKey: boolean;
  apiKey?: string;
  onOpenApiKeyModal: () => void;
  onSaveApiKey?: (key: string) => void;
  initialLessonNumber?: number;
  initialSectionNumber?: number;
  initialPage?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({
  hasApiKey,
  apiKey,
  onOpenApiKeyModal,
  onSaveApiKey,
  initialLessonNumber,
  initialSectionNumber = 1,
  initialPage,
}) => {
  // Page -1: Front Book Cover 4D (Trang bìa sách hình 4D Trợ lý Tiếng Trung)
  // Page 0: Table of contents (Mục lục 96 trang)
  // Page 1..96: 96 Content Pages
  const initialPageIndex = typeof initialPage === 'number' 
    ? initialPage
    : initialLessonNumber 
      ? getPageNumberForLessonSection(initialLessonNumber, initialSectionNumber)
      : -1; // Default to -1 so user sees the 4D Cover Page before Mục lục!

  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(initialPageIndex);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [soundEnabled] = useState<boolean>(true);
  const [showTocModal, setShowTocModal] = useState<boolean>(false);
  const [jumpInput, setJumpInput] = useState<string>('1');

  // Swipe detection refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalPages = TOTAL_BOOK_PAGES;

  const goToPage = useCallback((newPageIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (newPageIndex === currentPage || isFlipping) return;
    if (newPageIndex < -1 || newPageIndex > totalPages) return;

    // Ensure audio contexts & microphone stay hot on user page turn
    resumeSharedAudioContexts();
    autoPrepareAudioAndMic();

    setIsFlipping(true);
    setFlipDirection(direction);
    playPageFlipSound(soundEnabled);

    setTimeout(() => {
      setCurrentPage(newPageIndex);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 450);
  }, [currentPage, isFlipping, soundEnabled, totalPages]);

  const handleNextPage = () => {
    if (currentPage === -1) {
      goToPage(0, 'next');
    } else if (currentPage === 0) {
      goToPage(0.5, 'next');
    } else if (currentPage === 0.5) {
      goToPage(1, 'next');
    } else if (currentPage < totalPages) {
      goToPage(currentPage + 1, 'next');
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      goToPage(0.5, 'prev');
    } else if (currentPage === 0.5) {
      goToPage(0, 'prev');
    } else if (currentPage === 0) {
      goToPage(-1, 'prev');
    } else if (currentPage > 1) {
      goToPage(currentPage - 1, 'prev');
    }
  };

  const handleSelectPage = (pageNumber: number) => {
    goToPage(pageNumber, pageNumber > currentPage ? 'next' : 'prev');
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't flip when typing in an input
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const pageInfo = currentPage >= 1 ? getPageInfo(currentPage) : null;
  const currentLesson = pageInfo ? pageInfo.lesson : null;
  const currentSection = pageInfo ? pageInfo.section : null;
  const currentSectionNumber = pageInfo ? pageInfo.sectionNumber : 1;

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between relative select-none">
      
      {/* ========================================================
          MAIN FULL CONTENT STAGE (FULL WIDTH & FULL HEIGHT)
          ======================================================== */}
      <div 
        className="w-full flex-1 min-h-0 flex items-center justify-center relative perspective-2000 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Flip Navigation Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === -1 || isFlipping}
          className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
            currentPage === -1 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-2 border-white hover:scale-110 active:scale-95'
          }`}
          title="Trang trước (Phím mũi tên trái)"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Flip Navigation Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isFlipping}
          className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
            currentPage === totalPages 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-2 border-white hover:scale-110 active:scale-95'
          }`}
          title="Trang sau (Phím mũi tên phải)"
          aria-label="Trang sau"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Full Content Frame */}
        <div className="w-full h-full relative bg-white flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* Flipping Page Content Canvas */}
          <div className={`w-full h-full flex flex-col flex-1 min-h-0 transition-transform duration-300 ${
            isFlipping && flipDirection === 'next' ? 'animate-page-flip-next' : ''
          } ${
            isFlipping && flipDirection === 'prev' ? 'animate-page-flip-prev' : ''
          }`}>
            {currentPage === -1 ? (
              <FrontCover4D 
                onOpenToc={() => goToPage(0, 'next')}
                onSelectPage={handleSelectPage}
                hasApiKey={hasApiKey}
                onOpenSettings={onOpenApiKeyModal}
                onSaveApiKey={onSaveApiKey}
                currentUser={user}
                onOpenLogin={() => goToPage(0.5, 'next')}
              />
            ) : currentPage === 0 ? (
              <BookCover 
                onSelectPage={handleSelectPage}
                hasApiKey={hasApiKey}
                onOpenSettings={onOpenApiKeyModal}
                onSaveApiKey={onSaveApiKey}
              />
            ) : currentPage === 0.5 ? (
              <LoginPage 
                onSelectPage={handleSelectPage}
                onGoToToc={() => goToPage(0, 'prev')}
                onGoToPage1={() => goToPage(1, 'next')}
                hasApiKey={hasApiKey}
                onOpenSettings={onOpenApiKeyModal}
                onSaveApiKey={onSaveApiKey}
              />
            ) : currentLesson ? (
              <LessonBookPage 
                lesson={currentLesson}
                sectionNumber={currentSectionNumber}
                section={currentSection || undefined}
                hasApiKey={hasApiKey}
                apiKey={apiKey}
                onOpenSettings={onOpenApiKeyModal}
                onSaveApiKey={onSaveApiKey}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                totalPages={totalPages}
                currentPageIndex={currentPage}
                onOpenToc={() => setShowTocModal(true)}
              />
            ) : null}
          </div>

        </div>

      </div>

      {/* ========================================================
          BOTTOM QUICK NAVIGATION BAR
          ======================================================== */}
      <div className="w-full flex-shrink-0 bg-amber-50/90 border-t-2 border-amber-300 py-1.5 px-3 flex items-center justify-between gap-1.5 box-border">
        
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === -1 || isFlipping}
          className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-amber-100 text-amber-900 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-300 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Trước</span>
        </button>

        {/* Center: Page indicator showing current page */}
        <button
          onClick={() => setShowTocModal(true)}
          className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          title="Xem mục lục"
        >
          {currentPage === -1 ? (
            <span className="flex items-center gap-1.5 text-stone-800 font-serif font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#934b2d]" />
              <span>Trợ lý Tiếng Trung</span>
            </span>
          ) : currentPage === 0 ? (
            <span>Mục lục (Trang 1 - {totalPages})</span>
          ) : currentPage === 0.5 ? (
            <span className="flex items-center gap-1.5 text-orange-900 font-bold">
              <LogIn className="w-3.5 h-3.5 text-orange-600" />
              <span>Trang Đăng nhập</span>
            </span>
          ) : (
            <>
              <span>Trang {currentPage} / {totalPages}</span>
              {pageInfo && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[11px] font-semibold">
                  {pageInfo.pageTitle}
                </span>
              )}
            </>
          )}
        </button>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isFlipping}
          className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Sau</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* ========================================================
          TABLE OF CONTENTS MODAL - FROM TRANG 1 TO TRANG 96
          ======================================================== */}
      {showTocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 sm:border-4 border-amber-400 overflow-hidden flex flex-col max-h-[88vh]">
            
            {/* Modal Header */}
            <div className="p-3 sm:p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <h3 className="font-serif font-black text-amber-950 text-base sm:text-lg uppercase tracking-wider">
                  MỤC LỤC (TRANG 1 - {totalPages})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    goToPage(-1, 'prev');
                    setShowTocModal(false);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#852b12] hover:bg-[#6c200b] text-[#fff8ee] shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 font-serif"
                  title="Về Trang bìa sách"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Trang bìa</span>
                </button>
                <button
                  onClick={() => setShowTocModal(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-amber-100 cursor-pointer"
                  aria-label="Đóng mục lục"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Quick Page Jump */}
            <div className="p-2 sm:px-4 bg-amber-50/50 border-b border-amber-200 flex items-center justify-end gap-2">
              {/* Jump to page form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (jumpInput.toLowerCase().trim() === 'login' || jumpInput.trim() === '0.5') {
                    goToPage(0.5, 0.5 > currentPage ? 'next' : 'prev');
                    setShowTocModal(false);
                    return;
                  }
                  const p = parseInt(jumpInput, 10);
                  if (!isNaN(p) && p >= 1 && p <= totalPages) {
                    goToPage(p, p > currentPage ? 'next' : 'prev');
                    setShowTocModal(false);
                  }
                }}
                className="flex items-center gap-1 text-xs"
              >
                <span className="text-stone-600 font-medium hidden sm:inline">Trang:</span>
                <input
                  type="text"
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  className="w-14 px-1.5 py-0.5 rounded border border-amber-300 text-center font-bold text-stone-900 bg-white"
                  title={`Nhập số trang từ 1 đến ${totalPages}`}
                />
                <button
                  type="submit"
                  className="px-2.5 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                >
                  Đi
                </button>
              </form>
            </div>

            {/* Modal Body */}
            <div className="p-2.5 sm:p-4 overflow-y-auto space-y-2 flex-1 scrollbar-thin">
                <>
                  {/* Trang Đăng nhập: Nằm sau trang Mục lục và trước Trang 1 */}
                  <div
                    key="login-page-modal"
                    className="p-2 rounded-xl border border-orange-300 bg-orange-50/70 hover:border-orange-500 transition-colors flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                        <LogIn className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-orange-950 font-serif flex items-center gap-1.5">
                          <span>Trang Đăng nhập</span>
                          <span className="text-[10px] bg-orange-200/90 text-orange-900 font-semibold px-1.5 py-0.2 rounded font-sans">
                            Sau Mục lục • Trước Trang 1
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-600 font-sans">
                          Đăng nhập tài khoản học viên để đồng bộ dữ liệu học tập
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        goToPage(0.5, 0.5 > currentPage ? 'next' : 'prev');
                        setShowTocModal(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center shrink-0 ${
                        currentPage === 0.5
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-white hover:bg-orange-600 hover:text-white border border-orange-300 text-stone-800'
                      }`}
                    >
                      Mở Trang Đăng nhập →
                    </button>
                  </div>

                  {/* Bài mở đầu: Làm giống các bài khác còn lại */}
                  <div
                    key="modau"
                    className="p-2 rounded-xl border border-stone-200 bg-white hover:border-amber-400 transition-colors flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  >
                    <div className="w-full sm:w-16 text-center font-bold text-xs text-amber-900 bg-amber-100/70 py-1 rounded-md shrink-0">
                      Bài mở đầu
                    </div>

                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                      <button
                        onClick={() => {
                          goToPage(1, 1 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 1
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 1: Phụ âm"
                      >
                        Trang 1: Phụ âm
                      </button>

                      <button
                        onClick={() => {
                          goToPage(2, 2 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 2
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 2: Nguyên âm"
                      >
                        Trang 2: Nguyên âm
                      </button>

                      <button
                        onClick={() => {
                          goToPage(3, 3 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 3
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 3: Ghép âm 1"
                      >
                        Trang 3: Ghép âm 1
                      </button>

                      <button
                        onClick={() => {
                          goToPage(4, 4 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 4
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 4: Ghép âm 2"
                      >
                        Trang 4: Ghép âm 2
                      </button>

                      <button
                        onClick={() => {
                          goToPage(5, 5 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 5
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 5: Ghép âm 3"
                      >
                        Trang 5: Ghép âm 3
                      </button>

                      <button
                        onClick={() => {
                          goToPage(6, 6 > currentPage ? 'next' : 'prev');
                          setShowTocModal(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                          currentPage === 6
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                        }`}
                        title="Trang 6: Ghép âm 4"
                      >
                        Trang 6: Ghép âm 4
                      </button>
                    </div>
                  </div>

                  {/* 15 Bài học còn lại */}
                  {Array.from({ length: 15 }, (_, i) => {
                    const lessonNum = i + 1;
                    const base = 7 + (lessonNum - 1) * 6;
                    const tv = base;
                    const gtv = base + 1;
                    const gbk = base + 2;
                    const bk = base + 3;
                    const dc = base + 4;
                    const gt = base + 5;
                    return (
                      <div
                        key={lessonNum}
                        className="p-2 rounded-xl border border-stone-200 bg-white hover:border-amber-400 transition-colors flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                      >
                        <div className="w-full sm:w-16 text-center font-bold text-xs text-amber-900 bg-amber-100/70 py-1 rounded-md shrink-0">
                          Bài {lessonNum}
                        </div>

                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                          <button
                            onClick={() => {
                              goToPage(tv, tv > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === tv
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                            }`}
                            title={`Trang ${tv}: Từ vựng ${lessonNum}`}
                          >
                            Trang {tv}: Từ vựng {lessonNum}
                          </button>

                          <button
                            onClick={() => {
                              goToPage(gtv, gtv > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === gtv
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                            }`}
                            title={`Trang ${gtv}: Gõ từ vựng ${lessonNum}`}
                          >
                            Trang {gtv}: Gõ từ vựng {lessonNum}
                          </button>

                          <button
                            onClick={() => {
                              goToPage(gbk, gbk > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === gbk
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                            }`}
                            title={`Trang ${gbk}: Gõ bài khóa ${lessonNum}`}
                          >
                            Trang {gbk}: Gõ bài khóa {lessonNum}
                          </button>

                          <button
                            onClick={() => {
                              goToPage(bk, bk > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === bk
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-teal-50/70 hover:bg-orange-600 hover:text-white border-teal-200 text-stone-800'
                            }`}
                            title={`Trang ${bk}: Bài khóa ${lessonNum}`}
                          >
                            Trang {bk}: Bài khóa {lessonNum}
                          </button>

                          <button
                            onClick={() => {
                              goToPage(dc, dc > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === dc
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-amber-50/70 hover:bg-orange-600 hover:text-white border-amber-200 text-stone-800'
                            }`}
                            title={`Trang ${dc}: Bài ${lessonNum} Dịch câu`}
                          >
                            Trang {dc}: Bài {lessonNum} Dịch câu
                          </button>

                          <button
                            onClick={() => {
                              goToPage(gt, gt > currentPage ? 'next' : 'prev');
                              setShowTocModal(false);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer text-[11px] sm:text-xs font-semibold truncate ${
                              currentPage === gt
                                ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                                : 'bg-orange-50/70 hover:bg-orange-600 hover:text-white border-orange-200 text-stone-800'
                            }`}
                            title={`Trang ${gt}: Bài ${lessonNum} Giao tiếp`}
                          >
                            Trang {gt}: Bài {lessonNum} Giao tiếp
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FlipBook;
