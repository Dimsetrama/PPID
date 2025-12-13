import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ShoppingCart, FileText, Download, Briefcase, PackageCheck } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type PBJItem = {
  id: string;
  kategori: string;
  title: string;
  drive_link: string;
};

// --- FUNGSI FETCH ---
async function getPBJData(): Promise<PBJItem[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1967617587&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal fetch');
    const text = await res.text();
    const parsed = Papa.parse<PBJItem>(text, { 
        header: true, 
        skipEmptyLines: true, 
        transformHeader: h => h.trim() 
    });
    return parsed.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default async function PBJPage() {
  const data = await getPBJData();

  // --- LOGIKA GROUPING (REVISI) ---
  // 1. Filter: Hanya ambil data yang kolom 'kategori'-nya TIDAK KOSONG
  const validData = data.filter(item => item.kategori && item.kategori.trim() !== '');

  // 2. Grouping: Kelompokkan berdasarkan nama kategori persis dari spreadsheet
  const groupedData = validData.reduce((acc, item) => {
    const cat = item.kategori; // Tidak ada lagi default || 'Lainnya'
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, PBJItem[]>);

  // 3. Urutkan nama kategori secara alfabetis
  const categories = Object.keys(groupedData).sort();

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill
                className="object-cover mix-blend-overlay grayscale"
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">
            Layanan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Barang & Jasa (PBJ)
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
            
            {/* 1. INTRO CARD */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 p-5 bg-blue-50 rounded-full text-blue-600">
                    <ShoppingCart size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Transparansi Pengadaan</h2>
                    <p className="text-slate-600 leading-relaxed text-sm text-justify">
                        <strong>Pengadaan Barang dan Jasa (PBJ)</strong> pada Sekretariat DPRD Provinsi Jawa Tengah dilakukan secara transparan, akuntabel, dan sesuai dengan prinsip tata kelola pemerintahan yang baik. Halaman ini memuat dokumen kontrak, laporan e-purchasing, serta jasa konsultasi yang telah dilaksanakan sebagai bentuk pertanggungjawaban publik.
                    </p>
                </div>
            </div>

            {/* 2. LOOPING KATEGORI */}
            {categories.length === 0 ? (
                 <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <p className="text-yellow-700 font-medium">Data PBJ belum tersedia.</p>
                 </div>
            ) : (
                <div className="space-y-10">
                    {categories.map((kategori) => (
                        <div key={kategori} className="animate-fade-in-up">
                            
                            {/* Header Kategori */}
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
                                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                    {/* Logika Ikon Dinamis */}
                                    {kategori.toLowerCase().includes('kontrak') ? (
                                        <Briefcase size={24} />
                                    ) : kategori.toLowerCase().includes('purchasing') ? (
                                        <ShoppingCart size={24} />
                                    ) : (
                                        <PackageCheck size={24} />
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {kategori}
                                </h3>
                            </div>

                            {/* Grid Dokumen */}
                            <div className="grid gap-4">
                                {groupedData[kategori].map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-4"
                                    >
                                        <div className="shrink-0 text-slate-400 group-hover:text-green-600 transition-colors">
                                            <FileText size={24} />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-700 group-hover:text-green-700 leading-snug">
                                                {item.title}
                                            </h4>
                                            <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Dokumen Publik
                                            </span>
                                        </div>

                                        <a 
                                            href={item.drive_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-green-600 hover:text-white rounded-lg text-sm font-bold border border-slate-200 hover:border-green-600 transition-all"
                                        >
                                            <Download size={16} />
                                            <span>Lihat Dokumen</span>
                                        </a>
                                    </div>
                                ))}
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