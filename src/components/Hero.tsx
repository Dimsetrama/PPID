import React, { ReactNode } from 'react';
import { 
  FileClock, 
  Siren, 
  Archive, 
  FileLock, 
  ShieldAlert 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  // Setup Link WhatsApp
  const waNumber = "6285385066964";
  const waMessage = "Hai admin PPID Sekretariat DPRD Provinsi Jawa Tengah. Mohon kami dapat diberikan informasi.";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  // Daftar Menu Widget Baru
  const widgets = [
    {
      title: "INFORMASI BERKALA",
      href: "/daftar-informasi/berkala",
      icon: <FileClock size={28} />,
      desc: "Laporan & kinerja rutin",
      color: "bg-blue-600"
    },
    {
      title: "INFORMASI SERTAMERTA",
      href: "/daftar-informasi/serta-merta",
      icon: <Siren size={28} />,
      desc: "Informasi darurat & mendesak",
      color: "bg-orange-500"
    },
    {
      title: "INFORMASI SETIAP SAAT",
      href: "/daftar-informasi/setiap-saat",
      icon: <Archive size={28} />,
      desc: "Dokumen arsip & regulasi",
      color: "bg-green-600"
    },
    {
      title: "INFORMASI DIKECUALIKAN",
      href: "/daftar-informasi/dikecualikan",
      icon: <FileLock size={28} />,
      desc: "Daftar informasi terbatas",
      color: "bg-slate-600"
    },
    {
      title: "WHISTLE BLOWER",
      href: "/whistle-blower",
      icon: <ShieldAlert size={28} />,
      desc: "Lapor pelanggaran rahasia",
      color: "bg-red-600"
    }
  ];

  return (
    // FIX: min-h-[100dvh] -> min-h-dvh (Sesuai saran Tailwind)
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center bg-slate-900">
      
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
        <div className="absolute bottom-0 w-full h-3/4 bg-linear-to-t from-green-950/90 via-green-900/50 to-transparent mix-blend-multiply" />
      </div>

      {/* 2. MAIN CONTENT */}
      {/* FIX: Padding bottom disesuaikan untuk mobile & desktop */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center pt-32 pb-10 lg:pt-24 lg:pb-32">
        
        {/* LOGO JATENG */}
        <div className="relative w-24 h-24 md:w-36 md:h-36 mb-6 animate-fade-in-up drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          <Image 
            src="/logo-jateng.png" 
            alt="Logo Jawa Tengah" 
            fill
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-yellow-400 font-bold tracking-[0.2em] text-[10px] md:text-base uppercase mb-4 drop-shadow-md">
          Portal Resmi Pelayanan Informasi
        </h2>
        
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-6xl drop-shadow-2xl font-sans uppercase mb-8">
          PPID Pelaksana Sekretariat <br/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-300 via-white to-green-300">
            DPRD Provinsi Jawa Tengah
          </span>
        </h1>

        <div className="w-16 h-1 md:w-24 md:h-1.5 bg-yellow-500 rounded-full mb-8 md:mb-10 shadow-[0_0_15px_rgba(234,179,8,0.6)]"></div>

        {/* TOMBOL HUBUNGI KAMI */}
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all shadow-[0_10px_20px_rgba(22,163,74,0.4)] hover:shadow-[0_15px_30px_rgba(22,163,74,0.6)] hover:-translate-y-1 active:scale-95 border border-green-400/30 text-sm md:text-base"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="tracking-wide">HUBUNGI KAMI</span>
        </a>

      </div>

      {/* 3. WIDGET CARDS (FIXED FOR MOBILE & DESKTOP) */}
      <div className="relative w-full z-20 px-4 md:px-6 mt-8 -mb-12 lg:absolute lg:bottom-0 lg:translate-y-1/2 lg:mt-0 lg:mb-0">
        <div className="container mx-auto">
          {/* Grid Layout: Responsive Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {widgets.map((item, idx) => (
              <QuickCard 
                key={idx}
                {...item}
              />
            ))}
          </div>
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
  href: string;
};

const QuickCard = ({ icon, title, desc, color, href }: QuickCardProps) => (
  <Link href={href} className="block h-full">
    <div className="bg-white p-5 rounded-xl shadow-2xl hover:shadow-green-900/30 hover:-translate-y-2 transition-all duration-300 border-b-4 border-transparent hover:border-green-500 group cursor-pointer relative overflow-hidden h-full flex flex-col justify-center min-h-[100px] lg:min-h-[110px]">
      
      {/* Icon Background Dekorasi */}
      <div className="absolute -right-4 -bottom-4 text-gray-100 opacity-50 transform rotate-12 scale-[2.5] group-hover:scale-[3] transition-transform duration-500 pointer-events-none">
        {icon}
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className={`${color} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-xs md:text-sm font-extrabold text-gray-800 group-hover:text-green-700 transition-colors uppercase leading-tight mb-1">
            {title}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-500 leading-snug font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default Hero;