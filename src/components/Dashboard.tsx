import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Bell, 
  CheckSquare, 
  Trophy,
  LogOut,
  Plus,
  Search,
  X
} from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, onSnapshot, orderBy, where, addDoc } from 'firebase/firestore';
import { UserProfile, AdmissionApplication, Announcement } from '../types';
import { toast } from 'sonner';

export default function Dashboard({ profile }: { profile: UserProfile }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (profile.role === 'admin') {
      const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAdmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdmissionApplication)));
      });
      return () => unsubscribe();
    }
  }, [profile.role]);

  useEffect(() => {
    if (profile.role === 'admin') {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllUsers(snapshot.docs.map(doc => doc.data() as UserProfile));
      });
      return () => unsubscribe();
    }
  }, [profile.role]);

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement)));
    });
    return () => unsubscribe();
  }, []);

  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionApplication | null>(null);

  const updateAdmissionStatus = async (id: string, status: string) => {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'admissions', id), { status });
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const updateUserRole = async (uid: string, newRole: string) => {
    if (uid === profile.uid) {
      toast.error("You cannot change your own role!");
      return;
    }
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admissions', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary font-bold text-xl">
                {profile.displayName ? profile.displayName[0] : profile.email[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold">{profile.displayName || 'User'}</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest">{profile.role}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id ? 'bg-accent text-primary font-bold' : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <button 
            onClick={() => auth.signOut()}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-3xl glass text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              Admin Portal
            </h2>
            <div className="text-xs text-white/30 font-mono">
              Session ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="glass p-8 rounded-3xl border-accent/20">
                  <p className="text-white/50 text-sm mb-2">Pending Admissions</p>
                  <h2 className="text-4xl font-black text-accent">{admissions.length}</h2>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6">Recent Announcements</h3>
                <div className="space-y-4">
                  {announcements.map(ann => (
                    <div key={ann.id} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-bold text-accent mb-1">{ann.title}</h4>
                      <p className="text-sm text-white/70">{ann.content}</p>
                      <p className="text-[10px] text-white/30 mt-2">{new Date(ann.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && profile.role === 'admin' && (
            <div className="glass p-8 rounded-3xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">User Management</h3>
                <p className="text-sm text-white/50">Grant or revoke admin access</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/10">
                      <th className="pb-4 font-medium">User</th>
                      <th className="pb-4 font-medium">Email</th>
                      <th className="pb-4 font-medium">Current Role</th>
                      <th className="pb-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allUsers.map(user => (
                      <tr key={user.uid} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-bold text-xs">
                              {user.displayName ? user.displayName[0] : user.email[0].toUpperCase()}
                            </div>
                            <span className="font-medium">{user.displayName || 'No Name'}</span>
                          </div>
                        </td>
                        <td className="py-4 text-white/60 text-sm">{user.email}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            user.role === 'admin' ? 'bg-accent/20 text-accent' :
                            user.role === 'teacher' ? 'bg-blue-500/20 text-blue-500' : 'bg-white/10 text-white/50'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.uid, e.target.value)}
                            disabled={user.uid === profile.uid}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none focus:border-accent disabled:opacity-50"
                          >
                            <option value="student" className="bg-primary">Student</option>
                            <option value="teacher" className="bg-primary">Teacher</option>
                            <option value="admin" className="bg-primary">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'admissions' && profile.role === 'admin' && (
            <div className="glass p-8 rounded-3xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Admission Applications</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-accent outline-none"
                    placeholder="Search..."
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/10">
                      <th className="pb-4 font-medium">Student Name</th>
                      <th className="pb-4 font-medium">Class</th>
                      <th className="pb-4 font-medium">Phone</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {admissions.map(app => (
                      <tr key={app.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4 font-medium">
                          <button 
                            onClick={() => setSelectedAdmission(app)}
                            className="hover:text-accent transition-colors text-left"
                          >
                            {app.fullName}
                          </button>
                        </td>
                        <td className="py-4 text-white/60">{app.classApplyingFor}</td>
                        <td className="py-4 text-white/60">{app.phone}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            app.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {app.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateAdmissionStatus(app.id!, 'approved')}
                                  className="p-1 hover:text-green-500 transition-colors"
                                  title="Approve"
                                >
                                  <CheckSquare size={16} />
                                </button>
                                <button 
                                  onClick={() => updateAdmissionStatus(app.id!, 'rejected')}
                                  className="p-1 hover:text-red-500 transition-colors"
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => setSelectedAdmission(app)}
                              className="p-1 hover:text-accent transition-colors"
                              title="View Details"
                            >
                              <FileText size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-white/40 text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Admission Details Modal */}
          {selectedAdmission && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-2xl p-8 rounded-[40px] relative max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedAdmission(null)}
                  className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h3 className="text-2xl font-black mb-8 tracking-tighter uppercase">Application <span className="gradient-text">Details</span></h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Full Name</p>
                      <p className="font-bold">{selectedAdmission.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Father Name</p>
                      <p className="font-bold">{selectedAdmission.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">CNIC / B-Form</p>
                      <p className="font-bold">{selectedAdmission.cnic}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</p>
                      <p className="font-bold">{selectedAdmission.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Phone</p>
                      <p className="font-bold">{selectedAdmission.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Class Applying For</p>
                      <p className="font-bold text-accent">{selectedAdmission.classApplyingFor}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Previous Qualification</p>
                      <p className="font-bold">{selectedAdmission.previousQualification}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Total Marks</p>
                        <p className="font-bold">{selectedAdmission.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Obtained Marks</p>
                        <p className="font-bold">{selectedAdmission.obtainedMarks}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        selectedAdmission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        selectedAdmission.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {selectedAdmission.status}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Home Address</p>
                    <p className="text-sm text-white/70 leading-relaxed">{selectedAdmission.address}</p>
                  </div>
                </div>

                <div className="mt-12 flex justify-end gap-4">
                  {selectedAdmission.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => {
                          updateAdmissionStatus(selectedAdmission.id!, 'rejected');
                          setSelectedAdmission(null);
                        }}
                        className="px-6 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-all"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => {
                          updateAdmissionStatus(selectedAdmission.id!, 'approved');
                          setSelectedAdmission(null);
                        }}
                        className="px-6 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
