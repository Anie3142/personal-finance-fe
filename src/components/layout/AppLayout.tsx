'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <AppSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
        )}
      >
        <AppHeader
          onMenuClick={() => setMobileMenuOpen(true)}
          showMenuButton
        />
        
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
