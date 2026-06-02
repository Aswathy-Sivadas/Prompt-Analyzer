import { PromptAnalysis } from '../types';

/**
 * Export analysis to JSON format
 */
export const exportToJSON = (analysis: PromptAnalysis) => {
  const dataStr = JSON.stringify(analysis, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(dataBlob, `prompt-analysis-${Date.now()}.json`);
};

/**
 * Export analysis to TXT format
 */
export const exportToTXT = (analysis: PromptAnalysis) => {
  const lines = [
    'PROMPT ANALYSIS REPORT',
    '=' .repeat(50),
    '',
    'ORIGINAL PROMPT:',
    analysis.originalPrompt,
    '',
    'ANATOMY COMPONENTS:',
    ...analysis.anatomyComponents.map(
      component => `- ${component.type.toUpperCase()}: ${component.content}`
    ),
    '',
    'SCORES:',
    `  Clarity: ${analysis.scores.clarity}/100`,
    `  Specificity: ${analysis.scores.specificity}/100`,
    `  Completeness: ${analysis.scores.completeness}/100`,
    `  Structure: ${analysis.scores.structure}/100`,
    `  Overall: ${analysis.scores.overall}/100`,
    '',
    'SUGGESTIONS:',
    ...analysis.anatomyComponents.map(
      component => `- ${component.type}: ${component.suggestion}`
    ),
  ];

  const txtContent = lines.join('\n');
  const blob = new Blob([txtContent], { type: 'text/plain' });
  downloadFile(blob, `prompt-analysis-${Date.now()}.txt`);
};

/**
 * Export analysis to PDF format
 */
export const exportToPDF = async (analysis: PromptAnalysis) => {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    // Title
    doc.setFontSize(16);
    doc.text('Prompt Analysis Report', margin, yPosition);
    yPosition += 10;

    // Original Prompt
    doc.setFontSize(12);
    doc.text('Original Prompt:', margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    const promptText = doc.splitTextToSize(analysis.originalPrompt, maxWidth - margin);
    doc.text(promptText, margin, yPosition);
    yPosition += promptText.length * 5 + 5;

    // Scores
    doc.setFontSize(12);
    doc.text('Scores:', margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.text(`Clarity: ${analysis.scores.clarity}/100`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`Specificity: ${analysis.scores.specificity}/100`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`Completeness: ${analysis.scores.completeness}/100`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`Structure: ${analysis.scores.structure}/100`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`Overall: ${analysis.scores.overall}/100`, margin + 5, yPosition);
    yPosition += 10;

    // Components
    doc.setFontSize(12);
    doc.text('Anatomy Components:', margin, yPosition);
    yPosition += 7;

    analysis.anatomyComponents.forEach(component => {
      if (yPosition > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        yPosition = 10;
      }
      
      doc.setFontSize(10);
      doc.setTextColor(70, 130, 180);
      doc.text(`${component.type.toUpperCase()}:`, margin, yPosition);
      yPosition += 5;
      
      doc.setTextColor(100, 100, 100);
      const contentText = doc.splitTextToSize(component.content, maxWidth - margin);
      doc.text(contentText, margin + 5, yPosition);
      yPosition += contentText.length * 4 + 3;
    });

    doc.save(`prompt-analysis-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

/**
 * Helper function to download a file
 */
const downloadFile = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to a certain length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get color based on score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
};

/**
 * Get background color based on score
 */
export const getScoreBackground = (score: number): string => {
  if (score >= 80) return 'bg-green-500/20';
  if (score >= 60) return 'bg-yellow-500/20';
  if (score >= 40) return 'bg-orange-500/20';
  return 'bg-red-500/20';
};
