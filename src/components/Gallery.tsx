import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from './Footer';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: 'https://picsum.photos/seed/school1/1200/800', title: 'Modern Classrooms' },
  { src: 'https://picsum.photos/seed/school2/1200/800', title: 'Science Lab' },
  { src: 'https://picsum.photos/seed/school3/1200/800', title: 'Sports Day' },
  { src: 'https://picsum.photos/seed/school4/1200/800', title: 'Annual Function' },
  { src: 'https://picsum.photos/seed/school5/1200/800', title: 'Library' },
  { src: 'https://picsum.photos/seed/school6/1200/800', title: 'Computer Lab' },
  { src: 'https://picsum.photos/seed/school7/1200/800', title: 'Graduation' },
  { src: 'https://picsum.photos/seed/school8/1200/800', title: 'Art Studio' },
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="pt-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
          >
            OUR <span className="gradient-text">GALLERY</span>
          </motion.h2>
          <p className="text-white/60">Capturing moments of excellence and joy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedIdx(i)}
              className="group relative aspect-square overflow-hidden rounded-3xl glass cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500 mb-4">
                  <Plus size={24} />
                </div>
                <h4 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors hidden md:block"
            >
              <ChevronLeft size={60} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors hidden md:block"
            >
              <ChevronRight size={60} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-5xl w-full"
            >
              <img 
                src={images[selectedIdx].src} 
                alt={images[selectedIdx].title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-accent">{images[selectedIdx].title}</h3>
                <p className="text-white/40 mt-2">{selectedIdx + 1} / {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

