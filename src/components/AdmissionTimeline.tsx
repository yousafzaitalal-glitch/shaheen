import React from 'react';
import { motion } from 'motion/react';
import { FileText, ClipboardCheck, UserCheck } from 'lucide-react';

const steps = [
  {
    title: 'Apply Online',
    desc: 'Fill out the digital admission form with all required details and documents.',
    icon: FileText
  },
  {
    title: 'Test / Interview',
    desc: 'Shortlisted candidates will be called for an assessment test and interview.',
    icon: ClipboardCheck
  },
  {
    title: 'Confirmation',
    desc: 'Successful candidates receive an admission letter to finalize enrollment.',
    icon: UserCheck
  }
];

export default function AdmissionTimeline() {
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
          >
            APPLY <span className="gradient-text">PROCESS</span>
          </motion.h2>
          <p className="text-white/60">Simple steps to join our elite community.</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary border-4 border-accent rounded-full flex items-center justify-center text-accent mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.3)] relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-black text-sm">
                    {index + 1}
                  </div>
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
