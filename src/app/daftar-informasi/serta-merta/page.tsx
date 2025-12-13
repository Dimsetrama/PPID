'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Download, Image as ImageIcon, ExternalLink, Megaphone, PlayCircle } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA MENTAH ---
type RawItem = {
  id: string;
  title: string;
  youtube_link: string;
  image_link: string;
  drive_link: string;
};

// --- TIPE DATA GROUPED ---
type SertaMertaItem = {
  title: string;
  youtubes: string[];
  images: string[];  
  docs: string[];
  priority: number;
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
  return `https://wsrv.nl/?url=${encodeURIComponent(googleLink)}&w=800&fit=cover`; 
};

export default function InformasiSertaMertaPage() {
  const [items, setItems] = useState<SertaMertaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // LINK BARU (UPDATED)
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1914784671&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RawItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });

        const groups: Record<string, SertaMertaItem> = {};

        parsed.data.forEach(row => {
            if (!row.title) return;
            const key = row.title.trim();

            if (!groups[key]) {
                groups[key] = { title: key, youtubes: [], images: [], docs: [], priority: 0 };
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

        const itemsArray = Object.values(groups).map(item => {
            let score = 1;
            if (item.images.length > 0) score = 2;
            if (item.youtubes.length > 0) score = 3;
            return { ...item, priority: score };
        });

        const sortedItems = itemsArray.sort((a, b) => b.priority - a.priority);
        setItems(sortedItems);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill 
                className="object-cover mix-blend-overlay grayscale" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-orange-500/50 bg-orange-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Layanan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Informasi Serta Merta
          </h1>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT WITH AESTHETIC BACKGROUND */}
      <section className="relative py-16 overflow-hidden min-h-screen">
        
        {/* --- DEKORASI BACKGROUND (DIPERTEGAS) --- */}
        {/* 1. Base Gradient: Agar tidak putih polos */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-orange-50 -z-30"></div>
        
        {/* 2. Pola Titik-Titik: Opacity dinaikkan jadi 0.15 agar terlihat */}
        <div className="absolute inset-0 opacity-[0.15] -z-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#f97316 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* 3. Blobs Warna: Warna dipertebal (200) dan Opacity dinaikkan (0.6) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 -z-10 animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/3 -z-10"></div>
        
        {/* ---------------------------------------- */}

        <div className="container mx-auto px-6 relative z-10">
            
            {loading ? (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm">
                    <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="font-medium">Memuat informasi...</p>
                 </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm">
                    Belum ada informasi serta merta.
                </div>
            ) : (
                // MASONRY LAYOUT
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    
                    {items.map((item, idx) => (
                        <div key={idx} className="break-inside-avoid bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/60 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ring-1 ring-slate-100">
                            
                            {/* 1. MEDIA SECTION */}
                            <div className="bg-slate-50/50">
                                {item.youtubes.length > 0 && (
                                    <div className="flex flex-col gap-4 p-4 pb-0">
                                        {item.youtubes.map((yId, yIdx) => (
                                            <div key={`yt-${yIdx}`} className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-md ring-1 ring-black/10">
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
                                )}

                                {item.images.length > 0 && (
                                    <div className={`flex flex-col gap-4 ${item.youtubes.length > 0 ? 'mt-4 px-4 pb-0' : 'p-0'}`}>
                                        {item.images.map((imgUrl, imgIdx) => (
                                            <div key={`img-${imgIdx}`} className="relative w-full group/img cursor-pointer">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={imgUrl} 
                                                    alt="Visual" 
                                                    className={`w-full h-auto object-cover ${item.youtubes.length > 0 ? 'rounded-xl shadow-sm' : ''}`}
                                                    referrerPolicy="no-referrer"
                                                />
                                                {item.youtubes.length === 0 && (
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 2. CONTENT BODY */}
                            <div className="p-6">
                                {/* Kategori Label */}
                                <div className="flex items-center justify-between mb-4">
                                    {item.youtubes.length > 0 ? (
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full ring-1 ring-red-100">
                                            <PlayCircle size={14} fill="currentColor" className="text-red-500/20" /> Video
                                        </span>
                                    ) : item.images.length > 0 ? (
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full ring-1 ring-blue-100">
                                            <ImageIcon size={14} /> Visual
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full ring-1 ring-orange-100">
                                            <Megaphone size={14} /> Info
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 leading-snug mb-2 group-hover:text-orange-600 transition-colors">
                                    {item.title}
                                </h3>
                                
                                <div className="h-1 w-12 bg-slate-100 rounded-full mb-6 group-hover:bg-orange-400 transition-colors duration-500"></div>

                                {/* 3. DOCUMENTS */}
                                {item.docs.length > 0 && (
                                    <div className="space-y-3 pt-2">
                                        {item.docs.map((docUrl, dIdx) => (
                                            <a 
                                                key={`doc-${dIdx}`}
                                                href={docUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 p-3.5 bg-slate-50 hover:bg-green-50 text-slate-600 hover:text-green-700 rounded-xl transition-all group/doc border border-slate-100 hover:border-green-200 hover:shadow-md"
                                            >
                                                <div className="shrink-0 bg-white p-2 rounded-lg shadow-sm group-hover/doc:text-green-600 text-slate-400 border border-slate-100">
                                                    <FileText size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-xs font-bold block mb-0.5">Dokumen Lampiran {item.docs.length > 1 ? `#${dIdx + 1}` : ''}</span>
                                                    <span className="text-[10px] text-slate-400 group-hover/doc:text-green-600 flex items-center gap-1 font-medium">
                                                        Klik untuk membuka <ExternalLink size={8} />
                                                    </span>
                                                </div>
                                                <Download size={18} className="opacity-0 -translate-x-2 group-hover/doc:opacity-100 group-hover/doc:translate-x-0 transition-all text-green-600" />
                                            </a>
                                        ))}
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