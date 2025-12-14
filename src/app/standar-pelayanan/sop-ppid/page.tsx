'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Download, ShieldCheck, FileCheck, Loader2 } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type SopPpidItem = {
  id: string;
  title: string;
  drive_link: string;
};

export default function SopPpidPage() {
  const [items, setItems] = useState<SopPpidItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV SOP PPID
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1590245777&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<SopPpidItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        setItems(parsed.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill 
                className="object-cover mix-blend-overlay grayscale" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-yellow-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Standar Pelayanan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            SOP PPID
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-10">
            
            {/* INTRO CARD */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 p-5 bg-green-50 rounded-full text-green-600">
                    <ShieldCheck size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Prosedur Pengelolaan Informasi</h2>
                    <p className="text-slate-600 leading-relaxed text-sm text-justify">
                        Sebagai wujud komitmen terhadap keterbukaan informasi, PPID DPRD Provinsi Jawa Tengah menetapkan <strong>Standar Operasional Prosedur (SOP)</strong> untuk menjamin akurasi, kecepatan, dan kualitas pelayanan informasi publik, termasuk pelayanan khusus bagi penyandang disabilitas.
                    </p>
                </div>
            </div>

            {/* LIST DOKUMEN (GRID 2 KOLOM) */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                        <FileCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Daftar SOP Resmi</h3>
                </div>

                {loading ? (
                     <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-4 bg-white border border-dashed border-slate-200 rounded-xl">
                        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                        <p>Memuat data...</p>
                     </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                        Belum ada dokumen SOP PPID.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {items.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300"
                            >
                                {/* Kiri: Ikon & Judul */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors mt-1 sm:mt-0">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm md:text-base font-bold text-slate-700 group-hover:text-green-700 leading-snug transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">
                                            Dokumen PDF
                                        </span>
                                    </div>
                                </div>

                                {/* Kanan: Tombol Aksi */}
                                {item.drive_link && (
                                    <a 
                                        href={item.drive_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-green-600 hover:text-white rounded-lg text-xs font-bold border border-slate-200 hover:border-green-600 transition-all w-full sm:w-auto"
                                    >
                                        <Download size={14} />
                                        <span>Unduh</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}