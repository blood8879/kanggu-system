import React from 'react';
import { Header } from './Header';
import { PatchNotesFloatingButton } from '../common/PatchNotesFloatingButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">{children}</main>
      <PatchNotesFloatingButton />
    </div>
  );
};
