import React from 'react';
import { Header } from './Header';
import { PatchNotesFloatingButton } from '../common/PatchNotesFloatingButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-2 sm:px-4">{children}</main>
      <PatchNotesFloatingButton />
    </div>
  );
};
