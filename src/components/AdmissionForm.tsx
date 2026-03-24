import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { Send, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const admissionSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  fatherName: z.string().min(3, 'Father name is required'),
  cnic: z.string().min(13, 'Valid CNIC/B-Form is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(10, 'Full address is required'),
  classApplyingFor: z.string().min(1, 'Please select a class'),
  previousQualification: z.string().min(1, 'Previous qualification is required'),
  totalMarks: z.string().min(1, 'Total marks are required'),
  obtainedMarks: z.string().min(1, 'Obtained marks are required'),
  previousSchool: z.string().optional(),
  marks: z.string().optional(),
  message: z.string().optional(),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export default function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; data: AdmissionFormData } | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  const generatePDF = (data: AdmissionFormData, id: string) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(10, 37, 64); // Primary color #0A2540
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SHAHEEN SCHOOL & COLLEGE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Wari Dir (U), Khyber Pakhtunkhwa, Pakistan', 105, 30, { align: 'center' });
    
    // Receipt Title
    doc.setTextColor(10, 37, 64);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ADMISSION RECEIPT', 105, 55, { align: 'center' });
    
    // Application Info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Application ID: ${id}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 70);
    
    // Data Table
    autoTable(doc, {
      startY: 80,
      head: [['Field', 'Information']],
      body: [
        ['Full Name', data.fullName],
        ['Father Name', data.fatherName],
        ['CNIC / B-Form', data.cnic],
        ['Phone Number', data.phone],
        ['Email Address', data.email],
        ['Class Applying For', data.classApplyingFor],
        ['Previous Qualification', data.previousQualification],
        ['Total Marks', data.totalMarks],
        ['Obtained Marks', data.obtainedMarks],
        ['Home Address', data.address],
      ],
      theme: 'striped',
      headStyles: { fillColor: [10, 37, 64] },
      styles: { cellPadding: 5 },
    });
    
    // Footer
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('This is a computer-generated receipt. Please keep it for your records.', 105, finalY, { align: 'center' });
    doc.text('Our team will contact you soon for the next steps.', 105, finalY + 7, { align: 'center' });
    
    doc.save(`Shaheen_Admission_${data.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'admissions'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      
      setSubmittedData({ id: docRef.id, data });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0A2540', '#FFFFFF']
      });
      
      toast.success('Application submitted successfully!');
      generatePDF(data, docRef.id);
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <section className="py-24 px-6 bg-primary relative overflow-hidden min-h-[600px] flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-[40px] text-center"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tighter">APPLICATION <span className="gradient-text">RECEIVED</span></h2>
            <p className="text-white/60 mb-12">
              Thank you for applying to Shaheen School & College. 
              Your application ID is <span className="text-accent font-mono">{submittedData.id}</span>.
              Your receipt has been downloaded automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => generatePDF(submittedData.data, submittedData.id)}
                className="btn-3d flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Receipt Again
              </button>
              <button
                onClick={() => setSubmittedData(null)}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold"
              >
                Apply for Another Student
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
          >
            JOIN THE <span className="gradient-text">ELITE</span>
          </motion.h2>
          <p className="text-white/60">Fill out the form below to start your journey with us.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Full Name</label>
              <input
                {...register('fullName')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Father Name</label>
              <input
                {...register('fatherName')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="Robert Doe"
              />
              {errors.fatherName && <p className="text-red-400 text-xs">{errors.fatherName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">CNIC / B-Form</label>
              <input
                {...register('cnic')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="12345-6789012-3"
              />
              {errors.cnic && <p className="text-red-400 text-xs">{errors.cnic.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Phone Number</label>
              <input
                {...register('phone')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="+92 300 1234567"
              />
              {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email Address</label>
              <input
                {...register('email')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Class Applying For</label>
              <select
                {...register('classApplyingFor')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors appearance-none"
              >
                <option value="" className="bg-primary">Select Class</option>
                <option value="Nursery" className="bg-primary">Nursery</option>
                <option value="Prep" className="bg-primary">Prep</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={`Class ${n}`} className="bg-primary">Class {n}</option>
                ))}
                <option value="1st Year" className="bg-primary">1st Year</option>
                <option value="2nd Year" className="bg-primary">2nd Year</option>
              </select>
              {errors.classApplyingFor && <p className="text-red-400 text-xs">{errors.classApplyingFor.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Previous Qualification</label>
              <input
                {...register('previousQualification')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="e.g. 8th Class, Matric"
              />
              {errors.previousQualification && <p className="text-red-400 text-xs">{errors.previousQualification.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Total Marks</label>
              <input
                {...register('totalMarks')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="1100"
              />
              {errors.totalMarks && <p className="text-red-400 text-xs">{errors.totalMarks.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Obtained Marks</label>
              <input
                {...register('obtainedMarks')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="950"
              />
              {errors.obtainedMarks && <p className="text-red-400 text-xs">{errors.obtainedMarks.message}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-white/70">Home Address</label>
              <textarea
                {...register('address')}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                placeholder="Street 123, Wari Dir (U)"
              />
              {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-3d py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Submit Application
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
