import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-accent p-2 rounded-lg">
              <GraduationCap className="text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tighter gradient-text uppercase">Shaheen Model</span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed">
            Empowering the next generation with quality education, modern technology, 
            and strong moral values in the heart of Wari Dir (U).
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4">
            {['About Us', 'Programs', 'Apply', 'Gallery', 'Contact'].map(link => (
              <li key={link}>
                <Link to={`/${link === 'Apply' ? 'admissions' : link.toLowerCase().replace(' ', '')}`} className="text-white/50 hover:text-white transition-colors text-sm">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-sm">Portals</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="text-white/50 hover:text-white transition-colors text-sm">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-sm">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-white/50">
              <MapPin size={18} className="text-accent shrink-0" />
              <span>Main Road, Wari, Upper Dir, KP, Pakistan</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/50">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+92 944 123456</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/50">
              <Mail size={18} className="text-accent shrink-0" />
              <span>info@shaheenmodel.edu.pk</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
        <div className="space-y-2 text-center md:text-left">
          <p>© 2026 Shaheen Model School & College. All rights reserved.</p>
          <p className="text-accent/60">
            Designed and developed by <span className="text-white">Talal Ansari</span>. 
            WhatsApp: <a href="https://wa.me/923215464184" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">+92 321 5464184</a>
          </p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
