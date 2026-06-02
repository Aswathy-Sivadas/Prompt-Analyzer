import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { LoadingSpinner, ErrorMessage } from '../components';
import apiService from '../services/api';

interface Tip {
  title: string;
  content: string;
  category: string;
}

/**
 * Learning Center page - Educational content
 */
export const LearningCenterPage: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      setLoading(true);
      const data = await apiService.getLearningTips();
      setTips(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tips'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <LoadingSpinner />
      </div>
    );
  }

  const categories = Array.from(new Set(tips.map(t => t.category)));
  const filteredTips = selectedCategory
    ? tips.filter(t => t.category === selectedCategory)
    : tips;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Learning Center</h1>
          <p className="text-gray-400">
            Master prompt engineering with best practices and expert tips.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && <ErrorMessage error={error} />}

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? 'glass border-blue-500/50 bg-blue-500/20 text-blue-400'
                  : 'glass hover:bg-white/15'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'glass border-blue-500/50 bg-blue-500/20 text-blue-400'
                    : 'glass hover:bg-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={`${tip.category}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 rounded-xl hover:bg-white/15 transition-all"
            >
              <div className="flex gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{tip.title}</h3>
                  <p className="text-xs text-gray-400">{tip.category}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{tip.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            Common Prompt Mistakes
          </h2>
          <div className="space-y-4">
            {[
              'Being too vague or general in your instructions',
              'Forgetting to specify the desired output format',
              'Not providing enough context or examples',
              'Setting unrealistic constraints or expectations',
              'Using ambiguous language that AI could misinterpret',
              'Skipping role/persona definition',
            ].map((mistake, i) => (
              <div key={i} className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <p className="text-gray-300">{mistake}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Best Practices
          </h2>
          <div className="space-y-4">
            {[
              'Be specific and detailed in your instructions',
              'Define the role or persona for the AI',
              'Specify the exact format you want the output in',
              'Provide examples when possible',
              'Set clear constraints and guidelines',
              'Use clear, unambiguous language',
              'Include context about the intended audience',
              'Specify the tone or style you want',
            ].map((practice, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300">{practice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
