import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root flex">
      
      {/* Sidebar → ONLY LAPTOP/DESKTOP */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* MobileNav → ONLY MOBILE */}
      <div className="md:hidden w-full">
        <MobileNav />
      </div>

      {/* Page content */}
      <div className="root-container"></div>
      <div className="wrapper flex-1">
        {children}
      </div>

    </main>
  );
};

export default Layout;
