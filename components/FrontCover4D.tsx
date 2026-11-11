import React, { useState, useRef } from 'react';
import { ArrowRight, Feather, ShieldCheck } from 'lucide-react';
import ApiKeyInput from './ApiKeyInput';
import { AuthUser } from '../utils/authManager';

interface FrontCover4DProps {
  onOpenToc: () => void;
  onSelectPage?: (pageNumber: number) => void;
  hasApiKey: boolean;
  onOpenSettings: () => void;
  onSaveApiKey?: (key: string) => void;
  currentUser?: AuthUser | null;
  onOpenLogin?: () => void;
}

const FrontCover4D: React.FC<FrontCover4DProps> = ({
  onOpenToc,
  onSaveApiKey,
  currentUser,
  onOpenLogin,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [artChoice] = useState<'lady' | 'landscape'>('lady');

  // Gentle 3D Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-[#f5ede0] text-stone-800 box-border overflow-hidden relative select-none font-serif">
      
      {/* Traditional Ancient Book Cover Canvas with Double Border and Stitch Spine */}
      <div className="border-[3px] border-[#934b2d]/70 rounded-xl p-2.5 sm:p-5 flex flex-col h-full justify-between relative overflow-hidden bg-[#faf4eb] shadow-xl book-edge-stack-right">
        
        {/* Subtle antique xuan paper grain & soft ink background wash */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#8c5332_0.75px,transparent_0.75px)] [background-size:14px_14px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d4a373]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#934b2d]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Traditional Four-Hole Thread-Bound Book Spine (Chỉ may gáy sách cổ trang) on left edge */}
        <div className="absolute left-1.5 sm:left-2.5 top-0 bottom-0 w-4 flex flex-col justify-around items-center pointer-events-none z-20">
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" title="Chỉ gáy sách cổ" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#8b4513] bg-[#d7c4a3] shadow-xs" />
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#8b4513]/40 border-r border-[#8b4513]/20" />
        </div>

        {/* Inner Fine Classical Border (Khung chỉ viền cổ phong) */}
        <div className="absolute inset-2 sm:inset-3 border border-[#b27d56]/40 rounded-lg pointer-events-none" />

        {/* Top Header Bar: Clean & Minimal Classical Style */}
        <div className="flex items-center justify-between pb-2 pl-3 sm:pl-4 border-b border-[#c89f7e]/50 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#6b2d16]">
              <Feather className="w-3.5 h-3.5 text-[#934b2d]" />
              <span className="tracking-widest">TỰ HỌC TIẾNG TRUNG</span>
            </span>
            <span className="hidden sm:inline-block text-[#9e7454] text-xs">•</span>
            <span className="hidden sm:inline-block text-[11px] text-[#78543d] font-sans">
              96 Trang Khẩu Ngữ Phản Xạ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-400 bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold text-xs cursor-pointer shadow-2xs transition-all active:scale-95"
                title="Quản lý tài khoản"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-sans text-[11px] font-semibold">{currentUser.role === 'admin' ? 'Admin' : currentUser.gmail}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Đăng nhập để vào xem từ Trang 1 đến Trang 96"
              >
                <img 
                  src="/assets/aistudio/image_abfe7061.png" 
                  alt="Đăng nhập" 
                  className="h-8 sm:h-8.5 w-auto object-contain drop-shadow-2xs" 
                />
              </button>
            )}

            <ApiKeyInput
              onSave={(key) => {
                if (onSaveApiKey) onSaveApiKey(key);
              }}
              compact={true}
              popoverAlign="right"
            />
          </div>
        </div>

        {/* Main Ancient Book Cover Center Stage */}
        <div className="flex-1 flex items-center justify-center my-auto min-h-0 relative z-10 py-2 sm:py-4 pl-3 sm:pl-4 overflow-hidden">
          
          {/* Classical Artwork in Round Moon Gate / Antique Scroll Frame */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center cursor-pointer group"
            style={{
              perspective: '1200px',
            }}
            onClick={onOpenToc}
            title="Nhấn để mở Mục lục"
          >
            {/* Soft Warm Antique Aura */}
            <div className={`absolute -inset-3 bg-gradient-to-tr from-[#934b2d]/20 via-[#c89f7e]/30 to-[#e5c59e]/20 rounded-2xl blur-xl transition-opacity duration-500 ${
              isHovered ? 'opacity-90 scale-102' : 'opacity-60'
            }`} />

            {/* Antique Scroll Card */}
            <div 
              className="relative rounded-2xl overflow-hidden border-2 sm:border-3 border-[#934b2d]/70 shadow-2xl bg-[#f5ede0] transition-transform duration-200 ease-out flex items-center justify-center"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? '1.02' : '1'}, ${isHovered ? '1.02' : '1'}, 1)`,
                width: 'min(82vw, 400px)',
                maxHeight: 'min(70vh, 540px)',
                aspectRatio: '3/4',
              }}
            >
              <img 
                src={artChoice === 'lady' ? '/cover_co_trang.jpg' : '/cover_thuy_mac.jpg'} 
                alt="Trang bìa phong cách Trung Quốc cổ trang" 
                className="w-full h-full object-cover select-none pointer-events-none transform transition-transform duration-700 group-hover:scale-103"
                loading="eager"
              />

              {/* Classical Cinnabar Red Seal Stamp on corner */}
              <div className="absolute top-2.5 right-2.5 pointer-events-none flex flex-col items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 border border-[#9b1c1c] bg-[#b91c1c]/90 text-amber-50 rounded-xs flex items-center justify-center font-serif text-[11px] sm:text-xs font-black shadow-xs">
                  {artChoice === 'lady' ? '雅' : '靜'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info & Page Flip Dog-Ear hint */}
        <div className="pt-2 border-t border-[#c89f7e]/50 pl-3 sm:pl-4 flex items-center justify-between text-[#7d5641] text-[11px] sm:text-xs relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Lật góc sách hoặc nhấn nút &quot;Sau&quot; để sang Mục lục</span>
          </div>

          <button
            onClick={onOpenToc}
            className="flex items-center gap-1 font-bold text-[#852b12] hover:text-[#5e1a08] cursor-pointer transition-colors"
          >
            <span>Sang Mục lục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Corner Dog-Ear that flips to Table of Contents */}
        <div 
          onClick={onOpenToc}
          className="page-dogear" 
          title="Lật sang trang Mục lục"
        />

      </div>
    </div>
  );
};

export default FrontCover4D;
