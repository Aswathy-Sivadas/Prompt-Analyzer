import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  History,
  BookOpen,
  Settings,
  Sun,
  Moon,
  X,
  Menu,
} from 'lucide-react';
import { useThemeStore } from '../context/themeStore';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen = true,
  onClose,
  isMobile = false,
}) => {
  const { isDark, toggleTheme } = useThemeStore();

  const navItems = [
    { id: '', label: 'Analyzer', icon: <Zap className="w-5 h-5" />, description: 'Analyze prompts' },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" />, description: 'View history' },
    { id: 'learning', label: 'Learning', icon: <BookOpen className="w-5 h-5" />, description: 'Learn tips' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, description: 'Preferences' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (isMobile && onClose) onClose();
  };

  const sidebarContent = (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <motion.div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">PromptViz</h1>
            <p className="text-xs text-slate-400">v1.0</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentPage === item.id
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title={item.description}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1 text-left">
              <span className="font-medium text-sm">{item.label}</span>
              <p className="text-xs text-slate-500 group-hover:text-slate-400">{item.description}</p>
            </div>
            {currentPage === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10 space-y-3">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 text-slate-200 transition-all border border-indigo-500/20"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="text-sm font-medium">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="text-sm font-medium">Dark</span>
            </>
          )}
        </motion.button>
      </div>
    </>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-screen w-72 glass border-r border-white/10 z-50 flex flex-col"
            >
              {onClose && (
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    onClick={onClose}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-200" />
                  </motion.button>
                </div>
              )}
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 flex-col z-40 flex"
    >
      {sidebarContent}
    </motion.div>
  );
};

// Mobile Header Component
export const MobileHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.div className="md:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/10 z-30 px-4 py-3 flex items-center justify-between backdrop-blur-xl">
      <motion.button
        onClick={onMenuClick}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-slate-200" />
      </motion.button>

      <motion.div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-white text-sm">PromptViz</span>
      </motion.div>

      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-slate-200" />
        ) : (
          <Moon className="w-5 h-5 text-slate-200" />
        )}
      </motion.button>
    </motion.div>
  );
};
