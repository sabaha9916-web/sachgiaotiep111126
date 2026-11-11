import React, { useState, useEffect } from 'react';
import { LessonData, LessonSection, getPageInfo } from '../data/lessonsData';
import ChatView from './ChatView';
import ApiKeyInput from './ApiKeyInput';
import UserAccountBar from './UserAccountBar';
import PageLockOverlay from './PageLockOverlay';
import { useAuth } from '../context/AuthContext';
import { RotateCcw, ChevronRight } from 'lucide-react';

interface LessonBookPageProps {
  lesson: LessonData;
  sectionNumber?: number; // 1, 2, 3, 4
  section?: LessonSection;
  hasApiKey: boolean;
  apiKey?: string;
  onOpenSettings: () => void;
  onSaveApiKey?: (key: string) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  currentPageIndex: number;
  onOpenToc?: () => void;
  onSelectSection?: (sectionNumber: number) => void;
}

const MAIN_LESSON_INFO: Record<number, { name: string; title: string; desc: string; retry: string }> = (() => {
  const info: Record<number, { name: string; title: string; desc: string; retry: string }> = {};
  
  const lessonDescMap: Record<number, string> = {
    1: "Bạn đã xuất sắc luyện dịch 20 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    2: "Bạn đã xuất sắc luyện dịch 29 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    3: "Bạn đã xuất sắc luyện dịch 30 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    4: "Bạn đã xuất sắc luyện dịch 18 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    5: "Bạn đã xuất sắc luyện dịch 28 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    6: "Bạn đã xuất sắc luyện dịch 27 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    7: "Bạn đã xuất sắc luyện dịch 20 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    8: "Bạn đã xuất sắc luyện dịch 27 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    9: "Bạn đã xuất sắc luyện dịch 34 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    10: "Bạn đã xuất sắc luyện dịch 23 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    11: "Bạn đã xuất sắc luyện dịch 17 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    12: "Bạn đã xuất sắc luyện dịch 29 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    13: "Bạn đã xuất sắc luyện dịch 25 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    14: "Bạn đã xuất sắc luyện dịch 24 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
    15: "Bạn đã xuất sắc luyện dịch 30 câu tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.",
  };

  // 6 Trang Bài mở đầu (Trang 1 đến 6)
  info[1] = { name: "Bài mở đầu: Phụ âm", title: "Bài mở đầu: Phụ âm", desc: "Nội dung Bài mở đầu - Phụ âm (Thanh mẫu) trực tuyến.", retry: "Tải lại trang Phụ âm" };
  info[2] = { name: "Bài mở đầu: Nguyên âm", title: "Bài mở đầu: Nguyên âm", desc: "Nội dung Bài mở đầu - Nguyên âm (Vận mẫu) trực tuyến.", retry: "Tải lại trang Nguyên âm" };
  info[3] = { name: "Bài mở đầu: Ghép âm 1", title: "Bài mở đầu: Ghép âm 1", desc: "Nội dung Bài mở đầu - Ghép âm 1 trực tuyến.", retry: "Tải lại trang Ghép âm 1" };
  info[4] = { name: "Bài mở đầu: Ghép âm 2", title: "Bài mở đầu: Ghép âm 2", desc: "Nội dung Bài mở đầu - Ghép âm 2 trực tuyến.", retry: "Tải lại trang Ghép âm 2" };
  info[5] = { name: "Bài mở đầu: Ghép âm 3", title: "Bài mở đầu: Ghép âm 3", desc: "Nội dung Bài mở đầu - Ghép âm 3 trực tuyến.", retry: "Tải lại trang Ghép âm 3" };
  info[6] = { name: "Bài mở đầu: Ghép âm 4", title: "Bài mở đầu: Ghép âm 4", desc: "Nội dung Bài mở đầu - Ghép âm 4 trực tuyến.", retry: "Tải lại trang Ghép âm 4" };

  for (let l = 1; l <= 15; l++) {
    const base = 7 + (l - 1) * 6;
    info[base] = { name: `Từ vựng ${l}`, title: `Từ vựng ${l}`, desc: `Nội dung Từ vựng Bài ${l} trực tuyến.`, retry: `Tải lại trang Từ vựng ${l}` };
    info[base + 1] = { name: `Gõ từ vựng ${l}`, title: `Gõ từ vựng ${l}`, desc: `Luyện gõ từ vựng Bài ${l} trực tuyến.`, retry: `Tải lại trang Gõ từ vựng ${l}` };
    info[base + 2] = { name: `Gõ bài khóa ${l}`, title: `Gõ bài khóa ${l}`, desc: `Luyện gõ bài khóa Bài ${l} trực tuyến.`, retry: `Tải lại trang Gõ bài khóa ${l}` };
    info[base + 3] = { name: `Bài khóa ${l}`, title: `Bài khóa ${l}`, desc: `Nội dung Bài khóa ${l} trực tuyến.`, retry: `Tải lại trang Bài khóa ${l}` };
    info[base + 4] = { 
      name: `Bài ${l} Dịch câu`, 
      title: `Chúc mừng bạn đã hoàn thành Bài ${l} Dịch câu!`, 
      desc: lessonDescMap[l] || `Bạn đã xuất sắc luyện dịch tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh.`, 
      retry: `Luyện lại Bài ${l} Dịch câu` 
    };
    info[base + 5] = { 
      name: `Bài ${l} Giao tiếp`, 
      title: `Chúc mừng bạn đã hoàn thành Bài ${l} Giao tiếp!`, 
      desc: `Bạn đã xuất sắc hoàn thành luyện phản xạ hội thoại hai chiều Bài ${l} Giao tiếp.`, 
      retry: `Luyện lại Bài ${l} Giao tiếp` 
    };
  }
  return info;
})();

