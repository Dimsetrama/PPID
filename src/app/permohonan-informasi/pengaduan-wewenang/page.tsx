'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Download, ShieldAlert, 
  User, UserX, FileWarning, Send, 
  Image as ImageIcon, Loader2, MousePointerClick, 
  CheckSquare
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type WewenangItem = {
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

export default function PengaduanWewenangPage() {
  const [docs, setDocs] = useState<WewenangItem[]>([]);
  const [images, setImages] = useState<WewenangItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV TATA CARA PENGADUAN WEWENANG
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1105566112&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<WewenangItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const docList: WewenangItem[] = [];
        const imgList: WewenangItem[] = [];

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
    // FIX: Menambahkan overflow-x-hidden agar tidak bisa scroll ke samping
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-200 selection:text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-slate-800 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-slate-300 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-slate-500/50 bg-slate-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Permohonan Informasi
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 animate-fade-in-up leading-tight">
            Tata Cara Pengaduan<br/>Penyalahgunaan Wewenang
          </h1>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 -z-20"></div>
        
        {/* Dekorasi Background penyebab scroll samping (sekarang aman karena overflow-x-hidden di main) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 -z-10"></div>

        <div className="max-w-6xl mx-auto space-y-24">

            {/* 1. WIDGET TUTORIAL */}
            <div>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Prosedur Pelaporan</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Panduan pengisian formulir pengaduan atas pelanggaran disiplin atau etika Aparatur Sipil Negara (ASN).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-linear-to-r from-blue-200 via-red-200 to-slate-200 -z-10 transform -translate-y-1/2 px-16"></div>

                    {/* Step 1 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                            <User size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">1</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Identitas Pelapor</h3>
                        <div className="text-sm text-slate-500 leading-relaxed">
                            <p className="mb-2">Siapkan data diri valid:</p>
                            <ul className="text-xs text-left list-disc pl-4 space-y-1 bg-blue-50 p-2 rounded-lg">
                                <li>KTP/SIM (Wajib)</li>
                                <li>Nomor Telepon/HP</li>
                                <li>Alamat Lengkap</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-red-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200 group-hover:scale-110 transition-transform duration-300">
                            <UserX size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-red-100 text-red-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">2</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Identitas Terlapor</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Sebutkan <strong>Nama Terlapor</strong> dengan jelas. Jika tidak tahu, sebutkan <strong>Ciri-ciri Fisik</strong> atau identifikasi lain yang diketahui.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                            <FileWarning size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">3</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Isi Laporan</h3>
                        <div className="text-sm text-slate-500 leading-relaxed">
                            <ul className="text-xs text-left list-disc pl-4 space-y-1 bg-orange-50 p-2 rounded-lg">
                                <li>Jelaskan kronologi peristiwa</li>
                                <li>Lampirkan bukti gambar/dokumen</li>
                                <li>Sebutkan jika ada sanksi sebelumnya</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-slate-600 to-slate-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-300 group-hover:scale-110 transition-transform duration-300">
                            <Send size={32} />
                        </div>
                        <div className="absolute top-4 right-4 bg-slate-100 text-slate-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">4</div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Kirim Aduan</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Serahkan formulir yang telah diisi dan ditandatangani ke petugas PPID Pelaksana DPRD Prov. Jateng.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. GALERI INFOGRAFIS */}
            {images.length > 0 && (
                <div className="border-t border-slate-200 pt-16">
                    <div className="flex flex-col items-center text-center mb-10">
                        <span className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-2">Materi Pendukung</span>
                        <h3 className="text-3xl font-extrabold text-slate-800">Infografis Terkait</h3>
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
                                            alt={item.title || 'Infografis Pengaduan'} 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="pt-4 text-center">
                                        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">
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

            {/* 3. AREA DOWNLOAD (Formulir PDF) */}
            <div className="border-t border-slate-200 pt-16">
                <div className="flex flex-col items-center text-center mb-10">
                    <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2">Dokumen Resmi</span>
                    <h3 className="text-3xl font-extrabold text-slate-800">Unduh Formulir Pengaduan</h3>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
                    </div>
                ) : docs.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        Belum ada dokumen formulir.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {docs.map((item, idx) => (
                            <a 
                                key={idx}
                                href={item.drive_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-red-400 hover:-translate-y-1 transition-all flex items-start gap-5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ShieldAlert size={80} className="text-red-900" />
                                </div>
                                <div className="shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors z-10">
                                    <Download size={24} />
                                </div>
                                <div className="z-10 flex-1">
                                    <h4 className="font-bold text-slate-800 group-hover:text-red-700 text-lg leading-tight mb-2">
                                        {item.title}
                                    </h4>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-red-600 transition-colors">
                                            <CheckSquare size={12} /> Format PDF Resmi
                                        </span>
                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                            <MousePointerClick size={12} /> Klik untuk mengunduh
                                        </span>
                                    </div>
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