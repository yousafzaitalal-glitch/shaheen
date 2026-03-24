import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function PrincipalMessage() {
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-4 rounded-[40px] -rotate-3">
              <img 
                src="https://picsum.photos/seed/principal/800/1000" 
                alt="Principal" 
                referrerPolicy="no-referrer"
                className="rounded-[32px] w-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl rotate-3 border-accent/20">
              <h4 className="text-xl font-black text-accent">Prof. Dr. Ahmad Khan</h4>
              <p className="text-xs uppercase tracking-widest text-white/40">Principal & Founder</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
              <Quote size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
              MESSAGE FROM THE <br />
              <span className="gradient-text">PRINCIPAL</span>
            </h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed italic">
              <p>
                "At Shaheen School & College, we believe that education is the most powerful weapon 
                which you can use to change the world. Our mission is to provide an environment where 
                academic excellence is matched by character building and moral integrity."
              </p>
              <p>
                "We are committed to nurturing the unique potential of each student, equipping them with 
                the skills and values necessary to navigate the complexities of the modern world while 
                remaining rooted in our cultural heritage."
              </p>
              <p>
                "I invite you to join our community of learners and leaders, where we strive every day 
                to reach new heights of achievement and service."
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Excellence in Education</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
