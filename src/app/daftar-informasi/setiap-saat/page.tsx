'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Search, Star, Loader2, Youtube, Download, ExternalLink, PlayCircle } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type RawItem = {
  id: string;
  kategori: string;
  title: string;
  year: string;
  drive_link: string;
};

type CategoryGroup = {
  name: string;
  mainLinks: RawItem[]; 
  subItems: {           
    [title: string]: RawItem[];
  };
};

export default function InformasiSetiapSaatPage() {
  const [data, setData] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. FETCH DATA & PROCESSING
  useEffect(() => {
    async function fetchData() {
      // ✅ LINK CSV
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1873186635&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<RawItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });

        const groups: Record<string, CategoryGroup> = {};
        
        let lastCategory = '';
        let lastTitle = '';

        parsed.data.forEach(row => {
            // Logika Fill Down Kategori
            if (row.kategori && row.kategori.trim() !== '') {
                lastCategory = row.kategori.trim();
                lastTitle = row.title ? row.title.trim() : ''; 
            }
            
            // Logika Fill Down Judul
            if (row.title && row.title.trim() !== '') {
                lastTitle = row.title.trim();
            }

            if (!lastCategory) return;

            if (!groups[lastCategory]) {
                groups[lastCategory] = { name: lastCategory, mainLinks: [], subItems: {} };
            }

            // Cek apakah data ini valid untuk ditampilkan (Punya Link)
            const hasLink = row.drive_link && row.drive_link.trim() !== '';

            const isExplicitMainLink = (row.kategori && row.kategori.trim() !== '') && (!row.title || row.title.trim() === '');
            
            if (isExplicitMainLink) {
                lastTitle = ''; 
                // Hanya masukkan ke mainLinks jika BENAR-BENAR ada linknya
                if (hasLink) {
                    groups[lastCategory].mainLinks.push(row);
                }
            } else if (lastTitle !== '') {
                if (!groups[lastCategory].subItems[lastTitle]) {
                    groups[lastCategory].subItems[lastTitle] = [];
                }
                // Hanya masukkan ke subItems jika BENAR-BENAR ada linknya
                if (hasLink) {
                    groups[lastCategory].subItems[lastTitle].push({ 
                        ...row, 
                        kategori: lastCategory, 
                        title: lastTitle 
                    });
                }
            }
        });

        // Sorting & Cleanup
        Object.keys(groups).forEach(catKey => {
            const group = groups[catKey];
            
            group.mainLinks.sort((a, b) => Number(b.year) - Number(a.year));
            
            Object.keys(group.subItems).forEach(titleKey => {
                if (group.subItems[titleKey].length === 0) {
                    delete group.subItems[titleKey];
                } else {
                    group.subItems[titleKey].sort((a, b) => Number(b.year) - Number(a.year));
                }
            });
        });

        const sortedGroups = Object.values(groups); 
        setData(sortedGroups);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();

    return data.map(group => {
        const catMatch = group.name.toLowerCase().includes(lowerSearch);
        const matchingSubs: typeof group.subItems = {};
        let hasSubMatch = false;

        Object.entries(group.subItems).forEach(([title, items]) => {
            if (title.toLowerCase().includes(lowerSearch) || catMatch) {
                matchingSubs[title] = items;
                hasSubMatch = true;
            }
        });

        if (catMatch || hasSubMatch) {
            return { ...group, subItems: matchingSubs };
        }
        return null;
    }).filter(Boolean) as CategoryGroup[];
  }, [data, searchTerm]);

  // --- HELPERS VISUAL ---

  const getYearColor = (year: string) => {
      if (year === '2025') return 'bg-green-600 text-white border-green-700 hover:bg-green-700 shadow-green-100';
      if (year === '2024') return 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-blue-100';
      if (year === '2023') return 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 shadow-yellow-100';
      return 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300';
  };

  const getLinkIcon = (url: string) => {
      // Icon inherit color (currentColor) agar mengikuti warna teks tombol (Putih/Slate)
      if (!url) return <FileText size={14} />;
      const u = url.toLowerCase();
      if (u.includes('youtube') || u.includes('youtu.be')) return <Youtube size={14} />;
      if (u.includes('drive.google') || u.includes('.pdf')) return <Download size={14} />;
      return <ExternalLink size={14} />;
  };

  const getLinkText = (url: string, year: string) => {
      if (year && year.trim() !== '') return year;
      
      const u = url ? url.toLowerCase() : '';
      if (u.includes('youtube') || u.includes('youtu.be')) return 'Tonton';
      if (u.includes('drive.google') || u.includes('.pdf')) return 'Unduh';
      return 'Buka';
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-32 overflow-hidden">
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
            Layanan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Informasi Setiap Saat
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="container mx-auto px-6 relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100">
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-slate-400 group-focus-within:text-green-600 transition-colors" size={20} />
                </div>
                <input 
                    type="text"
                    placeholder="Ketik judul dokumen yang dicari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-inner"
                />
            </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
            
            {loading ? (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                    <p>Menyiapkan arsip...</p>
                 </div>
            ) : filteredData.length === 0 ? (
                <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                    Tidak ada dokumen yang cocok.
                </div>
            ) : (
                <div className="space-y-10">
                    {filteredData.map((group, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            
                            {/* HEADER KATEGORI */}
                            <div className="bg-slate-50 p-5 md:p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-8 bg-yellow-500 rounded-full shrink-0 mt-1"></div>
                                    <h3 className="font-bold text-slate-800 text-xl leading-tight">
                                        {group.name}
                                    </h3>
                                </div>

                                {/* Link Induk (Hanya muncul jika ada link) */}
                                {group.mainLinks.length > 0 && (
                                    <div className="flex flex-wrap gap-2 lg:justify-end">
                                        {group.mainLinks.map((link, i) => (
                                            <a 
                                                key={i}
                                                href={link.drive_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all shadow-sm ${getYearColor(link.year)}`}
                                            >
                                                {/* Icon mengikuti warna teks (putih) */}
                                                {link.drive_link.includes('youtu') ? <PlayCircle size={14} /> : <Star size={14} fill="currentColor" className="text-yellow-200" />}
                                                
                                                {/* Teks hanya tahun */}
                                                <span>{getLinkText(link.drive_link, link.year)}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* BODY KATEGORI */}
                            <div className="divide-y divide-slate-100">
                                {Object.entries(group.subItems).map(([title, items], subIdx) => (
                                    <div 
                                        key={subIdx} 
                                        className="p-4 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-green-50/20 transition-colors group"
                                    >
                                        {/* Judul Dokumen */}
                                        <div className="flex items-start gap-3 md:w-2/3">
                                            <div className="mt-1 text-slate-300 group-hover:text-green-600 transition-colors shrink-0">
                                                <FileText size={16} />
                                            </div>
                                            <span className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-green-800 transition-colors">
                                                {title}
                                            </span>
                                        </div>

                                        {/* Tombol Tahun */}
                                        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 md:w-1/3">
                                            {items.map((item, yrIdx) => (
                                                <a 
                                                    key={yrIdx}
                                                    href={item.drive_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${getYearColor(item.year)}`}
                                                    title={`Buka dokumen`}
                                                >
                                                    {getLinkIcon(item.drive_link)}
                                                    {getLinkText(item.drive_link, item.year)}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                                {Object.keys(group.subItems).length === 0 && group.mainLinks.length === 0 && (
                                    <div className="p-6 text-center text-sm text-slate-400 italic bg-slate-50/50">
                                        Data belum tersedia untuk kategori ini.
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