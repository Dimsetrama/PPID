import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Eye } from 'lucide-react';
import Papa from 'papaparse';

// --- 1. TIPE DATA ---
type PejabatDoc = {
  id: string;
  year: string;
  drive_link: string;
};

// --- 2. FUNGSI FETCH DATA ---
async function getPejabatDocs(): Promise<PejabatDoc[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=0&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal mengambil data');
    
    const text = await res.text();
    const parsed = Papa.parse<PejabatDoc>(text, { 
      header: true, 
      skipEmptyLines: true, 
      transformHeader: (h: string) => h.trim() 
    });
    
    return parsed.data.sort((a: PejabatDoc, b: PejabatDoc) => Number(b.year) - Number(a.year));
  } catch (error) {
    console.error("Error load sheet:", error);
    return [];
  }
}

export default async function PejabatStrukturalPage() {
  const documents = await getPejabatDocs();

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="/berlian.jpg" 
                alt="Background Pattern" 
                fill 
                className="object-cover mix-blend-overlay grayscale"
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">
            Profil PPID
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Pejabat Struktural
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* KIRI: BAGAN STRUKTUR (Static) */}
          <div className="w-full lg:w-5/12 sticky top-24">
            <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100">
                <div className="mb-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Bagan Struktur</h3>
                    {/* Tulisan Updated dihapus */}
                </div>
                
                {/* Gambar Landscape (Static - No Zoom) */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <Image 
                        src="/STRUKTUR-ORGANISASI-2025.jpg" 
                        alt="Struktur Organisasi Sekretariat DPRD"
                        fill
                        className="object-contain" // Hapus transition & scale
                    />
                    {/* Overlay Zoom dihapus */}
                </div>
            </div>
          </div>

          {/* KANAN: ARSIP DOKUMEN (List) */}
          <div className="w-full lg:w-7/12 space-y-5">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Arsip Dokumen</h2>
            </div>

            {documents.length === 0 && (
               <div className="p-6 text-center bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-yellow-700 font-medium text-sm">Data sedang dimuat atau belum tersedia.</p>
               </div>
            )}

            <div className="grid grid-cols-1 gap-3">
                {documents.map((item, index) => (
                    <div 
                        key={index} 
                        className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-200"
                    >
                        {/* Tahun */}
                        <div className="shrink-0 flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                            <span className="text-lg font-black text-slate-400 group-hover:text-white">
                                {item.year}
                            </span>
                        </div>

                        {/* Judul */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-slate-800 group-hover:text-green-700 transition-colors truncate">
                                Profil Pejabat Struktural {item.year}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                <span className="uppercase tracking-wider font-medium">PDF FILE</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Public Access</span>
                            </div>
                        </div>

                        {/* Tombol Lihat */}
                        <a 
                            href={item.drive_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                        >
                            <Eye size={16} /> <span className="hidden sm:inline">Lihat</span>
                        </a>
                    </div>
                ))}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}