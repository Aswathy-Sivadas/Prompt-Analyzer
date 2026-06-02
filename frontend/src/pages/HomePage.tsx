import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BarChart3, BookOpen, History } from 'lucide-react';
import { Button } from '../components/FormElements';

/**
 * Home page - Landing page with feature overview
 */
export const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Instantly analyze your prompts and get actionable insights.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Detailed Scoring',
      description: 'Understand clarity, specificity, completeness, and structure.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Learning Center',
      description: 'Learn best practices and improve your prompt engineering skills.',
      color: 'from-green-400 to-cyan-500',
    },
    {
      icon: <History className="w-8 h-8" />,
      title: 'History & Export',
      description: 'Keep track of your analyses and export as PDF, JSON, or TXT.',
      color: 'from-blue-400 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8 inline-block p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full"
          >
            <Zap className="w-12 h-12 text-cyan-300 drop-shadow-xl" />
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Master Your AI Prompts
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Understand the anatomy of effective prompts. Analyze, improve, and master the art of prompt engineering.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="#/analyzer"
              className="inline-flex items-center gap-3"
            >
              <Button size="lg" className="px-10 py-3 text-lg font-semibold">
                Get Started <ArrowRight className="w-6 h-6" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-6xl font-black text-center mb-24 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
          >
            Why Choose Our Visualizer?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -16, scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative glass p-8 rounded-2xl border border-white/15 hover:border-cyan-400/50 transition-all duration-300 h-full backdrop-blur-2xl">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:scale-125 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-3 text-xl text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 text-white">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent hidden md:block"></div>
            
            {[
              { step: 1, title: 'Enter Your Prompt', desc: 'Paste any AI prompt you want to analyze and improve', icon: '✍️' },
              { step: 2, title: 'AI Analysis', desc: 'Our AI breaks down your prompt into key components', icon: '🧠' },
              { step: 3, title: 'Get Improvements', desc: 'Receive suggestions and export your results', icon: '⚡' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.25, duration: 0.5 }}
                className="relative"
              >
                <div className="text-center">
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="glass w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 text-4xl shadow-lg relative z-10"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-5xl font-black text-cyan-400 mb-3">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">Ready to Level Up?</h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Start analyzing your prompts today and become a master of prompt engineering.
          </p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a href="#/analyzer">
              <Button size="lg" className="px-10 py-3 text-lg font-semibold">
                Start Now
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
