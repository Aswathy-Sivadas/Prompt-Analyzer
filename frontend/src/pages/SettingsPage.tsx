import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Globe } from 'lucide-react';
import { useThemeStore } from '../context/themeStore';
import { Button } from '../components/FormElements';

/**
 * Settings page - User preferences
 */
export const SettingsPage: React.FC = () => {
  const { isDark, setTheme } = useThemeStore();
  const [language, setLanguage] = React.useState('en');

  const handleThemeChange = (theme: 'dark' | 'light') => {
    setTheme(theme === 'dark');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">
            Customize your experience with Prompt Anatomy Visualizer.
          </p>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Moon className="w-6 h-6" />
            Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-3">
                Theme
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    !isDark
                      ? 'glass border-blue-500/50 bg-blue-500/20 text-blue-400'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    isDark
                      ? 'glass border-blue-500/50 bg-blue-500/20 text-blue-400'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  Dark Mode
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Language
          </h2>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-3">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg glass border border-white/20 focus:border-blue-400 focus:outline-none transition-all"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <div className="space-y-3 text-gray-400">
            <p>
              <span className="text-gray-300 font-semibold">Application:</span> Prompt
              Anatomy Visualizer
            </p>
            <p>
              <span className="text-gray-300 font-semibold">Version:</span> 1.0.0
            </p>
            <p>
              <span className="text-gray-300 font-semibold">Description:</span> An AI-powered
              tool to analyze, understand, and improve your prompts.
            </p>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl border border-red-500/20"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h2>
          <p className="text-gray-400 mb-4">
            Clear all your analysis history. This action cannot be undone.
          </p>
          <Button variant="danger">Clear All History</Button>
        </motion.div>
      </div>
    </div>
  );
};
