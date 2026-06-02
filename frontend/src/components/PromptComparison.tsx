import React from 'react';
import { motion } from 'framer-motion';
import { PromptComparison } from '../types';
import { Copy, CheckCircle } from 'lucide-react';

interface PromptComparisonViewProps {
  comparison: PromptComparison;
}

/**
 * Component showing prompt comparison with highlighting
 */
export const PromptComparisonView: React.FC<PromptComparisonViewProps> = ({
  comparison,
}) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Original vs Improved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Original Prompt</h3>
            <button
              onClick={() => handleCopy(comparison.original, 'original')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {copied === 'original' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <div className="glass p-4 rounded-lg min-h-[150px]">
            <p className="text-sm text-gray-300 leading-relaxed">
              {comparison.original}
            </p>
          </div>
        </div>

        {/* Improved */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Improved Prompt</h3>
            <button
              onClick={() => handleCopy(comparison.improved, 'improved')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {copied === 'improved' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <div className="glass p-4 rounded-lg min-h-[150px] border-l-2 border-green-500">
            <p className="text-sm text-green-200 leading-relaxed">
              {comparison.improved}
            </p>
          </div>
        </div>
      </div>

      {/* Changes Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Additions */}
        {comparison.additions.length > 0 && (
          <div className="glass p-4 rounded-lg border-l-2 border-green-500">
            <h4 className="text-sm font-semibold text-green-400 mb-3">
              Added ({comparison.additions.length})
            </h4>
            <ul className="space-y-2">
              {comparison.additions.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-green-200 bg-green-500/10 p-2 rounded"
                >
                  + {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Removals */}
        {comparison.removals.length > 0 && (
          <div className="glass p-4 rounded-lg border-l-2 border-red-500">
            <h4 className="text-sm font-semibold text-red-400 mb-3">
              Removed ({comparison.removals.length})
            </h4>
            <ul className="space-y-2">
              {comparison.removals.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-red-200 bg-red-500/10 p-2 rounded"
                >
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modifications */}
        {comparison.modifications.length > 0 && (
          <div className="glass p-4 rounded-lg border-l-2 border-yellow-500">
            <h4 className="text-sm font-semibold text-yellow-400 mb-3">
              Modified ({comparison.modifications.length})
            </h4>
            <ul className="space-y-2">
              {comparison.modifications.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-yellow-200 bg-yellow-500/10 p-2 rounded"
                >
                  ~ {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};
