import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, RotateCw } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { LoadingSpinner, ErrorMessage, Button } from '../components';
import { formatDate, truncateText } from '../utils/export';

/**
 * History page - View previous analyses
 */
export const HistoryPage: React.FC = () => {
  const { history, loading, error, deleteAnalysis } = useHistory();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Analysis History</h1>
          <p className="text-gray-400">
            View and manage your previous prompt analyses.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && <ErrorMessage error={error} />}

        {/* History List */}
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass p-4 rounded-xl hover:bg-white/15 transition-all cursor-pointer"
                onClick={() =>
                  setSelectedId(
                    selectedId === analysis.id ? null : analysis.id
                  )
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-400">
                      {formatDate(analysis.timestamp)}
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      {truncateText(analysis.originalPrompt, 100)}
                    </p>
                    <div className="flex gap-4 flex-wrap text-sm">
                      <span>Clarity: <span className="text-blue-400 font-bold">{analysis.scores.clarity}</span></span>
                      <span>Specificity: <span className="text-blue-400 font-bold">{analysis.scores.specificity}</span></span>
                      <span>Completeness: <span className="text-blue-400 font-bold">{analysis.scores.completeness}</span></span>
                      <span>Overall: <span className="text-blue-400 font-bold">{analysis.scores.overall}</span></span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="View full analysis"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="Reanalyze"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAnalysis(analysis.id);
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete analysis"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedId === analysis.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-gray-300 mb-3">
                      <span className="font-semibold">Full Prompt:</span>
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed bg-black/20 p-3 rounded">
                      {analysis.originalPrompt}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-12 rounded-xl text-center"
          >
            <p className="text-gray-400 mb-6">
              No analysis history yet. Start by analyzing a prompt!
            </p>
            <a href="#/analyzer">
              <Button>Analyze a Prompt</Button>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};
