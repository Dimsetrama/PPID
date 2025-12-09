import React, { ReactNode } from 'react';
import { FileText, ClipboardList, ShieldAlert, BookOpen, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    // FIX: Gunakan min-h-screen
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-slate-900">
      
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/gedungberlian.jpg" 
          alt="Gedung Berlian"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* FIX: Gradient syntax v4 */}
        <div className="absolute bottom-0 w-full h-3/4 bg-linear-to-t from-green-950/90 via-green-900/50 to-transparent mix-blend-multiply" />
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center pt-24 pb-32">
        
        {/* LOGO JATENG */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6 animate-fade-in-up drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          <Image 
            src="/logo-jateng.png" 
            alt="Logo Jawa Tengah" 
            fill
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-yellow-400 font-bold tracking-[0.2em] text-xs md:text-base uppercase mb-4 drop-shadow-md">
          Portal Resmi Pelayanan Informasi
        </h2>
        
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-6xl drop-shadow-2xl font-sans uppercase mb-8">
          PPID Pelaksana Sekretariat <br/>
          {/* FIX: Gradient Text v4 */}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-300 via-white to-green-300">
            DPRD Provinsi Jawa Tengah
          </span>
        </h1>

        <div className="w-24 h-1.5 bg-yellow-500 rounded-full mb-10 shadow-[0_0_15px_rgba(234,179,8,0.6)]"></div>

        <a 
          href="https://wa.me/62812345678" 
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_20px_rgba(22,163,74,0.4)] hover:shadow-[0_15px_30px_rgba(22,163,74,0.6)] hover:-translate-y-1 active:scale-95 border border-green-400/30"
        >
          <MessageCircle size={22} className="fill-white text-green-600" />
          <span className="tracking-wide">HUBUNGI KAMI</span>
        </a>

      </div>

      {/* 3. FLOATING CARDS */}
      <div className="absolute bottom-0 translate-y-1/2 w-full z-20 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <QuickCard 
            icon={<FileText size={28} />} 
            title="Permohonan Informasi" 
            desc="Layanan permohonan data publik online." 
            color="bg-green-600"
          />
          <QuickCard 
            icon={<ClipboardList size={28} />} 
            title="Cek Status Tiket" 
            desc="Pantau progres permohonan Anda." 
            color="bg-blue-600"
          />
          <QuickCard 
            icon={<ShieldAlert size={28} />} 
            title="Whistle Blower" 
            desc="Lapor pelanggaran secara rahasia." 
            color="bg-red-600"
          />
          <QuickCard 
            icon={<BookOpen size={28} />} 
            title="Peraturan & SOP" 
            desc="Regulasi dan standar layanan PPID." 
            color="bg-yellow-500"
          />
        </div>
      </div>

    </div>
  );
};

type QuickCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  color: string;
};

const QuickCard = ({ icon, title, desc, color }: QuickCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-green-900/30 hover:-translate-y-2 transition-all duration-300 border-b-4 border-transparent hover:border-green-500 group cursor-pointer relative overflow-hidden h-full flex flex-col justify-center">
    <div className="absolute -right-4 -bottom-4 text-gray-100 opacity-50 transform rotate-12 scale-[2.5] group-hover:scale-[3] transition-transform duration-500 pointer-events-none">
      {icon}
    </div>
    
    <div className="flex items-center gap-4 relative z-10">
      <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-green-700 transition-colors uppercase leading-tight mb-1.5">
          {title}
        </h3>
        <p className="text-xs text-gray-500 leading-snug">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default Hero;