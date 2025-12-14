'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// FIX: Hapus import Image agar tidak error
import { 
  Shield, Lock, ExternalLink, 
  Megaphone, AlertTriangle, CheckCircle, 
  BarChart3, Image as ImageIcon, Loader2, FileWarning
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type WbsItem = {
  id: string;
  title: string;
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
          // w=1600 agar resolusi tinggi & jelas saat diperbesar
          if (id) return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&w=1600&output=jpg`; 
      }
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1600&output=jpg`;
  } catch {
      return null;
  }
};

export default function WhistleBlowerPage() {
  const [reports, setReports] = useState<WbsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV WHISTLE BLOWER
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1806706996&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<WbsItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validData = parsed.data.filter(item => item.image_link && item.image_link.trim() !== '');
        setReports(validData);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 selection:text-red-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-red-900 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            {/* Menggunakan <img> biasa agar tidak error */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-red-200 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-red-500/50 bg-red-950/30 rounded-full py-1 px-3 w-fit mx-auto">
            Integritas & Pengawasan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Whistle Blowing System
          </h1>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-20">

            {/* 1. SEGMEN EDUKASI (APA ITU WBS?) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 text-red-700 rounded-xl">
                            <Megaphone size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Apa itu WBS?</h2>
                    </div>
                    <div className="prose prose-slate text-slate-600 leading-relaxed text-justify">
                        <p>
                            <strong>Whistle Blowing System (WBS)</strong> adalah mekanisme penyampaian pengaduan dugaan tindak pidana tertentu yang telah terjadi atau akan terjadi yang melibatkan pegawai dan orang lain yang yang dilakukan dalam organisasi tempatnya bekerja, dimana pelapor bukan merupakan bagian dari pelaku kejahatan yang dilaporkannya.
                        </p>
                        <p>
                            Sistem ini diupayakan agar pihak internal lembaga dapat melaporkan pelanggaran seperti <strong>Korupsi, Kolusi, Nepotisme (KKN)</strong>, serta penyalahgunaan wewenang. Pelaporan harus disertai bukti permulaan yang mendukung.
                        </p>
                    </div>
                    
                    {/* Poin Jaminan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <Lock className="text-green-600 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Rahasia Terjamin</h4>
                                <p className="text-xs text-slate-500 mt-1">Identitas pelapor dirahasiakan secara ketat.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <Shield className="text-blue-600 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Perlindungan</h4>
                                <p className="text-xs text-slate-500 mt-1">Pelapor dilindungi dari tekanan atau balasan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. SEGMEN AKSI (SALURAN PELAPORAN) */}
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                        <AlertTriangle className="text-red-600" /> Saluran Pelaporan Resmi
                    </h3>
                    
                    <div className="space-y-4 relative z-10">
                        {/* Tombol LAPORGUB */}
                        <a 
                            href="https://laporgub.jatengprov.go.id/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-5 bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-lg hover:border-red-300 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://laporgub.jatengprov.go.id/images/logo.png" alt="Logo LaporGub" className="h-10 w-auto object-contain" onError={(e) => e.currentTarget.style.display='none'} />
                                <div>
                                    <h4 className="font-bold text-red-700 group-hover:text-red-800">LaporGub! Jateng</h4>
                                    <p className="text-xs text-slate-500">Saluran aduan Pemprov Jawa Tengah</p>
                                </div>
                            </div>
                            <ExternalLink className="text-slate-300 group-hover:text-red-500 transition-colors" />
                        </a>

                        {/* Tombol SP4N LAPOR */}
                        <a 
                            href="https://www.lapor.go.id/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-5 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://www.lapor.go.id/themes/lapor/assets/images/logo.png" alt="Logo SP4N" className="h-8 w-auto object-contain bg-slate-800 px-2 rounded" onError={(e) => e.currentTarget.style.display='none'} />
                                <div>
                                    <h4 className="font-bold text-blue-700 group-hover:text-blue-800">SP4N Lapor!</h4>
                                    <p className="text-xs text-slate-500">Layanan Aspirasi Pengaduan Online Rakyat</p>
                                </div>
                            </div>
                            <ExternalLink className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </a>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-yellow-800 flex gap-2">
                        <CheckCircle size={16} className="shrink-0 mt-0.5" />
                        <p>Pastikan Anda memiliki bukti permulaan yang cukup sebelum melaporkan dugaan pelanggaran.</p>
                    </div>
                </div>
            </div>

            {/* 3. SEGMEN TRANSPARANSI (GALLERY) */}
            <div className="border-t border-slate-200 pt-16">
                <div className="flex flex-col items-center mb-10 text-center">
                    <span className="text-red-600 font-bold text-sm tracking-wider uppercase mb-2">Transparansi Publik</span>
                    <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                        <BarChart3 className="text-red-600" /> Rekapitulasi Laporan Masuk
                    </h2>
                    <p className="text-slate-500 mt-3 max-w-2xl">
                        Berikut adalah data statistik laporan yang telah masuk dan ditindaklanjuti oleh sistem WBS DPRD Provinsi Jawa Tengah.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                    </div>
                ) : reports.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                        <FileWarning className="mx-auto mb-3 opacity-50" size={40} />
                        Belum ada data rekap laporan.
                    </div>
                ) : (
                    // FIX: Menggunakan 2 Kolom (bukan 3) agar gambar lebih besar & lebar
                    <div className="columns-1 md:columns-2 gap-8 space-y-8">
                        {reports.map((item, idx) => {
                            const imgUrl = getDriveImgUrl(item.image_link);
                            if (!imgUrl) return null;

                            return (
                                <div key={idx} className="break-inside-avoid bg-white p-2 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                                    <div className="relative rounded-xl overflow-hidden bg-slate-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imgUrl} 
                                            alt={item.title || 'Rekap Laporan'} 
                                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <ImageIcon size={10} /> Statistik
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg leading-snug">
                                            {item.title || 'Data Statistik WBS'}
                                        </h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}