const EMBEDDED_PAGES: Record<number, { title: string; subtitle: string; url: string }> = (() => {
  const pages: Record<number, { title: string; subtitle: string; url: string }> = {};

  // 6 trang thuộc "Bài mở đầu" (Trang 1 đến 6)
  pages[1] = {
    title: `Trang 1:`,
    subtitle: `Bài mở đầu - Phụ âm`,
    url: `https://tiengtrungbachai.online/modau/phuam.html`,
  };
  pages[2] = {
    title: `Trang 2:`,
    subtitle: `Bài mở đầu - Nguyên âm`,
    url: `https://tiengtrungbachai.online/modau/nguyenam.html`,
  };
  pages[3] = {
    title: `Trang 3:`,
    subtitle: `Bài mở đầu - Ghép âm 1`,
    url: `https://tiengtrungbachai.online/modau/ghepam1.html`,
  };
  pages[4] = {
    title: `Trang 4:`,
    subtitle: `Bài mở đầu - Ghép âm 2`,
    url: `https://tiengtrungbachai.online/modau/ghepam2.html`,
  };
  pages[5] = {
    title: `Trang 5:`,
    subtitle: `Bài mở đầu - Ghép âm 3`,
    url: `https://tiengtrungbachai.online/modau/ghepam3.html`,
  };
  pages[6] = {
    title: `Trang 6:`,
    subtitle: `Bài mở đầu - Ghép âm 4`,
    url: `https://tiengtrungbachai.online/modau/ghepam4.html`,
  };

  for (let l = 1; l <= 15; l++) {
    const base = 7 + (l - 1) * 6;
    pages[base] = {
      title: `Trang ${base}:`,
      subtitle: `Từ vựng ${l}`,
      url: `https://tiengtrungbachai.online/TrungHanyukouyu/amboikouyu1/kouyu1tuvung${l}.html`,
    };
    pages[base + 1] = {
      title: `Trang ${base + 1}:`,
      subtitle: `Gõ từ vựng ${l}`,
      url: `https://kouyu1gotuvungbaikhoa.netlify.app/kouyu1gotuvung${l}.html`,
    };
    pages[base + 2] = {
      title: `Trang ${base + 2}:`,
      subtitle: `Gõ bài khóa ${l}`,
      url: `https://kouyu1gotuvungbaikhoa.netlify.app/kouyu1gobaikhoa${l}.html`,
    };
    pages[base + 3] = {
      title: `Trang ${base + 3}:`,
      subtitle: `Bài khóa ${l}`,
      url: `https://tiengtrungbachai.online/TrungHanyukouyu/amboikouyu1/kouyu1baikhoa${l}.html`,
    };
  }

  return pages;
})();

