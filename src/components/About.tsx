import React from 'react';
import { motion } from 'motion/react';
import Footer from './Footer';
import PrincipalMessage from './PrincipalMessage';
import { Target, Eye, Heart, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
              A LEGACY OF <br />
              <span className="gradient-text">EXCELLENCE</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Shaheen School & College Wari Dir (U) is more than just an educational institution; 
              it is a cradle of future leaders. For over two decades, we have been at the forefront of 
              academic innovation, blending rigorous discipline with a compassionate approach to learning.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Our commitment to quality education is unwavering. We believe that true learning happens 
              when curiosity is met with the right tools, and character is built through consistent 
              discipline and mentorship.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20">
                <ShieldCheck className="text-accent" size={18} />
                <span className="text-sm font-bold">Strict Discipline</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20">
                <Zap className="text-accent" size={18} />
                <span className="text-sm font-bold">Quality Education</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="glass p-4 rounded-[40px] rotate-3">
              <img 
                src="https://picsum.photos/seed/school-legacy/800/1000" 
                alt="About" 
                referrerPolicy="no-referrer"
                className="rounded-[32px] w-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl -rotate-6 hidden md:block">
              <h4 className="text-4xl font-black text-accent">25+</h4>
              <p className="text-xs uppercase tracking-widest text-white/40">Years of Excellence</p>
            </div>
          </motion.div>
        </div>

        <PrincipalMessage />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Our Mission', 
              icon: Target, 
              text: 'To empower students with a holistic education that integrates modern technology, critical thinking, and strong moral character.' 
            },
            { 
              title: 'Our Vision', 
              icon: Eye, 
              text: 'To be the leading educational hub in the region, recognized for producing ethical leaders and academic champions.' 
            },
            { 
              title: 'Core Values', 
              icon: Heart, 
              text: 'We uphold Discipline, Integrity, and Excellence as our guiding stars in every academic and extracurricular pursuit.' 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-[40px] text-center group hover:border-accent/50 transition-all"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8 group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter gradient-text">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

