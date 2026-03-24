import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from './types';
import { Toaster } from 'sonner';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PrincipalMessage from './components/PrincipalMessage';
import AdmissionForm from './components/AdmissionForm';
import Programs from './components/Programs';
import WhyChooseUs from './components/WhyChooseUs';
import AdmissionTimeline from './components/AdmissionTimeline';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <PrincipalMessage />
      <WhyChooseUs />
      <Programs />
      <AdmissionTimeline />
      <AdmissionForm />
      <Footer />
    </main>
  );
}

function ProgramsPage() {
  return (
    <div className="pt-32 bg-primary">
      <Programs />
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, 'users', u.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-primary text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admissions" element={<AdmissionForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user && profile ? <Navigate to="/dashboard" /> : <Login />} />
          <Route 
            path="/dashboard" 
            element={user ? (profile ? <Dashboard profile={profile} /> : <Navigate to="/login" />) : <Navigate to="/login" />} 
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}
