import React from 'react';
import { motion } from 'motion/react';
import { Users, GraduationCap, Trophy, Award, ShieldCheck, Star } from 'lucide-react';

const stats = [
  { label: 'Years of Excellence', value: '25+', icon: Trophy },
];

const badges = [
  { name: 'Top Rated Institute', icon: Star },
];

export default function Stats() {
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cinematic-card p-8 text-center group max-w-sm w-full"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-1 tracking-tighter gradient-text">{stat.value}</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}

          <div className="flex flex-col items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <badge.icon className="text-accent" size={40} />
                <span className="text-lg font-bold uppercase tracking-widest text-white">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

