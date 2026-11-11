import React, { useState, useEffect } from 'react';
import FlipBook from './components/FlipBook';
import { AuthProvider } from './context/AuthContext';
import LoginModal from './components/LoginModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import { autoPrepareAudioAndMic } from './utils/audioStreamManager';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return localStorage.getItem('gemini-api-key') || process.env.API_KEY || process.env.GEMINI_API_KEY || null;
  });

  useEffect(() => {
    if (apiKey && !localStorage.getItem('gemini-api-key')) {
      localStorage.setItem('gemini-api-key', apiKey);
    }
  }, [apiKey]);

  // Pre-warm audio and mic on any initial interaction across the app
  const handleUserGesture = () => {
    autoPrepareAudioAndMic();
  };

  const handleSaveApiKey = (newKey: string) => {
    const trimmedKey = newKey.trim();
    if (trimmedKey) {
      localStorage.setItem('gemini-api-key', trimmedKey);
      setApiKey(trimmedKey);
    } else {
      localStorage.removeItem('gemini-api-key');
      setApiKey(null);
    }
  };

  const [initialPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const p = searchParams.get('page');
      if (p === 'login') return 0.5;
      if (p && !isNaN(Number(p))) {
        const num = Number(p);
        return Math.min(96, Math.max(-1, num));
      }
    }
    return -1;
  });

  return (
    <AuthProvider>
      <main 
        onClick={handleUserGesture}
        onTouchStart={handleUserGesture}
        className="w-full h-full h-screen h-dvh flex flex-col overflow-hidden border-4 sm:border-[6px] border-amber-500 bg-white box-border text-stone-800"
      >
        {/* Flipping Book Component (100% Full Width & Height) */}
        <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden box-border">
          <FlipBook 
            hasApiKey={Boolean(apiKey)} 
            apiKey={apiKey || ''}
            onOpenApiKeyModal={() => {
              const btn = document.querySelector('[aria-label="Cài đặt API Key"]') as HTMLButtonElement;
              if (btn) btn.click();
            }}
            onSaveApiKey={handleSaveApiKey}
            initialPage={initialPage}
          />
        </div>

        {/* Global Modals for Quick Login & Admin Management */}
        <LoginModal />
        <AdminDashboardModal />
      </main>
    </AuthProvider>
  );
};

export default App;
