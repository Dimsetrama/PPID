'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Gavel, Download, 
  ExternalLink, Scale, BookOpen, Loader2
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type RegulationItem = {
  id: string;
  title: string;
  drive_link: string;
};

export default function DaftarPeraturanPage() {
  const [data, setData] = useState<RegulationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=94740295&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RegulationItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validDocs = parsed.data.filter(item => 
            item.title && item.title.trim() !== '' && 
            item.drive_link && item.drive_link.trim() !== ''
        );
        
        setData(validDocs);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    // FIX: Hapus bg-slate-50 dari main agar tidak menutupi background section
    <main className="min-h-screen font-sans selection:bg-green-200 selection:text-green-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-yellow-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Regulasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Daftar Peraturan
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="relative py-16 min-h-screen overflow-hidden">
        
        {/* --- BACKGROUND LAYERS (Urutan sangat penting: Paling atas di kode = Paling bawah di layar) --- */}
        
        {/* 1. Base Color (Kanvas) */}
        <div className="absolute inset-0 bg-slate-50"></div>

        {/* 2. Pola Dot Pattern (Dipertebal opacity-nya ke 0.4 dan warnanya lebih gelap) */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* 3. Blobs Warna (Tanpa z-index negatif agar tidak hilang) */}
        {/* Hijau (Kiri Atas) - Warna diperkuat ke green-500 lalu diturunkan opacity-nya */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px] opacity-20 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        {/* Kuning (Kanan Bawah) */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500 rounded-full blur-[100px] opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        {/* ----------------------------------------------------------------------------------------- */}

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* HEADER INFO */}
                <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white shadow-lg flex flex-col md:flex-row gap-6 items-start transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="p-4 bg-green-600 text-white rounded-2xl shrink-0 shadow-green-200 shadow-lg rotate-3">
                        <Scale size={32} />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                            Peraturan Keterbukaan Informasi Publik
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                            Sebagai landasan hukum pelaksanaan Keterbukaan Informasi Publik, berikut adalah kumpulan regulasi resmi yang berlaku di lingkungan Pemerintah dan DPRD Provinsi Jawa Tengah. Dokumen ini mencakup Undang-Undang, Peraturan Pemerintah, Peraturan Menteri, hingga Keputusan Gubernur yang menjadi pedoman utama tata kelola informasi dan dokumentasi.
                        </p>
                    </div>
                </div>

                {/* CONTENT LIST */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                        <p>Menyiapkan dokumen peraturan...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-12 bg-white/50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        Belum ada data peraturan.
                    </div>
                ) : (
                    <div className="space-y-5">
                        {data.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
                            >
                                {/* Aksen Dekoratif Kiri */}
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                                {/* Kiri: Judul Peraturan */}
                                <div className="flex items-start gap-5 md:w-3/4">
                                    <div className="mt-1 shrink-0 w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <Gavel size={22} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-slate-700 group-hover:text-green-800 text-base md:text-lg leading-snug transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                            <BookOpen size={12} /> Dokumen Resmi
                                        </div>
                                    </div>
                                </div>

                                {/* Kanan: Tombol Aksi */}
                                <div className="md:w-1/4 flex justify-start md:justify-end">
                                    <a 
                                        href={item.drive_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 hover:bg-green-600 hover:text-white rounded-xl text-sm font-bold border border-slate-200 hover:border-green-600 transition-all shadow-sm group/btn w-full md:w-auto justify-center"
                                    >
                                        <Download size={18} className="group-hover/btn:animate-bounce" />
                                        <span>Unduh PDF</span>
                                        <ExternalLink size={12} className="opacity-50" />
                                    </a>
                                </div>
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