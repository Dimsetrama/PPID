import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Download, BookOpen, Info } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type InfoPublikItem = {
  id: string;
  title: string;
  drive_link: string;
};

// --- FUNGSI FETCH ---
async function getInfoPublikData(): Promise<InfoPublikItem[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=991713129&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal fetch');
    const text = await res.text();
    const parsed = Papa.parse<InfoPublikItem>(text, { 
        header: true, 
        skipEmptyLines: true, 
        transformHeader: h => h.trim() 
    });
    return parsed.data.reverse();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default async function DaftarInformasiPublikPage() {
  const data = await getInfoPublikData();

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
            Layanan Informasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Daftar Informasi Publik
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
            
            {/* 1. WIDGET PENJELAS (Simplified) */}
            <div className="bg-white rounded-2xl p-8 border-l-8 border-blue-500 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="shrink-0 p-4 bg-blue-50 rounded-full text-blue-600">
                    <BookOpen size={32} />
                </div>
                <div>
                    {/* Header 'Tentang Dokumen' & 'Penting' sudah dihapus */}
                    <p className="text-slate-600 leading-relaxed text-sm text-justify font-medium">
                        <strong>Daftar Informasi Publik (DIP)</strong> adalah catatan yang berisi seluruh informasi publik yang berada di bawah penguasaan Sekretariat DPRD Provinsi Jawa Tengah. Dokumen ini ditetapkan setiap tahun melalui Keputusan Sekretaris Dewan (Sekwan) untuk mengklasifikasikan informasi mana yang wajib disediakan secara berkala, serta merta, tersedia setiap saat, maupun yang dikecualikan.
                    </p>
                </div>
            </div>

            {/* 2. LIST DOKUMEN SK */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-slate-800">Arsip Penetapan (SK)</h3>
                </div>

                {data.length === 0 ? (
                    <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-2xl">
                        <p className="text-yellow-700 font-medium">Data dokumen belum tersedia.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {data.map((item, index) => (
                            <div 
                                key={index} 
                                className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 flex flex-col md:flex-row gap-4 items-start md:items-center"
                            >
                                {/* Icon Dokumen */}
                                <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <FileText size={24} />
                                </div>

                                {/* Judul & Keterangan */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 group-hover:text-green-700 transition-colors leading-snug">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                                        <Info size={14} />
                                        <span>Dokumen Legal (PDF)</span>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <a 
                                    href={item.drive_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-green-600 hover:text-white rounded-lg text-sm font-bold border border-slate-200 hover:border-green-600 transition-all"
                                >
                                    <Download size={16} />
                                    <span>Lihat</span>
                                </a>
                            </div>
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