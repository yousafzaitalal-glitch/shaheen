export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
}

export interface AdmissionApplication {
  id?: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  classApplyingFor: string;
  previousQualification: string;
  totalMarks: string;
  obtainedMarks: string;
  previousSchool?: string;
  marks?: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  classId: string;
}

export interface ExamResult {
  id?: string;
  studentId: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  term: string;
  createdAt: string;
}