const LessonBookPage: React.FC<LessonBookPageProps> = ({
  lesson,
  sectionNumber = 1,
  hasApiKey,
  apiKey,
  onOpenSettings,
  onSaveApiKey,
  onPrevPage,
  onNextPage,
  totalPages,
  currentPageIndex,
  onOpenToc,
}) => {
  // Session key to force remount/restart when lesson/section changes or restarted
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  // When lesson or section changes, automatically reset isEnded and restart voice room
  useEffect(() => {
    setIsEnded(false);
    setSessionKey(prev => prev + 1);
  }, [lesson.lessonNumber, sectionNumber, currentPageIndex]);

  const handleEndChat = () => {
    setIsEnded(true);
  };

  const handleRestartChat = () => {
    setIsEnded(false);
    setSessionKey(prev => prev + 1);
  };


  const { canAccessPage } = useAuth();
  const pageAccess = canAccessPage(currentPageIndex);
  const pageInfo = getPageInfo(currentPageIndex);
  const currentTitle = MAIN_LESSON_INFO[currentPageIndex]?.name || pageInfo?.pageTitle || `Trang ${currentPageIndex}`;

  // Check login and access permission for pages 1-96
  if (!pageAccess.allowed) {
    return (
      <div className="w-full h-full flex flex-col relative bg-white text-stone-800 overflow-hidden p-1.5 sm:p-2.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-amber-300 text-xs font-serif text-stone-700 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <ApiKeyInput
              onSave={(key) => {
                if (onSaveApiKey) onSaveApiKey(key);
              }}
              compact={true}
              popoverAlign="left"
            />

            <div 
              onClick={onOpenToc}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-2xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
              title="Mở mục lục"
            >
              <span>Trang {currentPageIndex}:</span>
              <span className="font-extrabold tracking-wide">
                {currentTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UserAccountBar />
          </div>
        </div>

        <div className="flex-1 w-full h-full min-h-0 relative">
          <PageLockOverlay
            pageNumber={currentPageIndex}
            pageTitle={currentTitle}
            onGoToCover={onPrevPage}
            onGoToToc={onOpenToc || (() => {})}
          />
        </div>
      </div>
    );
  }

  // Các trang nhúng liên kết trực tuyến
  if (EMBEDDED_PAGES[currentPageIndex]) {
    const embed = EMBEDDED_PAGES[currentPageIndex];
    return (
      <div className="w-full h-full flex flex-col relative bg-white text-stone-800 overflow-hidden p-1.5 sm:p-2.5">
        {/* Top Running Page Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-amber-300 text-xs font-serif text-stone-700 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <ApiKeyInput
              onSave={(key) => {
                if (onSaveApiKey) onSaveApiKey(key);
              }}
              compact={true}
              popoverAlign="left"
            />

            <div 
              onClick={onOpenToc}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-2xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
              title="Mở mục lục"
            >
              <span>{embed.title}</span>
              <span className="font-extrabold tracking-wide">
                {embed.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UserAccountBar />
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="flex-1 w-full h-full min-h-0 pt-1 relative bg-white rounded-xl overflow-hidden border border-amber-200 shadow-inner">
          <iframe
            src={embed.url}
            title={`${embed.title} ${embed.subtitle}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Page corner dog-ears for flipping */}
        <div 
          onClick={onPrevPage}
          className="page-dogear-left hidden sm:block cursor-pointer" 
          title="Lật về trang trước"
        />
        <div 
          onClick={onNextPage}
          className="page-dogear hidden sm:block cursor-pointer" 
          title="Lật sang trang sau"
        />
      </div>
    );
  }


  const congratulationInfo = MAIN_LESSON_INFO[currentPageIndex] || {
    name: currentTitle,
    title: `Chúc mừng bạn đã hoàn thành ${currentTitle}!`,
    desc: `Bạn đã xuất sắc hoàn thành nội dung luyện tập của Trang ${currentPageIndex}.`,
    retry: `Luyện lại ${currentTitle}`
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-white text-stone-800 overflow-hidden p-1.5 sm:p-2.5">
      
      {/* Top Running Page Header with Golden-Orange Accent */}
      <div className="flex items-center justify-between pb-1.5 border-b border-amber-300 text-xs font-serif text-stone-700 flex-shrink-0">
        
        {/* Prominent Page Badge e.g. "Trang 121: Bài 1 Dịch câu" with API key in front */}
        <div className="flex items-center gap-2 min-w-0">
          <ApiKeyInput
            onSave={(key) => {
              if (onSaveApiKey) onSaveApiKey(key);
            }}
            compact={true}
            popoverAlign="left"
          />

          <div 
            onClick={onOpenToc}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-2xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
            title="Mở mục lục"
          >
            <span>Trang {currentPageIndex}:</span>
            <span className="font-extrabold tracking-wide">
              {currentTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UserAccountBar />
        </div>

      </div>

      {/* Main Area: Directly The Live AI Speaking Practice Room */}
      <div className="flex-1 flex flex-col w-full h-full min-h-0 pt-1 relative">
        {isEnded ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center my-auto space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 max-w-md w-full space-y-3 shadow-xs">
              <div className="text-sm font-bold text-emerald-900">
                {congratulationInfo.title}
              </div>
              <p className="text-xs text-stone-600">
                {congratulationInfo.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={handleRestartChat}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{congratulationInfo.retry}</span>
                </button>

                {currentPageIndex < totalPages && (
                  <button
                    onClick={onNextPage}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    <span>Lật sang Trang {currentPageIndex + 1}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col flex-1 min-h-0">
            <ChatView
              key={`live-chat-${lesson.lessonNumber}-${sectionNumber}-${currentPageIndex}-${sessionKey}`}
              lessonNumber={lesson.lessonNumber}
              sectionNumber={sectionNumber}
              currentPageIndex={currentPageIndex}
              sectionTitle={currentTitle}
              lessonTitle={currentTitle}
              onEndChat={handleEndChat}
              apiKey={apiKey || localStorage.getItem('gemini-api-key') || (process.env.API_KEY as string) || (process.env.GEMINI_API_KEY as string) || ''}
            />
          </div>
        )}
      </div>

      {/* Page corner dog-ears for flipping */}
      <div 
        onClick={onPrevPage}
        className="page-dogear-left hidden sm:block cursor-pointer" 
        title="Lật về trang trước"
      />
      <div 
        onClick={onNextPage}
        className="page-dogear hidden sm:block cursor-pointer" 
        title="Lật sang trang sau"
      />

    </div>
  );
};

export default LessonBookPage;
