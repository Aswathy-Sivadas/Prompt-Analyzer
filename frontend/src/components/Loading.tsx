import React from 'react';
import { motion } from 'framer-motion';
import { Loader, AlertCircle } from 'lucide-react';

/**
 * Loading spinner component
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Loader className="w-8 h-8 text-blue-400" />
      </motion.div>
    </div>
  );
};

/**
 * Loading skeleton component
 */
export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass p-6 rounded-lg animate-shimmer"
        />
      ))}
    </div>
  );
};

interface ErrorMessageProps {
  error: Error | string;
  onDismiss?: () => void;
}

/**
 * Error message component
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onDismiss,
}) => {
  const message = typeof error === 'string' ? error : error.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
    >
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-300">Error</p>
        <p className="text-sm text-red-200 mt-1">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          ×
        </button>
      )}
    </motion.div>
  );
};

/**
 * Success message component
 */
export const SuccessMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
    >
      <p className="text-sm font-semibold text-green-400">{message}</p>
    </motion.div>
  );
};
