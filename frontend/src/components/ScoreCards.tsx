import React from 'react';
import { motion } from 'framer-motion';
import { PromptAnalysis } from '../types';
import { getScoreColor } from '../utils/export';

interface ScoreCardProps {
  score: number;
  label: string;
  icon?: React.ReactNode;
  index?: number;
}

/**
 * Individual score card component - Modern SaaS styling
 */
export const ScoreCard: React.FC<ScoreCardProps> = ({ score, label, icon, index = 0 }) => {
  const percentage = (score / 100) * 100;
  const isHigh = score >= 75;
  const isMedium = score >= 50 && score < 75;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group card p-6 rounded-xl border border-white/15 hover:border-indigo-500/30 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 space-y-4">
        {/* Header with icon and label */}
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="text-2xl p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
            {label}
          </h3>
        </div>

        {/* Score display */}
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className={`text-4xl font-bold font-mono tracking-tight ${getScoreColor(score)}`}
          >
            {score}
          </motion.div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                className={`h-full rounded-full transition-all ${
                  isHigh
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50'
                    : isMedium
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/50'
                    : 'bg-gradient-to-r from-red-400 to-rose-500 shadow-lg shadow-red-500/50'
                }`}
              />
            </div>
          </div>

          {/* Percentage label */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Completeness</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className={`text-xs font-semibold ${getScoreColor(score)}`}
            >
              {percentage.toFixed(0)}%
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ScoresGridProps {
  scores: PromptAnalysis['scores'];
}

/**
 * Grid of score cards - Modern SaaS layout
 */
export const ScoresGrid: React.FC<ScoresGridProps> = ({ scores }) => {
  const scoreItems = [
    { score: scores.clarity, label: 'Clarity' },
    { score: scores.specificity, label: 'Specificity' },
    { score: scores.completeness, label: 'Completeness' },
    { score: scores.structure, label: 'Structure' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {scoreItems.map((item, index) => (
        <ScoreCard
          key={item.label}
          score={item.score}
          label={item.label}
          index={index}
        />
      ))}
    </motion.div>
  );
};
