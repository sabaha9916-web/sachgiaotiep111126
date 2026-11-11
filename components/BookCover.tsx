import React from 'react';
import ApiKeyInput from './ApiKeyInput';
import UserAccountBar from './UserAccountBar';

interface BookCoverProps {
  onSelectPage: (pageNumber: number) => void;
  onSelectLesson?: (lessonNumber: number, sectionNumber?: number) => void;
  hasApiKey: boolean;
  onOpenSettings: () => void;
  onSaveApiKey?: (key: string) => void;
}

const BookCover: React.FC<BookCoverProps> = ({ 
  onSelectPage, 
  onSaveApiKey 
}) => {
  const handlePageClick = (pageNumber: number) => {
    onSelectPage(pageNumber);
  };

  // 15 Bài học trọng tâm: Trang 7 đến Trang 96 (mỗi bài 6 trang)
  const mainLessons = Array.from({ length: 15 }, (_, i) => {
    const lessonNum = i + 1;
    const base = 7 + (lessonNum - 1) * 6;
    const dcPage = base + 4;
    const gtPage = base + 5;
    return {
      lessonNum,
      dichCau: {
        page: dcPage,
        title: `Trang ${dcPage}: Bài ${lessonNum} Dịch câu`,
      },
      giaoTiep: {
        page: gtPage,
        title: `Trang ${gtPage}: Bài ${lessonNum} Giao tiếp`,
      },
    };
  });

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-white text-stone-800 box-border overflow-hidden">
      {/* Decorative frame */}
      <div className="border-2 sm:border-3 border-amber-400 rounded-2xl p-2 sm:p-3.5 flex flex-col h-full justify-between relative overflow-hidden bg-amber-50/20 shadow-xs">
        
        {/* Header: MỤC LỤC & API Key */}
        <div className="flex items-center justify-between pb-2 border-b border-amber-300 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectPage(-1)}
              className="text-xs font-bold px-2 sm:px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-2xs transition-all flex items-center gap-1 cursor-pointer font-serif"
              title="Quay lại Trang bìa sách"
            >
              <span>← Bìa sách</span>
            </button>
            <button
              onClick={() => handlePageClick(0.5)}
              className="text-xs font-bold px-2 sm:px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
              title="Đến Trang Đăng nhập (nằm sau Mục lục)"
            >
              <span>👤 Đăng nhập →</span>
            </button>
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-amber-950 font-serif tracking-widest text-center uppercase">
            MỤC LỤC
          </h1>
          <div className="flex items-center justify-end gap-2">
            <UserAccountBar />
            <ApiKeyInput
              onSave={(key) => {
                if (onSaveApiKey) onSaveApiKey(key);
              }}
              compact={true}
              popoverAlign="right"
            />
          </div>
        </div>

        {/* Table of Contents Content */}
        <div className="flex-1 overflow-y-auto my-1.5 pr-1 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-5xl mx-auto">
              
              {/* Trang Đăng nhập: Nằm sau trang Mục lục và trước Trang 1 */}
              <div 
                key="login-page-row" 
                className="md:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 p-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 shadow-2xs hover:border-orange-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    👤
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span>TRANG ĐĂNG NHẬP</span>
                      <span className="text-[10px] bg-orange-200/80 text-orange-900 font-semibold px-1.5 py-0.2 rounded">
                        Sau Mục lục • Trước Trang 1
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-600">
                      Đăng nhập tài khoản học viên để đồng bộ dữ liệu và học từ Trang 1 đến Trang 96
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePageClick(0.5)}
                  className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs shrink-0"
                >
                  <span>Mở Trang Đăng nhập</span>
                  <span>→</span>
                </button>
              </div>

              {/* Bài mở đầu: Làm giống các bài khác còn lại */}
              <div 
                key="modau" 
                className="md:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-xl bg-white border border-amber-200 shadow-2xs hover:border-amber-400 transition-colors"
              >
                <div className="w-full sm:w-16 text-center font-bold text-xs text-amber-900 bg-amber-100/70 py-1 rounded-md shrink-0">
                  Bài mở đầu
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                  <button
                    onClick={() => handlePageClick(1)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 1: Phụ âm"
                  >
                    <span className="truncate group-hover:text-white">Trang 1: Phụ âm</span>
                  </button>

                  <button
                    onClick={() => handlePageClick(2)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 2: Nguyên âm"
                  >
                    <span className="truncate group-hover:text-white">Trang 2: Nguyên âm</span>
                  </button>

                  <button
                    onClick={() => handlePageClick(3)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 3: Ghép âm 1"
                  >
                    <span className="truncate group-hover:text-white">Trang 3: Ghép âm 1</span>
                  </button>

                  <button
                    onClick={() => handlePageClick(4)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 4: Ghép âm 2"
                  >
                    <span className="truncate group-hover:text-white">Trang 4: Ghép âm 2</span>
                  </button>

                  <button
                    onClick={() => handlePageClick(5)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 5: Ghép âm 3"
                  >
                    <span className="truncate group-hover:text-white">Trang 5: Ghép âm 3</span>
                  </button>

                  <button
                    onClick={() => handlePageClick(6)}
                    className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                    title="Trang 6: Ghép âm 4"
                  >
                    <span className="truncate group-hover:text-white">Trang 6: Ghép âm 4</span>
                  </button>
                </div>
              </div>

              {/* 15 Bài học còn lại */}
              {mainLessons.map(({ lessonNum, dichCau, giaoTiep }) => {
                const base = 7 + (lessonNum - 1) * 6;
                const tv = base;
                const gtv = base + 1;
                const gbk = base + 2;
                const bk = base + 3;
                return (
                  <div 
                    key={lessonNum} 
                    className="md:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-xl bg-white border border-amber-200 shadow-2xs hover:border-amber-400 transition-colors"
                  >
                    <div className="w-full sm:w-16 text-center font-bold text-xs text-amber-900 bg-amber-100/70 py-1 rounded-md shrink-0">
                      Bài {lessonNum}
                    </div>

                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                      <button
                        onClick={() => handlePageClick(tv)}
                        className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={`Trang ${tv}: Từ vựng ${lessonNum}`}
                      >
                        <span className="truncate group-hover:text-white">Trang {tv}: Từ vựng {lessonNum}</span>
                      </button>

                      <button
                        onClick={() => handlePageClick(gtv)}
                        className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={`Trang ${gtv}: Gõ từ vựng ${lessonNum}`}
                      >
                        <span className="truncate group-hover:text-white">Trang {gtv}: Gõ từ vựng {lessonNum}</span>
                      </button>

                      <button
                        onClick={() => handlePageClick(gbk)}
                        className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={`Trang ${gbk}: Gõ bài khóa ${lessonNum}`}
                      >
                        <span className="truncate group-hover:text-white">Trang {gbk}: Gõ bài khóa {lessonNum}</span>
                      </button>

                      <button
                        onClick={() => handlePageClick(bk)}
                        className="py-1.5 px-2 rounded-lg bg-teal-50/70 hover:bg-orange-600 hover:text-white border border-teal-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={`Trang ${bk}: Bài khóa ${lessonNum}`}
                      >
                        <span className="truncate group-hover:text-white">Trang {bk}: Bài khóa {lessonNum}</span>
                      </button>

                      <button
                        onClick={() => handlePageClick(dichCau.page)}
                        className="py-1.5 px-2 rounded-lg bg-amber-50/70 hover:bg-orange-600 hover:text-white border border-amber-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={dichCau.title}
                      >
                        <span className="truncate group-hover:text-white">{dichCau.title}</span>
                      </button>

                      <button
                        onClick={() => handlePageClick(giaoTiep.page)}
                        className="py-1.5 px-2 rounded-lg bg-orange-50/70 hover:bg-orange-600 hover:text-white border border-orange-200 text-stone-800 text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                        title={giaoTiep.title}
                      >
                        <span className="truncate group-hover:text-white">{giaoTiep.title}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

        {/* Interactive Corner Dog-Ear that flips to Trang Đăng nhập */}
        <div 
          onClick={() => handlePageClick(0.5)}
          className="page-dogear" 
          title="Lật sang Trang Đăng nhập"
        />

      </div>
    </div>
  );
};

export default BookCover;
