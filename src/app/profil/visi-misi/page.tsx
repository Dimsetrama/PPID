import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Target, Lightbulb, Briefcase, TrendingUp, Users, FileText, ShieldCheck } from 'lucide-react';

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-green-950 pt-36 pb-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
            <Image 
                src="/berlian.jpg" 
                alt="Background Pattern" 
                fill 
                className="object-cover mix-blend-overlay grayscale"
                priority
            />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-green-900/0 via-green-900/50 to-slate-50"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* FIX: Teks diganti menjadi Profil PPID agar seragam */}
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 font-bold tracking-[0.2em] text-xs uppercase mb-4 animate-fade-in-up backdrop-blur-sm">
            Profil PPID
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-up drop-shadow-lg">
            Visi & Misi
          </h1>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]"></div>
        </div>
      </div>

      {/* --- SECTION 1: VISI (Glowing Card) --- */}
      <section className="relative -mt-16 mb-24 px-6 z-20">
        <div className="container mx-auto max-w-5xl">
          {/* Efek Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-green-400/30 rounded-[3rem] blur-3xl -z-10"></div>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-14 shadow-2xl border border-white/50 relative overflow-hidden text-center group">
            
            {/* Dekorasi Garis Atas */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-green-500 via-yellow-400 to-green-500"></div>
            
            {/* Background Icon Watermark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] text-green-800 transition-transform duration-700 group-hover:scale-110">
                <Lightbulb size={400} />
            </div>

            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <Target size={16} /> Visi Kami
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-snug font-serif relative z-10">
              <span className="text-green-200 absolute -top-6 -left-4 text-6xl opacity-50">&ldquo;</span>
              Terwujudnya pelayanan informasi yang <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-500">transparan</span> dan <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-500">akuntabel</span> untuk memenuhi hak pemohon informasi sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.
              <span className="text-green-200 absolute -bottom-8 -right-4 text-6xl opacity-50 rotate-180">&ldquo;</span>
            </h2>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MISI --- */}
      <section className="relative py-12">
        {/* Dekorasi Background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-20 left-0 w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-200 rounded-full blur-[120px] opacity-30 translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-green-600 font-bold tracking-widest text-xs uppercase bg-green-50 px-3 py-1 rounded-md">Langkah Strategis</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-3">Misi PPID</h2>
                <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Empat pilar utama dalam mewujudkan layanan informasi yang prima.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <MisiCard 
                    icon={<TrendingUp size={32} />}
                    title="Layanan Cepat & Mudah"
                    desc="Meningkatkan sistem penyediaan layanan informasi secara cepat, mudah, dan wajar sesuai dengan petunjuk teknis standar layanan informasi publik."
                    number="01"
                    color="green"
                />
                <MisiCard 
                    icon={<FileText size={32} />}
                    title="Efisiensi Sarana"
                    desc="Meningkatkan sarana-prasarana dalam rangka efisiensi dan efektivitas layanan informasi publik bagi masyarakat."
                    number="02"
                    color="yellow"
                />
                <MisiCard 
                    icon={<Users size={32} />}
                    title="Pengelolaan Modern"
                    desc="Meningkatkan pengelolaan informasi dan dokumentasi secara baik, efisien, mudah diakses, dan bersifat desentralisasi."
                    number="03"
                    color="green"
                />
                <MisiCard 
                    icon={<ShieldCheck size={32} />}
                    title="Kompetensi SDM"
                    desc="Meningkatkan kompetensi dalam bidang penyimpanan, pengelolaan, pelayanan, dan antisipasi dalam penyelesaian sengketa informasi."
                    number="04"
                    color="yellow"
                />
            </div>
        </div>
      </section>

      {/* --- SECTION 3: TUGAS & FUNGSI --- */}
      <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                
                {/* KIRI: Tugas Pokok */}
                <div className="w-full lg:w-5/12 sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-yellow-500 rounded-xl text-white shadow-lg shadow-yellow-500/30 transform -rotate-3">
                            <Briefcase size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-800">Tugas Pokok</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sekretaris Dewan</p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2"></div>
                        
                        <p className="text-slate-600 leading-relaxed text-justify relative z-10 font-medium">
                            &quot;Mempunyai tugas pokok menyelenggarakan administrasi kesekretariatan, administrasi keuangan, 
                            mendukung pelaksanaan tugas dan fungsi DPRD, serta menyediakan dan mengkoordinasikan tenaga ahli DPRD 
                            sesuai dengan kemampuan keuangan daerah.&quot;
                        </p>
                    </div>
                </div>

                {/* KANAN: Daftar Fungsi */}
                <div className="w-full lg:w-7/12">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-800">
                            Fungsi Utama
                        </h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">4 Poin Utama</span>
                    </div>
                    
                    <div className="space-y-4">
                        <FungsiItem 
                            title="Administrasi Kesekretariatan"
                            desc="Penyelenggaraan urusan ketatausahaan dan kesekretariatan DPRD secara tertib dan akuntabel."
                            index={1}
                        />
                        <FungsiItem 
                            title="Administrasi Keuangan"
                            desc="Penyelenggaraan pengelolaan administrasi keuangan DPRD yang transparan."
                            index={2}
                        />
                        <FungsiItem 
                            title="Fasilitasi Rapat"
                            desc="Penyelenggaraan dan fasilitasi rapat-rapat DPRD untuk mendukung fungsi legislasi, anggaran, dan pengawasan."
                            index={3}
                        />
                        <FungsiItem 
                            title="Koordinasi Tenaga Ahli"
                            desc="Penyediaan dan pengkoordinasian tenaga ahli yang diperlukan oleh DPRD untuk menunjang kinerja dewan."
                            index={4}
                        />
                    </div>
                </div>

            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

const MisiCard = ({ icon, title, desc, number, color }: { icon: React.ReactNode, title: string, desc: string, number: string, color: 'green' | 'yellow' }) => {
    const colorClass = color === 'green' ? 'group-hover:border-green-400' : 'group-hover:border-yellow-400';
    const iconBg = color === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-600' : 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500';

    return (
        <div className={`group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden ${colorClass}`}>
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color === 'green' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm ${iconBg} group-hover:text-white`}>
                    {icon}
                </div>
                <div className="text-5xl font-black text-slate-100 select-none font-serif">{number}</div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-green-700 transition-colors relative z-10">
                {title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm relative z-10">
                {desc}
            </p>
        </div>
    );
};

const FungsiItem = ({ title, desc, index }: { title: string, desc: string, index: number }) => (
    <div className="group flex gap-6 p-6 rounded-2xl border border-transparent hover:border-green-100 hover:bg-green-50/30 transition-all duration-300">
        <div className="shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-green-100 flex items-center justify-center text-green-600 font-bold shadow-sm group-hover:scale-110 group-hover:border-green-500 transition-all duration-300">
                {index}
            </div>
        </div>
        <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-green-700 transition-colors">{title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);