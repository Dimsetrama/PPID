'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Phone, Globe, MapPin, Clock, 
  FileText, Download, Facebook, Instagram, 
  Twitter, Monitor, Image as ImageIcon, Loader2
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type ManualItem = {
  id: string;
  title: string;
  year: string;
  drive_link: string;
  image_link: string;
};

// --- HELPER: Proxy Image ---
const getDriveImgUrl = (url: string) => {
  if (!url || typeof url !== 'string') return null;
  try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('drive.google.com')) {
          let id = '';
          const match1 = url.match(/\/d\/(.+?)(\/|$)/); 
          if (match1) id = match1[1];
          const match2 = url.match(/id=(.+?)(&|$)/);
          if (match2) id = match2[1];
          // w=1600 agar resolusi tinggi
          if (id) return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&w=1600&output=jpg`; 
      }
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1600&output=jpg`;
  } catch {
      return null;
  }
};

export default function PermohonanInformasiManualPage() {
  const [docs, setDocs] = useState<ManualItem[]>([]);
  const [images, setImages] = useState<ManualItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV PERMOHONAN MANUAL
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=570411764&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<ManualItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const docList: ManualItem[] = [];
        const imgList: ManualItem[] = [];

        parsed.data.forEach(item => {
            if (item.image_link && item.image_link.trim() !== '') {
                imgList.push(item);
            }
            if (item.drive_link && item.drive_link.trim() !== '') {
                docList.push(item);
            }
        });
        
        docList.sort((a, b) => Number(b.year) - Number(a.year));
        
        setDocs(docList);
        setImages(imgList);

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
            {/* Menggunakan <img> biasa agar aman dari error config */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-yellow-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Permohonan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Permohonan Informasi Manual
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT WITH AESTHETIC BG */}
      <section className="relative py-16 overflow-hidden min-h-screen">
        
        {/* Dekorasi Background */}
        <div className="absolute inset-0 bg-slate-50 -z-30"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100 rounded-full blur-[100px] opacity-60 -translate-y-1/4 translate-x-1/4 -z-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-50 rounded-full blur-[120px] opacity-60 translate-y-1/4 -translate-x-1/4 -z-20"></div>
        <div className="absolute inset-0 opacity-[0.03] -z-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* 1. WIDGET KONTAK & JADWAL (AESTHETIC & CREATIVE) */}
                <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 border border-white shadow-2xl relative overflow-hidden">
                    {/* Hiasan Sudut */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-br-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-tl-[100px] pointer-events-none"></div>

                    <div className="text-center mb-12 relative z-10">
                        <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2 block">Pusat Bantuan</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Layanan Pengaduan & Informasi</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        
                        {/* CARD 1: Digital Channel */}
                        <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Saluran Digital</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Instagram size={16} className="text-pink-500" /> @dprdjatengprovinsi
                                </li>
                                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Facebook size={16} className="text-blue-600" /> @DPRDJATENG
                                </li>
                                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Twitter size={16} className="text-sky-500" /> @dprdjatengprov
                                </li>
                                <li className="h-px bg-slate-100 my-2"></li>
                                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Monitor size={16} className="text-purple-500" /> Aplikasi SIPELAWAN
                                </li>
                            </ul>
                        </div>

                        {/* CARD 2: Datang Langsung */}
                        <div className="group bg-green-600 text-white p-6 rounded-3xl shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Clock size={80} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-1">Datang Langsung</h3>
                                <p className="text-green-100 text-xs mb-6">Sekretariat DPRD Provinsi Jawa Tengah</p>
                                
                                <div className="space-y-3">
                                    <div className="bg-green-700/50 p-3 rounded-xl border border-green-500/30">
                                        <p className="font-bold text-xs uppercase tracking-wider text-green-200 mb-1">Senin - Kamis</p>
                                        <p className="font-semibold">07.30 - 16.00 WIB</p>
                                    </div>
                                    <div className="bg-green-700/50 p-3 rounded-xl border border-green-500/30">
                                        <p className="font-bold text-xs uppercase tracking-wider text-green-200 mb-1">Jumat</p>
                                        <p className="font-semibold">07.30 - 15.30 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: Hotline */}
                        <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Hotline & Email</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Telepon Resmi</p>
                                    <p className="text-3xl font-extrabold text-slate-800 tracking-tight">+6224 8415500</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Email Pengaduan</p>
                                    <a href="mailto:ppidpembantusetwanjateng@gmail.com" className="text-sm font-medium text-slate-600 break-all hover:text-green-600 transition-colors">
                                        ppidpembantusetwanjateng@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 2. GALERI GAMBAR (DIPINDAHKAN KE ATAS) */}
                {images.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-slate-800">Panduan Visual & Infografis</h3>
                        </div>

                        {/* GRID LEBIH BESAR (2 KOLOM) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {images.map((item, idx) => {
                                const imgUrl = getDriveImgUrl(item.image_link);
                                if (!imgUrl) return null;

                                return (
                                    <div key={idx} className="bg-white p-3 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                                        <div className="relative rounded-2xl overflow-hidden bg-slate-50">
                                            {/* Menggunakan <img> biasa */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={imgUrl} 
                                                alt={item.title || 'Infografis Layanan'} 
                                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        {/* Caption Sederhana */}
                                        <div className="pt-4 pb-2 px-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                    <ImageIcon size={10} /> Info Visual
                                                </span>
                                                {item.year && (
                                                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full">
                                                        {item.year}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-lg font-bold text-slate-800 leading-snug">
                                                {item.title || 'Infografis Pelayanan'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. DAFTAR REGISTER (DI BAWAH) */}
                <div className="border-t border-slate-200 pt-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
                        <h3 className="text-2xl font-bold text-slate-800">Arsip Register Permohonan</h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                        </div>
                    ) : docs.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                            Belum ada dokumen register.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {docs.map((item, idx) => (
                                <a 
                                    key={idx}
                                    href={item.drive_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-green-400 hover:-translate-y-1 transition-all flex items-start gap-4"
                                >
                                    <div className="shrink-0 w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        {item.year && (
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Tahun {item.year}</p>
                                        )}
                                        <h4 className="text-sm font-bold text-slate-700 leading-snug group-hover:text-green-700">
                                            {item.title || 'Dokumen Unduhan'}
                                        </h4>
                                        <span className="text-[10px] text-green-600 flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Download size={10} /> Download PDF
                                        </span>
                                    </div>
                                </a>
                            ))}
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