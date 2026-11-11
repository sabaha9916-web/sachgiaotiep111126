import React, { useState, useEffect, useRef } from 'react';
import { Key, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

interface ApiKeyInputProps {
  onSave: (apiKey: string) => void;
  compact?: boolean;
  popoverAlign?: 'left' | 'right';
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave, compact = false, popoverAlign = 'right' }) => {
  const [key, setKey] = useState(() => localStorage.getItem('gemini-api-key') || '');
  const [showKey, setShowKey] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasKey = Boolean(key && key.trim().length > 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsInputVisible(false);
      }
    };
    if (isInputVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputVisible]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSave(key);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [key, onSave]);

  const handleSaveAndClose = () => {
    onSave(key);
    setIsInputVisible(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setIsInputVisible(!isInputVisible)}
        className={
          compact
            ? `inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full transition-all shadow-2xs border cursor-pointer ${
                hasKey
                  ? 'bg-emerald-50/70 text-emerald-800 border-emerald-400 hover:bg-emerald-100/90'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 animate-pulse'
              }`
            : `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs border ${
                hasKey
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 animate-pulse'
              }`
        }
        title={hasKey ? 'Gemini API Key đã kết nối (Bấm để xem hoặc đổi)' : 'Cài đặt Gemini API Key'}
        aria-label="Cài đặt API Key"
      >
        <Key className="w-3.5 h-3.5 text-emerald-800" />
        {!compact && (
          <span className="hidden sm:inline">
            {hasKey ? 'API Key Đã Sẵn Sàng' : 'Cài đặt API Key'}
          </span>
        )}
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${hasKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      </button>
      
      {isInputVisible && (
        <div className={`absolute top-8 ${popoverAlign === 'left' ? 'left-0' : 'right-0'} z-50 bg-white p-4 rounded-xl shadow-2xl border border-stone-200 w-80 sm:w-96 text-left animate-in fade-in duration-150`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-orange-600" />
              API KEY
            </h4>
            <span className="text-[10px] text-stone-400">Lưu trên thiết bị</span>
          </div>

          <div className="relative w-full">
            <input
              type={showKey ? 'text' : 'password'}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveAndClose();
                }
              }}
              placeholder="Dán Gemini API Key vào đây (AIzaSy...)"
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-9 font-mono"
              aria-label="API Key Input"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 px-2.5 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none"
              aria-label={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            {hasKey ? (
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" /> Đã nhận diện key
              </span>
            ) : (
              <a
                href="https://aistudio.google.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-600 hover:text-orange-700 flex items-center gap-1 font-bold underline transition-colors cursor-pointer"
                title="Bấm để lấy Gemini API Key tại Google AI Studio"
              >
                <AlertCircle className="w-3.5 h-3.5" /> Lấy Key
              </a>
            )}

            <div className="flex items-center gap-1.5">
              {key && (
                <button
                  type="button"
                  onClick={() => {
                    setKey('');
                    onSave('');
                  }}
                  className="text-stone-400 hover:text-red-600 text-xs px-2 py-1"
                >
                  Xóa
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveAndClose}
                className="bg-orange-600 text-white text-xs font-bold py-1.5 px-4 rounded-lg hover:bg-orange-700 transition-colors shadow-xs"
              >
                Lưu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
