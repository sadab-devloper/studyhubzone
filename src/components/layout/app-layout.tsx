
"use client";
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppNavigation } from './app-navigation';
import { UserProfileButton } from './user-profile-button';
import { ModeToggle } from '@/components/mode-toggle';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BottomNavigation } from './bottom-navigation';

interface AppLayoutProps {
  children: ReactNode;
}

function StudyHubLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/image/logo.png"
        alt="Study Hub Zone Logo"
        width={28}
        height={28}
        className="h-7 w-7"
        data-ai-hint="logo brand"
        priority
      />
      <h1 className="text-2xl font-headline font-semibold">
        <span className="text-primary">Study Hub</span><span className="text-accent"> Zone</span>
      </h1>
    </div>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="relative flex min-h-screen w-full bg-background">
        <Sidebar className="border-r hidden md:flex">
          <SidebarHeader className="p-4">
            <Link href="/" aria-label="Study Hub Zone Home">
              <StudyHubLogo />
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <AppNavigation />
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto border-t">
            <p className="text-xs text-sidebar-foreground/70">&copy; {new Date().getFullYear()} Study Hub Zone</p>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SidebarTrigger>
               <Link href="/" className="flex items-center gap-2 md:hidden" aria-label="Study Hub Zone Home">
                  <Image
                    src="/logo.png"
                    alt="Study Hub Zone Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                    data-ai-hint="logo brand"
                    priority
                  />
                  <span className="text-xl font-headline font-semibold">
                    <span className="text-primary">Study Hub</span><span className="text-accent"> Zone</span>
                  </span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <UserProfileButton />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-muted/30 pb-20 md:pb-8"> {/* Adjusted padding-bottom for mobile */}
            {children}
          </main>
          <BottomNavigation /> {/* Added BottomNavigation */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
