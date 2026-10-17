import React, { useState } from 'react';
import { 
  Car, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  Compass, 
  BarChart3,
  Sparkles
} from 'lucide-react';

export type NavTab = 
  | 'home' 
  | 'practice' 
  | 'signs' 
  | 'rules' 
  | 'progress' 
  | 'study' 
  | 'about';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onStartQuickTest: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onStartQuickTest,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Car className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice Tests', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'signs', label: 'Road Signs', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'rules', label: 'Rules of the Road', icon: <Compass className="w-4 h-4" /> },
    { id: 'progress', label: 'My Progress', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'study', label: 'Study Guide', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header role="banner" className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            
            {/* Zone 1: Brand Wordmark (Single element) */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg group shrink-0"
              aria-label="G1 Ready Ontario Home"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-xs group-hover:bg-red-700 transition-colors" aria-hidden="true">
                G1
              </div>
              <div className="leading-tight">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                  G1 Ready Ontario
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Independent Study App
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links (Single-line, no pills) */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative focus-visible:ring-2 focus-visible:ring-red-500 rounded-md ${
                      isActive
                        ? 'text-red-600 dark:text-red-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <button
                onClick={onStartQuickTest}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Practice</span>
              </button>

              {/* Mobile hamburger menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-4/5 max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm" aria-hidden="true">
                    G1
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">
                      G1 Ready Ontario
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Independent Study App
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                        isActive
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartQuickTest();
                }}
                className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Practice Test</span>
              </button>
              <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                Independent study material · Unofficial app
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
