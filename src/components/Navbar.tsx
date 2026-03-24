import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, GraduationCap, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Apply', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-dark rounded-2xl px-6 py-3 flex items-center justify-between border border-white/5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-accent/10 p-2 rounded-lg group-hover:rotate-12 transition-transform border border-accent/20">
            <GraduationCap className="text-accent" />
          </div>
          <span className="font-bold text-xl tracking-tighter gradient-text">SHAHEENS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-accent ${
                location.pathname === link.path ? 'text-accent' : 'text-white/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <Link
                to="/dashboard"
                className="text-sm font-bold uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="text-sm font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-accent transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-accent"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut(auth);
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium text-red-400 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-accent"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
