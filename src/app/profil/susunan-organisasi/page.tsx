import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Network, Download } from 'lucide-react'; // Hapus ZoomIn
import Papa from 'papaparse';

// --- TIPE DATA ---
type StrukturData = {
  id: string;
  title: string;
  image_link: string;
};

// --- FUNGSI MAGIC V6: PROXY BYPASS (TETAP DIPAKAI KARENA SUDAH BERHASIL) ---
const getDriveDirectLink = (url: string) => {
  if (!url) return null;
  
  // Fitur cadangan: Cek jika link file lokal
  if (url.startsWith('/') || url.startsWith('http://localhost')) return url;

  let id = '';
  const match1 = url.match(/\/d\/(.+?)\//);
  if (match1) id = match1[1];
  
  const match2 = url.match(/id=(.+?)(&|$)/);
  if (match2) id = match2[1];

  if (!id) return null;

  // Gunakan Proxy wsrv.nl agar gambar muncul (Solusi Ampuh)
  const googleLink = `https://drive.google.com/uc?id=${id}`;
  return `https://wsrv.nl/?url=${encodeURIComponent(googleLink)}`;
};

// --- FUNGSI FETCH ---
async function getStrukturData(): Promise<StrukturData[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=669312861&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal fetch');
    const text = await res.text();
    const parsed = Papa.parse<StrukturData>(text, { 
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

export default async function SusunanOrganisasiPage() {
  const data = await getStrukturData();
  const struktur = data[0]; 
  const imageUrl = struktur ? getDriveDirectLink(struktur.image_link) : null;

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
            Profil PPID
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Susunan Organisasi
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16">
        
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            
            {/* Header Card */}
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                        <Network size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Bagan Struktur</h2>
                        <p className="text-sm text-slate-500">Sekretariat DPRD Provinsi Jawa Tengah</p>
                    </div>
                </div>
                
                {imageUrl && (
                    <a 
                        href={imageUrl} 
                        target="_blank" 
                        download
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30"
                    >
                        <Download size={16} /> Unduh Bagan
                    </a>
                )}
            </div>

            {/* Area Gambar */}
            <div className="p-8 md:p-12 bg-slate-50 flex justify-center">
                {imageUrl ? (
                    <div className="relative w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden border-8 border-white">
                        
                        <div className="relative w-full">
                             {/* Gambar tampil bersih tanpa efek hover zoom */}
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img 
                                src={imageUrl}
                                alt="Struktur Organisasi"
                                className="w-full h-auto object-contain bg-white"
                                referrerPolicy="no-referrer"
                             />
                        </div>

                        {/* Fitur Zoom sudah dihapus */}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                        <p className="text-slate-400 font-medium">Memuat bagan struktur...</p>
                        <p className="text-xs text-slate-300 mt-2">Pastikan link gambar di spreadsheet sudah benar.</p>
                    </div>
                )}
            </div>

            {/* Keterangan Footer sudah dihapus */}

        </div>
      </section>

      <Footer />
    </main>
  );
}