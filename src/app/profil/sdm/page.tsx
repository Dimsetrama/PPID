import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// FIX: Hapus 'Download' dari import karena tidak dipakai
import { FileText, ImageIcon, ExternalLink } from 'lucide-react';
import Papa from 'papaparse';

type SDMItem = {
  id: string;
  title: string;
  image_link: string; 
  drive_link: string; 
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
  return `https://wsrv.nl/?url=${encodeURIComponent(googleLink)}`; 
};

async function getSDMData(): Promise<SDMItem[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1244492532&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal fetch');
    const text = await res.text();
    const parsed = Papa.parse<SDMItem>(text, { header: true, skipEmptyLines: true, transformHeader: h => h.trim() });
    return parsed.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default async function SDMPage() {
  const data = await getSDMData();

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/berlian.jpg" alt="Background" className="w-full h-full object-cover mix-blend-overlay grayscale" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">Profil PPID</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">SDM yang Tersedia</h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
            
            {data.length === 0 && (
               <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <p className="text-yellow-700 font-medium">Data SDM belum tersedia.</p>
               </div>
            )}

            {data.map((item, index) => {
                const isImage = item.image_link && item.image_link.trim() !== '';
                const isDoc = item.drive_link && item.drive_link.trim() !== '';
                const imgUrl = isImage ? getDriveImgUrl(item.image_link) : null;

                return (
                    <div key={index} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className={`p-3 rounded-xl ${isImage ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {isImage ? <ImageIcon size={24} /> : <FileText size={24} />}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
                        </div>

                        {/* KONTEN GAMBAR */}
                        {isImage && imgUrl && (
                            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={imgUrl} 
                                    alt={item.title}
                                    className="w-full h-auto object-contain"
                                    referrerPolicy="no-referrer"
                                />
                                {/* FIX: Teks keterangan 'Gambar preview...' sudah DIHAPUS */}
                            </div>
                        )}

                        {/* KONTEN DOKUMEN */}
                        {isDoc && (
                            <div className="bg-green-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-green-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm md:text-base">Dokumen Lampiran</p>
                                    </div>
                                </div>
                                
                                <a href={item.drive_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg w-full md:w-auto justify-center">
                                    <ExternalLink size={16} /> Buka Dokumen
                                </a>
                            </div>
                        )}

                        {!isImage && !isDoc && (
                            <div className="text-center py-4 text-slate-400 text-sm italic bg-slate-50 rounded-lg">Tidak ada lampiran file atau gambar.</div>
                        )}
                    </div>
                );
            })}
        </div>
      </section>
      <Footer />
    </main>
  );
}