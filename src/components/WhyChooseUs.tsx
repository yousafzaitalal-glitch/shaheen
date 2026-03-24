import React from 'react';
import { motion } from 'motion/react';
import { Users, Lightbulb, Trophy, Heart, ShieldCheck, Star } from 'lucide-react';

const features = [
  {
    title: 'Experienced Faculty',
    desc: 'Our teachers are highly qualified professionals dedicated to student success and mentorship.',
    icon: Users
  },
  {
    title: 'Modern Teaching Methods',
    desc: 'We integrate digital tools and interactive techniques to make learning engaging and effective.',
    icon: Lightbulb
  },
  {
    title: 'Character Building',
    desc: 'We focus on moral values, ethics, and leadership skills alongside academic excellence.',
    icon: Heart
  },
  {
    title: 'Safe Environment',
    desc: 'A secure, inclusive, and supportive campus where every student feels at home.',
    icon: ShieldCheck
  },
  {
    title: 'Holistic Development',
    desc: 'Extensive extracurricular programs including sports, arts, and community service.',
    icon: Star
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
          >
            WHY <span className="gradient-text">CHOOSE US</span>
          </motion.h2>
          <p className="text-white/60">The pillars of our educational excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="cinematic-card p-10 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
