'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, MapPin, Phone, Calendar, Info, Coffee, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type RawItem = {
  id: string;
  title: string;
  image_link: string;
};

// --- HELPER: Proxy Image ---
const getDriveImgUrl = (url: string) => {
  if (!url || typeof url !== 'string') return null;
  
  try {
      const urlObj = new URL(url);
      
      // Jika link Google Drive
      if (urlObj.hostname.includes('drive.google.com')) {
          let id = '';
          const match1 = url.match(/\/d\/(.+?)(\/|$)/); 
          if (match1) id = match1[1];
          const match2 = url.match(/id=(.+?)(&|$)/);
          if (match2) id = match2[1];
          
          if (id) {
              return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&w=1200&output=jpg`; 
          }
      }
      
      // Link lain
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`;

  } catch { 
      // FIX: Menghapus '(e)' karena tidak digunakan, agar ESLint tidak error
      console.error("Invalid URL:", url);
      return null;
  }
};

export default function WaktuPelayananPage() {
  const [images, setImages] = useState<RawItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=386911001&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RawItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validImages = parsed.data.filter(item => item.image_link && item.image_link.trim() !== '');
        setImages(validImages);

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-yellow-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Standar Pelayanan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Waktu Pelayanan
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {/* Background Aesthetic */}
      <section className="relative py-16 overflow-hidden min-h-screen">
        
        {/* Dekorasi Background */}
        <div className="absolute inset-0 bg-slate-50 -z-30"></div>
        <div className="absolute inset-0 opacity-[0.05] -z-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#166534 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200 rounded-full blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/4 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-[120px] opacity-40 translate-x-1/3 translate-y-1/3 -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto space-y-16">
                
                {/* 1. WIDGET JAM OPERASIONAL */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kartu Senin-Kamis */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar size={100} className="text-green-600" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-green-700 font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Clock size={20} /> Senin - Kamis
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Jam Operasional</p>
                                    <p className="text-3xl font-extrabold text-slate-800">07:30 - 16:00</p>
                                    <p className="text-sm text-slate-400 font-medium">WIB</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-1">
                                        <Coffee size={16} /> Jam Istirahat
                                    </div>
                                    <p className="text-lg font-bold text-slate-600">12:00 - 13:00 <span className="text-xs font-normal text-slate-400">WIB</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kartu Jumat */}
                    <div className="bg-green-600 rounded-3xl p-8 shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 transition-all relative overflow-hidden group text-white">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar size={100} className="text-white" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-green-100 font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Clock size={20} /> Khusus Jumat
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-green-100/80 mb-1">Jam Operasional</p>
                                    <p className="text-3xl font-extrabold text-white">07:30 - 14:00</p>
                                    <p className="text-sm text-green-100/60 font-medium">WIB</p>
                                </div>
                                <div className="pt-4 border-t border-green-500/50">
                                    <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm mb-1">
                                        <Coffee size={16} /> Jam Istirahat
                                    </div>
                                    <p className="text-lg font-bold text-white">11:00 - 13:00 <span className="text-xs font-normal text-green-200">WIB</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kartu Kontak */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-center">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-slate-800 font-bold text-lg mb-2 flex items-center gap-2">
                                    <Info size={20} className="text-blue-500" /> Komitmen Pelayanan
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Petugas PPID memberikan informasi paling lambat <strong>2 HARI KERJA</strong> setelah permintaan dari pemohon informasi diterima.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-slate-400 mt-1 shrink-0" />
                                    <p className="text-sm text-slate-600">Jl. Pahlawan No.7, Semarang 50243</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-slate-400 shrink-0" />
                                    <p className="text-sm text-slate-600 font-bold">+6224 8415500</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. GALERI DOKUMENTASI */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-800">Galeri Dokumentasi & Infografis</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                            <AlertCircle className="mx-auto mb-2 opacity-50" />
                            Belum ada dokumentasi tambahan.
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {images.map((item, idx) => {
                                const imgUrl = getDriveImgUrl(item.image_link);
                                if (!imgUrl) return null;

                                return (
                                    <div key={idx} className="break-inside-avoid bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group">
                                        <div className="relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={imgUrl} 
                                                alt={item.title || 'Dokumentasi Pelayanan'} 
                                                className="w-full h-auto object-contain"
                                                referrerPolicy="no-referrer"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                    <ImageIcon size={10} /> Dokumentasi
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 leading-snug">
                                                {item.title || 'Dokumentasi Kegiatan'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}