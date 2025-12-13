'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, ShieldAlert, Download, Lock, Info} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA MENTAH (DARI CSV) ---
type RawItem = {
  id: string;
  title: string;
  image_link: string;
  drive_link: string;
  label: string; // Kolom baru untuk nama tombol (Lihat / Bukti)
};

// --- TIPE DATA SETELAH DI-GROUPING ---
type GroupedDoc = {
  title: string;
  files: {
    url: string;
    label: string;
  }[];
};

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

export default function InformasiDikecualikanPage() {
  const [docs, setDocs] = useState<GroupedDoc[]>([]); // Data Dokumen yang sudah digroup
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=885490634&single=true&output=csv";
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RawItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const imgList: string[] = [];
        
        // LOGIKA GROUPING DOKUMEN
        // Kita pakai Object (Dictionary) sementara untuk mengelompokkan berdasarkan Judul
        const groups: Record<string, GroupedDoc> = {};

        parsed.data.forEach(item => {
            // 1. Handle Gambar (Carousel) - Langsung masuk array
            if (item.image_link && item.image_link.trim() !== '') {
                const url = getDriveImgUrl(item.image_link);
                if (url) imgList.push(url);
            } 
            
            // 2. Handle Dokumen (Grouping)
            // Hanya proses jika Judul ada DAN bukan baris gambar murni
            else if (item.title && item.title.trim() !== '') {
                const titleKey = item.title.trim();

                // Jika grup judul ini belum ada, buat baru
                if (!groups[titleKey]) {
                    groups[titleKey] = {
                        title: titleKey,
                        files: []
                    };
                }

                // Jika baris ini punya link, masukkan ke list files grup tersebut
                if (item.drive_link && item.drive_link.trim() !== '') {
                    groups[titleKey].files.push({
                        url: item.drive_link,
                        // Jika kolom label kosong di excel, default jadi "Lihat"
                        label: item.label && item.label.trim() !== '' ? item.label : 'Lihat'
                    });
                }
            }
        });

        // Ubah Object Groups kembali menjadi Array
        const groupedDocsList = Object.values(groups);

        setImages(imgList);
        setDocs(groupedDocsList);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Logika Carousel
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    if (images.length > 1) {
        setActiveIndex((current) => (current + 1) % images.length);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 selection:text-red-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-red-950 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill
                className="object-cover mix-blend-overlay grayscale" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-red-300 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-red-800 bg-red-900/50 rounded-full py-1 px-3 w-fit mx-auto">
            Layanan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Informasi Dikecualikan
          </h1>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
            
            {/* --- KIRI: LIST DOKUMEN --- */}
            <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
                
                {/* Intro Card */}
                <div className="bg-white p-6 rounded-2xl border-l-4 border-red-600 shadow-sm flex gap-4">
                    <div className="shrink-0 text-red-600 mt-1">
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Apa itu Informasi Dikecualikan?</h2>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify">
                            Informasi Publik yang dikecualikan adalah informasi yang tidak dapat diakses oleh pemohon informasi publik karena dapat membahayakan negara, berkaitan dengan kepentingan perlindungan usaha, hak pribadi, dan rahasia jabatan.
                        </p>
                    </div>
                </div>

                {/* List Dokumen Grouped */}
                <div>
                    <div className="flex items-center gap-2 mb-6 text-slate-800">
                        <Lock size={20} className="text-red-600" />
                        <h3 className="text-xl font-bold">Daftar Penetapan (SK) & Pernyataan</h3>
                    </div>

                    {loading ? (
                         <div className="p-8 text-center bg-slate-100 rounded-xl animate-pulse">
                            <p className="text-slate-400">Memuat data...</p>
                         </div>
                    ) : docs.length === 0 ? (
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-500 italic">
                            Belum ada dokumen yang terdaftar.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {docs.map((doc, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all group flex flex-col gap-4">
                                    
                                    {/* Judul Dokumen */}
                                    <div className="flex gap-4 items-start">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors mt-1">
                                            {doc.files.length > 0 ? <FileText size={20} /> : <Info size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-700 leading-snug group-hover:text-red-700">
                                                {doc.title}
                                            </h4>
                                            {doc.files.length === 0 && (
                                                <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                                                    Pernyataan Resmi (Tidak ada lampiran)
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* List Tombol Link (Jika ada) */}
                                    {doc.files.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pl-14">
                                            {doc.files.map((file, fIdx) => (
                                                <a 
                                                    key={fIdx}
                                                    href={file.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-md hover:bg-red-600 hover:text-white border border-slate-200 hover:border-red-600 transition-all"
                                                >
                                                    <Download size={12} /> {file.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- KANAN: FOTO (STACKING CARD) --- */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="sticky top-24">
                    <div 
                        className="relative w-full aspect-video max-w-2xl mx-auto perspective-1000 group cursor-pointer"
                        onClick={nextSlide}
                    >
                        {images.length === 0 ? (
                            <div className="w-full h-full bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                                <ShieldAlert size={48} className="mb-2 opacity-50" />
                                <p className="text-sm">Tidak ada foto dokumentasi</p>
                            </div>
                        ) : (
                            images.map((imgUrl, index) => {
                                const position = (index - activeIndex + images.length) % images.length;
                                if (position > 2 && position !== images.length - 1) return null;

                                let styleClass = "";
                                if (position === 0) {
                                    styleClass = "z-30 opacity-100 scale-100 translate-y-0 shadow-2xl border-white ring-4 ring-red-100";
                                } else if (position === 1) {
                                    styleClass = "z-20 opacity-70 scale-95 -translate-y-4 translate-x-4 shadow-xl border-slate-50";
                                } else if (position === 2) {
                                    styleClass = "z-10 opacity-40 scale-90 -translate-y-8 translate-x-8 shadow-lg border-slate-100";
                                } else {
                                    styleClass = "z-0 opacity-0 scale-50";
                                }

                                return (
                                    <div 
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-700 ease-in-out bg-slate-200 rounded-2xl overflow-hidden border-4 ${styleClass}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imgUrl} 
                                            alt={`Dokumentasi ${index}`} 
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}