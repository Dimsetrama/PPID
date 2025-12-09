import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SupportedBy = () => {
  const links = [
    { 
      name: "", 
      href: "https://emonev.jatengprov.go.id/", 
      logo: "/logos/emonev.png" 
    },
    { 
      name: "", 
      href: "https://laporgub.jatengprov.go.id/", 
      logo: "/logos/laporgub.png" 
    },
    { 
      name: "", 
      href: "https://web.dpmptsp.jatengprov.go.id/", 
      logo: "/logos/ptsp.jpg" 
    },
    { 
      name: "", 
      href: "https://hargajateng.org/", 
      logo: "/logos/sihati.png" 
    },
    { 
      name: "", 
      href: "https://elhkpn.kpk.go.id/portal/user/login#", 
      logo: "/logos/elhkpn.jpg" 
    },
    { 
      name: "", 
      href: "https://spse.inaproc.id/jatengprov", 
      logo: "/logos/lpse.png" 
    },
    { 
      name: "", 
      href: "https://data.jatengprov.go.id/organization/sekretariat-dprd-provinsi-jawa-tengah", 
      logo: "/logos/portaldata.png" 
    },
    { 
      name: "", 
      href: "https://sirup.inaproc.id/sirup/loginctr/index", 
      logo: "/logos/sirup.png" 
    },
  ];

  return (
    // FIX: Mengurangi py-24 jadi py-12 agar tidak terlalu lebar/tinggi
    // BACKGROUND: Menambahkan gradasi halus White -> Green/Yellow Tint
    <section className="relative py-12 bg-linear-to-b from-white via-green-50/40 to-yellow-50/40 border-t border-slate-200 overflow-hidden">
      
      {/* 1. TOP BORDER: Aksen Hijau Kuning */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-green-600 via-yellow-400 to-green-600"></div>

      {/* 2. DEKORASI BACKGROUND (Lebih Hidup) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      
      {/* Blob Kuning di Kanan Bawah */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-200 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      {/* Blob Hijau di Kiri Atas */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER (Lebih Simpel & Rapi) */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Link Terkait
          </h2>
          {/* Garis bawah dekoratif */}
          <div className="flex justify-center gap-2 mt-3">
            <div className="w-12 h-1 bg-green-500 rounded-full"></div>
            <div className="w-4 h-1 bg-yellow-500 rounded-full"></div>
          </div>
        </div>

        {/* GRID LOGO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {links.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm rounded-xl p-4 flex items-center justify-center h-28 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-300 overflow-hidden"
            >
              {/* Efek Hover Glow Background */}
              <div className="absolute inset-0 bg-linear-to-br from-green-50/50 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* LOGO CONTAINER */}
              <div className="relative w-full h-full filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-out p-2">
                <Image 
                  src={item.logo} 
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback Text */}
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300 group-hover:text-green-700 text-center z-[-1]">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SupportedBy;