import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, School, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: 'Primary Section',
    desc: 'Laying a strong foundation with interactive learning, creative arts, and basic sciences for young minds.',
    icon: School,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Middle Section',
    desc: 'Transitioning to advanced concepts with a focus on critical thinking, languages, and analytical skills.',
    icon: Library,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'High School',
    desc: 'Rigorous academic preparation for board exams with specialized tracks in Science and Humanities.',
    icon: BookOpen,
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'College',
    desc: 'Pre-medical, Pre-engineering, and Computer Science programs designed for university entrance success.',
    icon: GraduationCap,
    color: 'from-yellow-500 to-amber-500'
  }
];

export default function Programs() {
  return (
    <section className="py-24 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
          >
            ACADEMIC <span className="gradient-text">SECTIONS</span>
          </motion.h2>
          <p className="text-white/60">Tailored education for every stage of development.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, index) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cinematic-card p-8 group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prog.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <prog.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{prog.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{prog.desc}</p>
              
              <Link 
                to="/admissions"
                className="mt-8 flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-4 transition-all cursor-pointer"
              >
                Apply
                <div className="w-4 h-[2px] bg-accent" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

