'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
// FIX: Menghapus 'Youtube' dari import agar tidak error
import { FileText, Image as ImageIcon, Download, ExternalLink, PlayCircle, BookOpen, Info } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type RawItem = {
  id: string;
  title: string;
  youtube_link: string;
  image_link: string;
  drive_link: string;
};

// --- TIPE DATA GROUPED ---
type SopItem = {
  title: string;
  youtubes: string[];
  images: string[];  
  docs: string[];
};

// --- HELPER: Youtube ID ---
const getYoutubeID = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// --- HELPER: Proxy Image ---
const getDriveImgUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('/')) return url; 
  let id = '';
  const match1 = url.match(/\/d\/(.+?)\//);
  if (match1) id = match1[1];
  const match2 = url.match(/id=(.+?)(&|$)/);
  if (match2) id = match2[1];
  if (!id) return null;
  const googleLink = `https://drive.google.com/uc?id=${id}`;
  return `https://wsrv.nl/?url=${encodeURIComponent(googleLink)}&w=1000&fit=cover`; 
};

export default function SOPPelayananPublikPage() {
  const [items, setItems] = useState<SopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV SOP PELAYANAN PUBLIK
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1738082377&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RawItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });

        // GROUPING LOGIC
        const groups: Record<string, SopItem> = {};

        parsed.data.forEach(row => {
            if (!row.title) return;
            const key = row.title.trim();

            if (!groups[key]) {
                groups[key] = { title: key, youtubes: [], images: [], docs: [] };
            }

            if (row.youtube_link) {
                const yId = getYoutubeID(row.youtube_link);
                if (yId) groups[key].youtubes.push(yId);
            }
            if (row.image_link) {
                const imgUrl = getDriveImgUrl(row.image_link);
                if (imgUrl) groups[key].images.push(imgUrl);
            }
            if (row.drive_link) {
                groups[key].docs.push(row.drive_link);
            }
        });

        setItems(Object.values(groups));

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
            SOP Pelayanan Publik
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
            
            {/* INTRO CARD */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 p-5 bg-green-50 rounded-full text-green-600">
                    <BookOpen size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Panduan & Alur Pelayanan</h2>
                    <p className="text-slate-600 leading-relaxed text-sm text-justify">
                        Halaman ini berisi <strong>Standar Operasional Prosedur (SOP)</strong> untuk berbagai layanan publik di Sekretariat DPRD Provinsi Jawa Tengah. Silakan simak infografis alur, video panduan, atau unduh dokumen SOP resmi di bawah ini untuk memahami mekanisme pelayanan kami.
                    </p>
                </div>
            </div>

            {loading ? (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                    <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <p>Memuat SOP...</p>
                 </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                    Belum ada data SOP.
                </div>
            ) : (
                <div className="grid gap-10">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
                            
                            {/* HEADER ITEM */}
                            <div className="bg-slate-50 p-6 border-b border-slate-200">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                                    {item.title}
                                </h3>
                            </div>

                            {/* BODY CONTENT */}
                            <div className="p-6 space-y-8">
                                
                                {/* 1. SECTION VIDEO (Jika Ada) */}
                                {item.youtubes.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-red-600 font-bold text-sm uppercase tracking-wider">
                                            <PlayCircle size={18} /> Video Panduan
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {item.youtubes.map((yId, yIdx) => (
                                                <div key={`yt-${yIdx}`} className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                                                    <iframe 
                                                        src={`https://www.youtube.com/embed/${yId}`} 
                                                        title="YouTube video player" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowFullScreen
                                                        className="absolute inset-0 w-full h-full"
                                                    ></iframe>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 2. SECTION GAMBAR/INFOGRAFIS (Jika Ada) */}
                                {item.images.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm uppercase tracking-wider">
                                            <ImageIcon size={18} /> Infografis Alur
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            {item.images.map((imgUrl, imgIdx) => (
                                                <div key={`img-${imgIdx}`} className="relative w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm group">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img 
                                                        src={imgUrl} 
                                                        alt={`Infografis ${item.title}`} 
                                                        className="w-full h-auto object-contain bg-slate-50"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    {/* Keterangan Hover */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm">
                                                        <Info size={16} className="mr-2" /> Klik kanan &quot;Open Image&quot; untuk memperbesar
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. SECTION DOKUMEN (Jika Ada) - DIBUAT BESAR & JELAS */}
                                {item.docs.length > 0 && (
                                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                                        <div className="flex items-center gap-2 mb-4 text-green-800 font-bold text-sm uppercase tracking-wider">
                                            <FileText size={18} /> Dokumen Resmi
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {item.docs.map((docUrl, dIdx) => (
                                                <a 
                                                    key={`doc-${dIdx}`}
                                                    href={docUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-green-200 shadow-sm hover:shadow-md hover:border-green-400 hover:-translate-y-1 transition-all group cursor-pointer"
                                                >
                                                    <div className="shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                        <Download size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-bold text-slate-800 block text-sm md:text-base group-hover:text-green-700">
                                                            Unduh Dokumen SOP
                                                        </span>
                                                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                            Format PDF <ExternalLink size={10} />
                                                        </span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
      </section>

      <Footer />
    </main>
  );
}