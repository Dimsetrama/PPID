'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, Download, MessageCircle, 
  CheckCircle, FileSearch, Monitor, UserCheck, 
  Image as ImageIcon, Loader2, MousePointerClick
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type OnlineItem = {
  id: string;
  title: string;
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
          if (id) return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&w=1600&output=jpg`; 
      }
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1600&output=jpg`;
  } catch {
      return null;
  }
};

export default function PermohonanInformasiOnlinePage() {
  const [docs, setDocs] = useState<OnlineItem[]>([]);
  const [images, setImages] = useState<OnlineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1282422452&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<OnlineItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const docList: OnlineItem[] = [];
        const imgList: OnlineItem[] = [];

        parsed.data.forEach(item => {
            if (item.image_link && item.image_link.trim() !== '') imgList.push(item);
            if (item.drive_link && item.drive_link.trim() !== '') docList.push(item);
        });
        
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
    // FIX: Menambahkan overflow-x-hidden di sini
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900 overflow-x-hidden">
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
            Permohonan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in-up">
            Permohonan Informasi Online
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)] mb-8"></div>
          
          {/* TOMBOL LACAK (PRIMARY CTA) */}
          <a 
            href="https://wa.me/6285158279956?text=Halo%20PPID%20DPRD%20Jateng,%20saya%20ingin%20melacak%20status%20permohonan%20informasi%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up border border-green-200"
          >
            <MessageCircle size={20} className="text-green-600" />
            Lacak Status via WhatsApp
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16 relative">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 -z-20"></div>
        {/* Elemen penyebab scroll samping (sekarang aman) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/3 -z-10"></div>

        <div className="max-w-6xl mx-auto space-y-24">

            {/* 1. WIDGET TUTORIAL (ALUR PERMOHONAN) */}
            <div>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Alur Permohonan Informasi</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Ikuti langkah-langkah mudah berikut untuk mengajukan permohonan informasi publik secara online maupun offline.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 -z-10 transform -translate-y-1/2 px-16"></div>

                    {/* Step 1 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                            <Monitor size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">1</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Akses Layanan</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Buka Website PPID, Aplikasi SIPELAWAN, atau datang langsung ke meja layanan.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                            <UserCheck size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">2</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Verifikasi Data</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Isi formulir permohonan dan lampirkan fotokopi identitas diri yang valid.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                            <FileSearch size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-purple-100 text-purple-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">3</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Proses PPID</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            PPID memproses dan berkoordinasi dengan bidang terkait untuk mencari data.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-green-100 text-green-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">4</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Selesai</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Petugas memberikan informasi yang diminta atau surat pemberitahuan tertulis.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. GALERI INFOGRAFIS */}
            {images.length > 0 && (
                <div className="border-t border-slate-200 pt-16">
                    <div className="flex flex-col items-center text-center mb-10">
                        <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2">Panduan Visual</span>
                        <h3 className="text-3xl font-extrabold text-slate-800">Infografis Alur Permohonan</h3>
                    </div>

                    <div className="flex flex-col gap-10 items-center">
                        {images.map((item, idx) => {
                            const imgUrl = getDriveImgUrl(item.image_link);
                            if (!imgUrl) return null;

                            return (
                                <div key={idx} className="w-full max-w-4xl bg-white p-4 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                                    <div className="relative rounded-2xl overflow-hidden bg-slate-50">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imgUrl} 
                                            alt={item.title || 'Infografis Online'} 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="pt-4 text-center">
                                        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                                            <ImageIcon size={12} /> Infografis
                                        </div>
                                        <p className="font-bold text-slate-700 text-lg">
                                            {item.title || 'Alur Pelayanan'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 3. AREA DOWNLOAD */}
            <div className="border-t border-slate-200 pt-16">
                <div className="flex flex-col items-center text-center mb-10">
                    <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">Dokumen Pendukung</span>
                    <h3 className="text-3xl font-extrabold text-slate-800">Unduh Formulir & Dokumen</h3>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                    </div>
                ) : docs.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        Belum ada dokumen tersedia.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {docs.map((item, idx) => (
                            <a 
                                key={idx}
                                href={item.drive_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-green-400 hover:-translate-y-1 transition-all flex items-start gap-5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FileText size={80} />
                                </div>
                                <div className="shrink-0 w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors z-10">
                                    <Download size={24} />
                                </div>
                                <div className="z-10 flex-1">
                                    <h4 className="font-bold text-slate-800 group-hover:text-green-700 text-lg leading-tight mb-2">
                                        {item.title}
                                    </h4>
                                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-green-600 transition-colors">
                                        <MousePointerClick size={12} /> Klik untuk mengunduh
                                    </span>
                                </div>
                            </a>
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