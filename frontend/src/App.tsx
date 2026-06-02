import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar, MobileHeader } from './components/Sidebar';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { HistoryPage } from './pages/HistoryPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { SettingsPage } from './pages/SettingsPage';
import { useThemeStore } from './context/themeStore';

type PageType = '' | 'history' | 'learning' | 'settings';

/**
 * Main App component with modern SaaS layout
 */
function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useThemeStore();

  // Apply theme to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDark]);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (page: string): void => {
    setCurrentPage(page as PageType);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'history':
        return <HistoryPage />;
      case 'learning':
        return <LearningCenterPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <AnalyzerPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-300">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isMobile={false}
        />
      </div>

      {/* Mobile Header - Visible only on mobile */}
      <div className="md:hidden">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Mobile Sidebar Drawer - Only shown when opened */}
      {sidebarOpen && (
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      )}

      {/* Main Content Area */}
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="md:ml-64 pt-20 md:pt-0 pb-12 md:pb-8 px-4 md:px-8 min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </motion.main>
    </div>
  );
}

export default App;
