import React from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../context/themeStore';

interface NavbarProps {
  title: string;
  onMenuClick?: () => void;
}

/**
 * Navigation bar component
 */
export const Navbar: React.FC<NavbarProps> = ({ title, onMenuClick }) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="glass sticky top-0 z-40 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {onMenuClick && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </motion.button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">✦</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent hidden sm:block">
                {title}
              </h1>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-slate-600" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
    active?: boolean;
  }>;
}

/**
 * Sidebar navigation component
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`glass fixed left-0 top-0 h-screen w-64 border-r border-white/20 z-40 transform transition-transform duration-300 lg:translate-x-0 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Menu</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5 text-red-400" />
            </motion.button>
          </div>

          <nav className="space-y-2 flex-1">
            {items.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                <span className={item.active ? 'text-cyan-400' : 'text-gray-500'}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
