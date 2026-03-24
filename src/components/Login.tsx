import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, Loader2 } from 'lucide-react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user profile exists
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Set admin role for the owner, student for others
        const isAdmin = user.email === 'yousafzaitalal@gmail.com';
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: isAdmin ? 'admin' : 'student',
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }
      
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-12 rounded-3xl text-center relative z-10"
      >
        <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 shadow-xl shadow-accent/20">
          <LogIn size={40} />
        </div>
        
        <h2 className="text-3xl font-black mb-2 tracking-tighter">WELCOME BACK</h2>
        <p className="text-white/50 mb-10">Access your personalized portal</p>
        
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full btn-3d bg-white text-primary py-4 flex items-center justify-center gap-3 hover:bg-accent hover:text-primary transition-all"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Continue with Google
            </>
          )}
        </button>
        
        <p className="mt-8 text-xs text-white/30">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
