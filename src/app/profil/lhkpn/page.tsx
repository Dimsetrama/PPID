import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Download, ShieldCheck, Info } from 'lucide-react';
import Papa from 'papaparse';

type LHKPNDoc = {
  id: string;
  title: string;
  year: string;
  drive_link: string;
};

async function getLHKPNDocs(): Promise<LHKPNDoc[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=1533744785&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal mengambil data');
    const text = await res.text();
    const parsed = Papa.parse<LHKPNDoc>(text, { header: true, skipEmptyLines: true, transformHeader: (h) => h.trim() });
    return parsed.data.sort((a, b) => Number(b.year) - Number(a.year));
  } catch (error) {
    console.error("Error load sheet:", error);
    return [];
  }
}

export default async function LHKPNPage() {
  const documents = await getLHKPNDocs();

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image src="/berlian.jpg" alt="Background" fill className="object-cover mix-blend-overlay grayscale"/>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">Profil PPID</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">LHKPN</h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-start gap-6">
                <div className="shrink-0 p-4 bg-green-50 rounded-xl text-green-600">
                    <ShieldCheck size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Transparansi Penyelenggara Negara</h2>
                    <p className="text-slate-600 leading-relaxed text-sm text-justify">
                        <strong>Laporan Harta Kekayaan Penyelenggara Negara (LHKPN)</strong> adalah laporan yang wajib disampaikan oleh penyelenggara negara mengenai harta kekayaan yang dimilikinya saat pertama kali menjabat, mutasi, promosi, dan pensiun. Kewajiban lain yang menyertai LHKPN adalah mengumumkan harta kekayaan dan bersedia dilakukan pemeriksaan terhadap kekayaannya.
                    </p>
                    {/* FIX: Menghapus 'inline-block' yang konflik dengan 'flex' */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-100 py-2 px-3 rounded-lg w-fit">
                        <Info size={14} />
                        <span>Sesuai dengan Undang-Undang Nomor 28 Tahun 1999</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-800">Arsip Pengumuman</h3>
            </div>

            {documents.length === 0 ? (
               <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <p className="text-yellow-700 font-medium">Data LHKPN belum tersedia atau sedang dimuat.</p>
               </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                        <div key={index} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="shrink-0 w-16 h-16 bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200 group-hover:bg-green-50 group-hover:border-green-200 transition-colors">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-green-600">Tahun</span>
                                    <span className="text-xl font-black text-slate-700 group-hover:text-green-700">{doc.year}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-green-700 transition-colors line-clamp-2">
                                        {doc.title || `Pengumuman LHKPN Tahun ${doc.year}`}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                        <FileText size={12} />
                                        <span>Dokumen Publik</span>
                                    </div>
                                </div>
                            </div>
                            <a href={doc.drive_link} target="_blank" rel="noopener noreferrer" className="shrink-0 p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm" title="Lihat / Download">
                                <Download size={20} />
                            </a>
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