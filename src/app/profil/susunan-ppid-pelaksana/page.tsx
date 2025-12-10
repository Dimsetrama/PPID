import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { User, Users, FileText, Download, Shield, Briefcase, Info} from 'lucide-react';

export default function SusunanPPIDPelaksanaPage() {
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
            Profil PPID
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Susunan PPID Pelaksana
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* --- MAIN CONTENT (ORG CHART LAYOUT) --- */}
      <section className="container mx-auto px-6 py-16">
        
        {/* BAGIAN 1: STRUKTUR UTAMA (Vertikal) */}
        <div className="flex flex-col items-center max-w-5xl mx-auto mb-20 relative">
            
            {/* LEVEL 1: ATASAN */}
            <div className="w-full max-w-md z-10">
                <PositionCard 
                    role="Atasan PPID Pelaksana"
                    name="Sekretaris DPRD Provinsi Jawa Tengah"
                    icon={<Shield size={32} />}
                    color="gold"
                    centered
                />
            </div>

            {/* Connector Line */}
            <Connector />

            {/* LEVEL 2: TIM PERTIMBANGAN */}
            <div className="w-full max-w-2xl z-10">
                <PositionCard 
                    role="Tim Pertimbangan"
                    name="Kepala Bagian Keuangan & Kepala Bagian Persidangan"
                    sub="Sekretariat DPRD Provinsi Jawa Tengah"
                    icon={<Users size={28} />}
                    color="green"
                    centered
                />
            </div>

            {/* Connector Line */}
            <Connector />

            {/* LEVEL 3: KETUA (Sekarang di ATAS Sekretaris) */}
            <div className="w-full max-w-md z-10">
                <PositionCard 
                    role="Ketua PPID Pelaksana"
                    name="Kepala Bagian Humas"
                    sub="Sekretariat DPRD Provinsi Jawa Tengah"
                    icon={<User size={28} />}
                    color="blue"
                    centered
                />
            </div>

            {/* Connector Line */}
            <Connector />

            {/* LEVEL 4: SEKRETARIS & WAKIL (Di BAWAH Ketua) */}
            <div className="w-full max-w-xl z-10">
                <PositionCard 
                    role="Sekretaris & Wakil Sekretaris"
                    name="Kepala Bagian Umum & Tim Kerja Informasi dan Dokumentasi"
                    sub="Sekretariat Dewan Perwakilan Rakyat Provinsi Jawa Tengah"
                    icon={<Briefcase size={28} />}
                    color="blue"
                    centered
                />
            </div>

            {/* Connector Line Panjang ke Bawah */}
            <div className="w-px h-16 bg-slate-300"></div>

            {/* Cabang Horizontal untuk Grid (Visual Only) */}
            <div className="w-3/4 h-px bg-slate-300 mb-8 hidden md:block relative">
                 <div className="absolute -top-4 left-0 w-px h-4 bg-slate-300"></div>
                 <div className="absolute -top-4 right-0 w-px h-4 bg-slate-300"></div>
            </div>
            
            {/* LEVEL 5: BIDANG-BIDANG & PIC (Grid) */}
            <div className="w-full">
                <h3 className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8 bg-slate-50 relative z-20 inline-block px-4">
                    Bidang Teknis & Pelayanan
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* Bidang 1 */}
                    <div className="relative">
                        {/* Mobile Connector */}
                        <div className="md:hidden absolute -top-8 left-1/2 w-px h-8 bg-slate-300"></div>
                        <PositionCard 
                            role="Bidang Pelayanan Informasi"
                            name="Koordinator: Kasubbag Rencana Program, Monitoring & Evaluasi"
                            list={["Anggota: Kasubbag Akuntansi", "Anggota: Kasubbag Perbendaharaan"]}
                            icon={<Users size={24} />}
                            color="slate"
                            small
                            alignLeft
                        />
                    </div>

                    {/* Bidang 2 */}
                    <div className="relative">
                        <div className="md:hidden absolute -top-6 left-1/2 w-px h-6 bg-slate-300"></div>
                        <div className="hidden md:block absolute -top-14 left-1/2 w-px h-14 bg-slate-300"></div>
                        <PositionCard 
                            role="Bidang Pengelolaan Informasi"
                            name="Koordinator: Kepala Sub Bagian Protokol"
                            list={["Anggota: Sub Koordinator Publikasi"]}
                            icon={<Users size={24} />}
                            color="slate"
                            small
                            alignLeft
                        />
                    </div>

                    {/* Bidang 3 */}
                    <div className="relative">
                        <div className="md:hidden absolute -top-6 left-1/2 w-px h-6 bg-slate-300"></div>
                        <PositionCard 
                            role="Bidang Pendokumentasian & Arsip"
                            name="Koordinator: Kepala Sub Bagian TU & Kepegawaian"
                            list={["Anggota: Kasubbag Rumah Tangga", "Anggota: Kasubbag Perlengkapan"]}
                            icon={<Users size={24} />}
                            color="slate"
                            small
                            alignLeft
                        />
                    </div>

                    {/* Bidang 4 */}
                    <div className="relative lg:col-start-1 lg:col-end-2"> {/* Posisi kustom agar center di layout 3 kolom */}
                         <div className="md:hidden absolute -top-6 left-1/2 w-px h-6 bg-slate-300"></div>
                        <PositionCard 
                            role="Bidang Pengaduan & Sengketa"
                            name="Koordinator: Tim Kerja Perundang-Undangan"
                            list={["Anggota: Kasubbag Alat Kelengkapan Dewan", "Anggota: Tim Kerja Rapat & Risalah"]}
                            icon={<Users size={24} />}
                            color="slate"
                            small
                            alignLeft
                        />
                    </div>

                    {/* PIC (Level Setara Bidang) */}
                    <div className="relative lg:col-start-2 lg:col-end-3">
                         <div className="md:hidden absolute -top-6 left-1/2 w-px h-6 bg-slate-300"></div>
                        <PositionCard 
                            role="PIC Petugas Pelayanan"
                            name="Bagian Humas"
                            sub="Bertugas sebagai garda depan pelayanan informasi publik."
                            icon={<Info size={24} />}
                            color="slate" // Menggunakan warna slate agar setara, atau ganti 'green' jika ingin beda
                            small
                            centered // PIC biasanya tidak punya list anggota, jadi centered lebih bagus
                        />
                    </div>

                </div>
            </div>

        </div>

        {/* 2. DASAR HUKUM (SK DOCUMENT) */}
        <div className="max-w-4xl mx-auto mt-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col md:flex-row">
                
                {/* Icon Section */}
                <div className="bg-green-50 p-8 flex items-center justify-center md:w-1/4 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                        <FileText size={32} />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-3/4 flex flex-col justify-center">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Dasar Hukum Pembentukan</span>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug">
                        Keputusan Sekretaris Dewan Perwakilan Rakyat Daerah Provinsi Jawa Tengah Nomor 17 Tahun 2024
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Tentang Pembentukan Tim Pelaksana Pejabat Pengelola Informasi dan Dokumentasi Pelaksana pada Sekretariat Dewan Perwakilan Rakyat Daerah Provinsi Jawa Tengah Tahun 2025.
                    </p>
                    
                    <div>
                        <a 
                            href="https://drive.google.com/file/d/1xrk-v2oW0DKgrpAFWHent7xSA4z7yVgL/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-md hover:shadow-green-500/30"
                        >
                            <Download size={16} /> Lihat Dokumen SK
                        </a>
                    </div>
                </div>

            </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}

