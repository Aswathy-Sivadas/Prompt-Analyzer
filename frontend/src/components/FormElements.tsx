import React, { TextareaHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Reusable input component with modern SaaS styling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:border-indigo-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 ${className}`}
      />
      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  characterLimit?: number;
}

/**
 * Reusable textarea component with modern SaaS styling
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  characterLimit,
  value = '',
  className = '',
  onChange,
  ...props
}) => {
  const charCount = typeof value === 'string' ? value.length : 0;
  const isOverLimit = characterLimit && charCount > characterLimit;
  const percentUsed = characterLimit ? (charCount / characterLimit) * 100 : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            {label}
          </label>
          {characterLimit && (
            <span
              className={`text-xs font-medium transition-colors ${
                isOverLimit ? 'text-red-400' : 'text-slate-400'
              }`}
            >
              {charCount.toLocaleString()}/{characterLimit.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <textarea
          {...props}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-4 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:border-indigo-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none ${
            isOverLimit ? 'border-red-400/50 focus:ring-red-500/20' : ''
          } ${className}`}
        />
        {characterLimit && (
          <div className="absolute bottom-2 right-3 h-1 bg-white/10 rounded-full overflow-hidden" style={{ width: '60px' }}>
            <motion.div
              className={`h-full rounded-full ${isOverLimit ? 'bg-red-400' : 'bg-indigo-400'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(percentUsed, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

/**
 * Reusable button component with modern SaaS styling
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
    secondary:
      'bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 hover:text-white shadow-soft',
    danger:
      'bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 text-red-300 hover:text-red-200',
    success:
      'bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/30 text-green-300 hover:text-green-200',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm font-medium',
    md: 'px-5 py-2.5 text-base font-semibold',
    lg: 'px-7 py-3.5 text-lg font-semibold',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98, y: disabled || isLoading ? 0 : 1 }}
      disabled={disabled || isLoading}
      {...(props as any)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </motion.button>
  );
};
