import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image'; // Sekarang ini akan terpakai
import { FileText, ExternalLink, Briefcase, BookOpen, Activity } from 'lucide-react';
import Papa from 'papaparse';

// --- TIPE DATA ---
type KelembagaanItem = {
  id: string;
  kategori: string;
  title: string;
  drive_link: string;
};

// --- FUNGSI FETCH ---
async function getKelembagaanData(): Promise<KelembagaanItem[]> {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ_Vxl54pK_mpLPLAQD0Pki08JValG_TW_vzkuTn-M4nV6qmDusVmtJI3BgNa-H5bP-l9lz7j3YJgA/pub?gid=2094386112&single=true&output=csv";
  
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Gagal fetch');
    const text = await res.text();
    const parsed = Papa.parse<KelembagaanItem>(text, { 
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

export default async function KelembagaanPage() {
  const allData = await getKelembagaanData();

  // --- LOGIKA PENGELOMPOKAN (GROUPING) ---
  const tugasList = allData.filter(item => 
    item.kategori?.toLowerCase().includes('tugas') || item.kategori?.toLowerCase().includes('wewenang')
  );

  const buktiList = allData.filter(item => 
    item.kategori?.toLowerCase().includes('bukti')
  );

  const substansiList = allData.filter(item => 
    item.kategori?.toLowerCase().includes('substansi') || item.kategori?.toLowerCase().includes('pemahaman')
  );

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* FIX: Gunakan <Image> Next.js agar import tidak error & performa lebih baik */}
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
            Kelembagaan
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Widget 1: PELAKSANAAN TUGAS DAN WEWENANG */}
            <CategoryWidget 
                title="Pelaksanaan Tugas dan Wewenang"
                subtitle="Koordinasi, pembinaan, dan pengelolaan anggaran PPID."
                icon={<Briefcase size={28} />}
                color="blue"
                items={tugasList}
            />

            {/* Widget 2: BUKTI KEGIATAN */}
            <CategoryWidget 
                title="Bukti Kegiatan"
                subtitle="Dokumentasi pelaksanaan layanan informasi publik."
                icon={<Activity size={28} />}
                color="green"
                items={buktiList}
            />

            {/* Widget 3: PEMAHAMAN SUBSTANSI */}
            <CategoryWidget 
                title="Pemahaman Substansi"
                subtitle="Bukti penanganan sengketa dan dokumen hukum terkait."
                icon={<BookOpen size={28} />}
                color="yellow"
                items={substansiList}
            />

        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- HELPER COMPONENT: WIDGET KATEGORI ---
type WidgetProps = {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'yellow';
    items: KelembagaanItem[];
}

const CategoryWidget = ({ title, subtitle, icon, color, items }: WidgetProps) => {
    const styles = {
        blue: "border-blue-200 bg-blue-50/50",
        green: "border-green-200 bg-green-50/50",
        yellow: "border-yellow-200 bg-yellow-50/50",
    };
    
    const headerStyles = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        yellow: "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className={`rounded-3xl border shadow-sm overflow-hidden bg-white ${styles[color]}`}>
            
            <div className="p-6 md:p-8 flex items-start gap-4 border-b border-slate-100 bg-white">
                <div className={`p-3 rounded-2xl shrink-0 ${headerStyles[color]}`}>
                    {icon}
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
                    <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
                </div>
            </div>

            <div className="p-2">
                {items.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 italic">
                        Data untuk kategori ini belum tersedia.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                        {items.map((item, idx) => (
                            <a 
                                key={idx}
                                href={item.drive_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all duration-200"
                            >
                                <div className="mt-0.5 text-slate-400 group-hover:text-slate-600">
                                    <FileText size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-green-700 leading-snug">
                                        {item.title}
                                    </p>
                                </div>
                                <div className="mt-0.5 opacity-0 group-hover:opacity-100 text-green-500 transition-opacity">
                                    <ExternalLink size={16} />
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};