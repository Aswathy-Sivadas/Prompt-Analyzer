import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2, Download, Sparkles } from 'lucide-react';
import {
  Button,
  Textarea,
} from '../components/FormElements';
import {
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage,
} from '../components/Loading';
import {
  ScoresGrid,
  AnatomyGrid,
  PromptComparisonView,
  Tabs,
} from '../components';
import { useAnalysis } from '../hooks/useAnalysis';
import { exportToJSON, exportToPDF, exportToTXT } from '../utils/export';

/**
 * Analyzer page - Main analysis interface
 */
export const AnalyzerPage: React.FC = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { analysis, loading, error, analyze, clearAnalysis } = useAnalysis();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPrompt.trim()) {
      await analyze(inputPrompt);
    }
  };

  const handleClear = () => {
    setInputPrompt('');
    clearAnalysis();
  };

  const handleExport = async (format: 'json' | 'txt' | 'pdf') => {
    if (!analysis) return;

    try {
      if (format === 'json') exportToJSON(analysis);
      else if (format === 'txt') exportToTXT(analysis);
      else if (format === 'pdf') await exportToPDF(analysis);

      setSuccessMessage(`Exported as ${format.toUpperCase()}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
          Prompt Analyzer
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Paste your prompt and let our AI analyze its structure, clarity, and provide improvement suggestions to make it more effective.
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <ErrorMessage
          error={error}
          onDismiss={clearAnalysis}
        />
      )}

      {/* Success Message */}
      {successMessage && (
        <SuccessMessage message={successMessage} />
      )}

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-8 rounded-xl border border-white/15"
      >
        <form onSubmit={handleAnalyze} className="space-y-6">
          {/* Label with Sparkles Icon */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <label className="block text-lg font-semibold text-white">
              Enter Your Prompt
            </label>
          </div>

          {/* Textarea */}
          <Textarea
            placeholder="Paste your AI prompt here... The more specific, the better!"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            rows={12}
            characterLimit={5000}
            className="text-base"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                type="submit"
                disabled={!inputPrompt.trim()}
                isLoading={loading}
                size="lg"
                icon={<Send className="w-5 h-5" />}
                className="w-full"
              >
                {loading ? 'Analyzing...' : 'Analyze Prompt'}
              </Button>
            </motion.div>
            {inputPrompt && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClear}
                  size="lg"
                  icon={<Trash2 className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Clear
                </Button>
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>

      {/* Results Section */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-12 rounded-xl border border-white/15"
        >
          <LoadingSpinner />
        </motion.div>
      )}

      {analysis && !loading && (
        <>
          {/* Tabs for different views */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs
              tabs={[
                { label: 'Scores', content: <ScoresGrid scores={analysis.scores} /> },
                { label: 'Anatomy', content: <AnatomyGrid components={analysis.anatomyComponents} /> },
                { label: 'Improvements', content: <div>{/* Improvements content */}</div> },
                { label: 'Comparison', content: (analysis.comparison ? <PromptComparisonView comparison={analysis.comparison} /> : <div>No comparison data</div>) },
              ]}
            />
          </motion.div>

          {/* Export Options */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleExport('json')}
              icon={<Download className="w-4 h-4" />}
            >
              Export JSON
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleExport('txt')}
              icon={<Download className="w-4 h-4" />}
            >
              Export TXT
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleExport('pdf')}
              icon={<Download className="w-4 h-4" />}
            >
              Export PDF
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};
