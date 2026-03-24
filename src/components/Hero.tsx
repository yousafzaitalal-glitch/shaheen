import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene3D from './Scene3D';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <Scene3D />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          <span>Empowering Future Leaders</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]"
        >
          THE FUTURE OF <br />
          <span className="gradient-text">EDUCATION</span> IS HERE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Shaheen School & College Wari Dir (U) combines tradition with 
          cutting-edge technology to provide a premium learning experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/admissions" className="btn-3d px-8 py-4 text-lg flex items-center gap-2 group">
            Apply Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="btn-3d glass-dark text-white px-8 py-4 text-lg !bg-transparent !shadow-none border border-white/10 hover:border-accent/50">
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="glass-dark p-6 rounded-3xl rotate-12">
          <div className="w-12 h-12 bg-accent/10 rounded-lg mb-4 flex items-center justify-center">
            <GraduationCap className="text-accent" />
          </div>
          <div className="h-2 w-20 bg-white/10 rounded-full mb-2" />
          <div className="h-2 w-12 bg-white/5 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
      >
        <div className="glass-dark p-6 rounded-3xl -rotate-12">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 bg-accent/20 rounded-full" />
            <div className="w-8 h-8 bg-white/5 rounded-full" />
          </div>
          <div className="h-2 w-24 bg-white/10 rounded-full mb-2" />
          <div className="h-2 w-16 bg-white/5 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
