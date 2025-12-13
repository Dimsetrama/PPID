'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Download, Search, Filter, FolderOpen, ChevronDown, Loader2, Calendar } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type BerkalaItem = {
  id: string;
  kategori: string;
  title: string;
  year: string;
  drive_link: string;
};

// --- KOMPONEN UTAMA ---
export default function InformasiBerkalaPage() {
  const [data, setData] = useState<BerkalaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // 1. FETCH DATA
  useEffect(() => {
    async function fetchData() {
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=629830573&single=true&output=csv";
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<BerkalaItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validData = parsed.data.filter(item => item.kategori && item.kategori.trim() !== '');

        const sorted = validData.sort((a, b) => {
            if (a.kategori < b.kategori) return -1;
            if (a.kategori > b.kategori) return 1;
            return Number(b.year) - Number(a.year);
        });
        setData(sorted);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. LOGIKA FILTER
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year?.includes(searchTerm) ||
        item.kategori?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  // 3. GROUPING DATA
  const groupedData = useMemo(() => {
    const groups: { [key: string]: BerkalaItem[] } = {};
    filteredData.forEach(item => {
        const cat = item.kategori;
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
    });
    return groups;
  }, [filteredData]);

  const allCategories = useMemo(() => {
    const cats = new Set(data.map(item => item.kategori));
    return Array.from(cats).sort();
  }, [data]);

  const toggleGroup = (cat: string) => {
    setExpandedGroups(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Logika Auto Expand/Collapse saat Search
  useEffect(() => {
    if (searchTerm !== '') {
        setExpandedGroups(Object.keys(groupedData));
    } else {
        setExpandedGroups([]);
    }
  }, [searchTerm, groupedData]);


  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* FIX: Mengganti <img> dengan <Image /> Next.js */}
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill
                className="object-cover mix-blend-overlay grayscale" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">Layanan Informasi</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">Informasi Berkala</h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <div className="container mx-auto px-6 relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                
                {/* Search Input */}
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                    </div>
                    <input 
                        type="text"
                        placeholder="Cari dokumen, tahun, atau topik..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-inner"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="relative w-full md:w-1/3 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Filter className="text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                    </div>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-inner text-slate-700 font-medium"
                    >
                        <option value="Semua">Semua Kategori</option>
                        {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <ChevronDown className="text-slate-400" size={16} />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">

            {/* CONTENT AREA */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Loader2 size={40} className="animate-spin mb-4 text-green-600" />
                    <p>Memuat dokumen...</p>
                </div>
            ) : Object.keys(groupedData).length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mt-8">
                    <p className="text-slate-500 font-medium">Tidak ada dokumen yang ditemukan.</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('Semua')}}
                        className="mt-4 text-green-600 font-bold hover:underline"
                    >
                        Reset Pencarian
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 items-start">
                    
                    {Object.entries(groupedData).map(([category, items]) => {
                        const isOpen = expandedGroups.includes(category);
                        
                        return (
                            <div key={category} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden w-full ${isOpen ? 'border-green-200 shadow-lg ring-1 ring-green-100' : 'border-slate-200 shadow-sm hover:border-green-300'}`}>
                                
                                <button 
                                    onClick={() => toggleGroup(category)}
                                    className="w-full p-5 flex items-center justify-between bg-white hover:bg-green-50/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                            <FolderOpen size={22} />
                                        </div>
                                        <div className="text-left min-w-0">
                                            <h3 className="font-bold text-slate-800 text-base md:text-lg leading-tight">
                                                {category}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">{items.length} Dokumen</p>
                                        </div>
                                    </div>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-green-100 text-green-700' : 'text-slate-400'}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                                        <div className="space-y-3">
                                            {items.map((item, idx) => {
                                                const hasTitle = item.title && item.title.trim() !== '';
                                                const mainText = hasTitle ? item.title : item.year;
                                                const showYearBadge = hasTitle && item.year;

                                                return (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group">
                                                        <div className="shrink-0 text-slate-400 group-hover:text-green-600 transition-colors">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-bold text-slate-700 group-hover:text-green-700 leading-snug">
                                                                {mainText}
                                                            </h4>
                                                            
                                                            {showYearBadge && (
                                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                                    <Calendar size={12} className="text-slate-400" />
                                                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                                                        {item.year}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <a 
                                                            href={item.drive_link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="shrink-0 w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white rounded-lg transition-all"
                                                            title="Buka Dokumen"
                                                        >
                                                            <Download size={18} />
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
      </section>

      <Footer />
    </main>
  );
}