'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  BarChart2, Image as ImageIcon, Loader2, 
  PieChart, TrendingUp
} from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type StatistikItem = {
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
          if (id) return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&w=1200&output=jpg`; 
      }
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`;
  } catch {
      return null;
  }
};

export default function StatistikSektoralPage() {
  const [data, setData] = useState<StatistikItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV STATISTIK SEKTORAL
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=396585892&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<StatistikItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validData = parsed.data.filter(item => item.image_link && item.image_link.trim() !== '');
        setData(validData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-indigo-900 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-indigo-200 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-indigo-500/50 bg-indigo-950/30 rounded-full py-1 px-3 w-fit mx-auto">
            Open Data
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Statistik Data Sektoral
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="relative py-16 min-h-screen overflow-hidden">
        
        {/* --- BACKGROUND AESTHETIC --- */}
        <div className="absolute inset-0 bg-slate-50"></div>
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200 rounded-full blur-[120px] opacity-30 -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* HEADER INFO */}
                <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white shadow-lg flex flex-col md:flex-row gap-6 items-center text-center md:text-left transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="p-5 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shrink-0 shadow-blue-200 shadow-lg rotate-3">
                        <BarChart2 size={40} />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                            Infografis Statistik & Kinerja
                        </h2>
                        <p className="text-slate-600 leading-relaxed max-w-2xl">
                            Visualisasi data sektoral terkait kinerja dan capaian Sekretariat DPRD Provinsi Jawa Tengah dalam format infografis yang informatif dan mudah dipahami.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-4 ml-auto opacity-20 text-indigo-900">
                        <PieChart size={48} />
                        <TrendingUp size={48} />
                    </div>
                </div>

                {/* GALLERY GRID */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                        <p>Memuat data statistik...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-12 bg-white/50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                        Belum ada data statistik.
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {data.map((item, idx) => {
                            const imgUrl = getDriveImgUrl(item.image_link);
                            if (!imgUrl) return null;

                            return (
                                <div key={idx} className="break-inside-avoid bg-white p-3 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                                    <div className="relative rounded-xl overflow-hidden bg-slate-100">
                                        {/* FIX: Hapus efek scale/zoom dan overlay text */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imgUrl} 
                                            alt={item.title || 'Infografis Statistik'} 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    
                                    <div className="pt-4 pb-2 px-2">
                                        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                                            <ImageIcon size={10} /> Statistik
                                        </div>
                                        <h3 className="font-bold text-slate-700 text-lg leading-snug">
                                            {item.title}
                                        </h3>
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