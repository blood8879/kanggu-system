import React from 'react';
import { Header } from './Header';
import { PatchNotesFloatingButton } from '../common/PatchNotesFloatingButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--color-luxury-black)] relative">
      {/* Ambient glow background effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--color-luxury-gold-glow)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-[rgba(0,217,255,0.1)] rounded-full blur-[100px] opacity-20"></div>
      </div>

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-[fadeInUp_0.6s_ease-out]">
          {children}
        </div>
      </main>

      <PatchNotesFloatingButton />
    </div>
  );
};
