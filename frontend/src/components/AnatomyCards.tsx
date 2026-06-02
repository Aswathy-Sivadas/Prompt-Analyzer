import React from 'react';
import { motion } from 'framer-motion';
import { AnatomyComponent as AnatomyComponentType } from '../types';
import { Copy, CheckCircle, Lightbulb, Target } from 'lucide-react';

interface AnatomyComponentProps {
  component: AnatomyComponentType;
  index: number;
}

/**
 * Component card showing a single anatomy component - Modern SaaS
 */
export const AnatomyComponent: React.FC<AnatomyComponentProps> = ({
  component,
  index,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(component.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colorMap: Record<string, { gradient: string; bg: string; border: string }> = {
    task: { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    context: { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    role: { gradient: 'from-pink-500 to-pink-600', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
    audience: { gradient: 'from-green-500 to-green-600', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    tone: { gradient: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    output_format: { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    constraints: { gradient: 'from-red-500 to-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    length: { gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    examples: { gradient: 'from-teal-500 to-teal-600', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
    missing: { gradient: 'from-slate-500 to-slate-600', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
  };

  const color = colorMap[component.type] || colorMap.missing;
  const confidencePercentage = Math.round(component.confidence * 100);
  const isHighConfidence = component.confidence >= 0.8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ delay: index * 0.08 }}
      className="group card rounded-lg border border-white/15 overflow-hidden hover:border-white/30 transition-all"
    >
      {/* Header with type badge */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
        <div>
          <motion.div
            className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${color.gradient} shadow-lg shadow-blue-500/20 mb-3`}
            whileHover={{ scale: 1.05 }}
          >
            {component.type.replace('_', ' ').toUpperCase()}
          </motion.div>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${isHighConfidence ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
            <p className="text-xs text-slate-400">
              Confidence: <span className={`font-semibold ${isHighConfidence ? 'text-emerald-300' : 'text-yellow-300'}`}>
                {confidencePercentage}%
              </span>
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="mb-4 space-y-2">
        <p className="text-sm text-white font-medium leading-relaxed">
          {component.content}
        </p>
      </div>

      {/* Why it matters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.1 }}
        className={`mb-4 p-3 rounded-lg border ${color.border} ${color.bg}`}
      >
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-300 mb-1">Why this matters</p>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              {component.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Suggestion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.15 }}
        className={`p-3 rounded-lg border ${color.border} ${color.bg}`}
      >
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-indigo-300 mb-1">Suggestion</p>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              {component.suggestion}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface AnatomyGridProps {
  components: AnatomyComponentType[];
}

/**
 * Grid of anatomy components
 */
export const AnatomyGrid: React.FC<AnatomyGridProps> = ({ components }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {components.map((component, index) => (
        <AnatomyComponent
          key={`${component.type}-${index}`}
          component={component}
          index={index}
        />
      ))}
    </motion.div>
  );
};