// --- HELPER COMPONENT: CONNECTOR LINE ---
const Connector = () => (
    <div className="flex flex-col items-center">
        <div className="w-px h-8 bg-slate-300"></div>
        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
        <div className="w-px h-8 bg-slate-300"></div>
    </div>
);

// --- COMPONENT: POSITION CARD (WIDGET) ---
type PositionCardProps = {
    role: string;
    name: string;
    sub?: string;
    list?: string[];
    icon: React.ReactNode;
    color: 'gold' | 'green' | 'blue' | 'slate';
    small?: boolean;
    alignLeft?: boolean;
    centered?: boolean;
}

const PositionCard = ({ role, name, sub, list, icon, color, small, alignLeft, centered }: PositionCardProps) => {
    // Styling logic
    const styles = {
        gold: "border-yellow-400 bg-gradient-to-b from-yellow-50 to-white text-yellow-800 shadow-yellow-100",
        green: "border-green-400 bg-gradient-to-b from-green-50 to-white text-green-800 shadow-green-100",
        blue: "border-blue-400 bg-gradient-to-b from-blue-50 to-white text-blue-800 shadow-blue-100",
        slate: "border-slate-300 bg-white text-slate-700 shadow-slate-100",
    };

    const iconBgStyles = {
        gold: "bg-yellow-100 text-yellow-600 border-2 border-yellow-200",
        green: "bg-green-100 text-green-600 border-2 border-green-200",
        blue: "bg-blue-100 text-blue-600 border-2 border-blue-200",
        slate: "bg-slate-100 text-slate-500 border-2 border-slate-200",
    };

    const alignment = alignLeft ? 'items-start text-left' : 'items-center text-center';
    // Jika centered prop ada, paksa center
    const finalAlign = centered ? 'items-center text-center' : alignment;

    // Font size logic: Bidang Teknis (Slate) dibuat lebih besar
    const roleSize = color === 'slate' ? 'text-sm md:text-base' : (small ? 'text-xs' : 'text-sm');
    const nameSize = color === 'slate' ? 'text-lg md:text-xl' : (small ? 'text-sm' : 'text-lg');

    return (
        <div className={`relative flex flex-col ${finalAlign} border-t-4 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full ${styles[color]} ${small ? 'py-6' : 'py-8'}`}>
            
            {/* Icon Avatar */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 shrink-0 shadow-sm ${iconBgStyles[color]}`}>
                {icon}
            </div>

            {/* Role Title */}
            <h4 className={`font-bold uppercase tracking-wider mb-2 ${roleSize}`}>
                {role}
            </h4>

            {/* Person Name / Position */}
            <h3 className={`font-extrabold leading-tight mb-2 ${nameSize}`}>
                {name}
            </h3>

            {/* Subtext (Optional) */}
            {sub && (
                <p className="text-xs text-slate-500 max-w-[250px] font-medium opacity-80">
                    {sub}
                </p>
            )}

            {/* List Members (Untuk Bidang) */}
            {list && list.length > 0 && (
                <ul className="mt-4 space-y-2 w-full">
                    {list.map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-600 border-t border-slate-200 pt-2 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};