'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type GalleryItem = {
  id: string;
  kategori: string;
  image_link: string;
};

// --- HELPER: Proxy Image (LH3 Google - No Download) ---
const getDriveImgUrl = (url: string) => {
  if (!url || typeof url !== 'string') return null;

  try {
      // Ekstrak ID dari Link Google Drive
      let id = '';
      const parts = url.match(/[-\w]{25,}/); 
      
      if (parts && parts[0]) {
          id = parts[0];
          // Gunakan server lh3.googleusercontent.com
          return `https://lh3.googleusercontent.com/d/${id}=w1000`;
      }

      // Fallback
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&output=jpg`;
  } catch {
      return null;
  }
};

const GaleriSection = () => {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 1. FETCH DATA
  useEffect(() => {
    async function fetchData() {
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=776592134&single=true&output=csv";
      
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse<GalleryItem>(text, { 
            header: true, 
            skipEmptyLines: true, 
            transformHeader: h => h.trim() 
        });
        
        const validData = parsed.data.filter(item => 
            item.image_link && item.image_link.trim() !== '' &&
            item.kategori && item.kategori.trim() !== ''
        );
        
        setData(validData);

        if (validData.length > 0) {
            const firstCat = validData[0].kategori;
            setActiveCategory(firstCat);
        }

      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. GROUPING KATEGORI
  const categories = useMemo(() => {
      const cats = new Set(data.map(item => item.kategori));
      return Array.from(cats).sort();
  }, [data]);

  // 3. FILTER DATA
  const displayData = useMemo(() => {
      return data.filter(item => item.kategori === activeCategory);
  }, [data, activeCategory]);

  if (!loading && data.length === 0) return null;

  return (
    <section className="relative py-24 bg-linear-to-b from-slate-50 to-green-50 overflow-hidden">
      
      {/* --- DEKORASI BACKGROUND (Tanpa Karakter) --- */}
      {/* 1. Pola Dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* 2. Blobs Warna Tema Simetris */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-green-200 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-200 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          {/* Tambahan blob tengah agar seimbang */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER (Centered) */}
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                Galeri Lensa DPRD
            </h2>
            <div className="h-1 w-24 bg-green-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* TABS KATEGORI (Centered) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                        activeCategory === cat 
                        ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200 scale-105' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-green-300 hover:text-green-600'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* CONTENT WIDGET (Centered & Expanded) */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-green-600" size={40} />
            </div>
        ) : (
            // FIX: Hapus padding kiri, gunakan mx-auto, tambahkan xl:columns-4 agar melebar
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mx-auto max-w-[1400px]">
                {displayData.map((item, idx) => {
                    const imgUrl = getDriveImgUrl(item.image_link);
                    if (!imgUrl) return null;

                    return (
                        <div 
                            key={idx} 
                            className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-green-200"
                        >
                            <div className="relative w-full">
                                <Image
                                    src={imgUrl}
                                    alt={`Galeri ${item.kategori}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

      </div>
    </section>
  );
};

export default GaleriSection;