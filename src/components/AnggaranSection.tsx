import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PieChart, 
  BarChart4, 
  Landmark, 
  FileSpreadsheet, 
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

const AnggaranSection = () => {
  const items = [
    {
      label: "NERACA",
      query: "NERACA",
      icon: <PieChart size={32} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "hover:border-blue-300"
    },
    {
      label: "ASET INVENTARIS",
      query: "ASET INVENTARIS PERBENDAHARAAN",
      icon: <Landmark size={32} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "hover:border-emerald-300"
    },
    {
      label: "SUMBER ANGGARAN",
      query: "ANGGARAN",
      icon: <TrendingUp size={32} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "hover:border-purple-300"
    },
    {
      label: "D P A",
      subLabel: "(Dokumen Pelaksana Anggaran)",
      query: "DOKUMEN PELAKSANA ANGGARAN",
      icon: <FileSpreadsheet size={32} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "hover:border-orange-300"
    }
  ];

  return (
    // FIX: Background disamakan dengan PermohonanSection (Radial Pattern)
    <section className="relative py-24 overflow-hidden bg-linear-to-tl from-white via-blue-50/30 to-green-50/30">
      
      {/* 1. DEKORASI BACKGROUND (Sama persis dengan PermohonanSection) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Dekorasi Tambahan Subtle */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-100 rounded-full blur-[100px] opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* KOLOM KANAN (GAMBAR KARAKTER) */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start relative group">
            
            {/* Dekorasi Belakang Gambar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0">
               <div className="absolute inset-0 bg-linear-to-tr from-green-100/50 to-blue-100/50 rounded-full blur-2xl"></div>
            </div>

            {/* Gambar Karakter */}
            <div className="relative z-10 w-full max-w-sm drop-shadow-2xl transition-transform duration-500 hover:scale-105">
              <Image 
                src="/karakter.png"
                alt="Analisis Anggaran"
                width={400}
                height={550}
                className="object-contain" // Hapus animate-float jika tidak diinginkan
                priority
              />

              {/* Floating Card: Transparansi (FIX: Hapus animate-pulse) */}
              <div className="absolute bottom-20 -left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-green-100 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-sm font-bold text-slate-700">100% Transparan</span>
              </div>
            </div>
          </div>

          {/* KOLOM KIRI (KONTEN & GRID) */}
          <div className="w-full lg:w-7/12 space-y-10">
            
            {/* Header Text */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                 <BarChart4 size={14} /> Data Keuangan
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                Transparansi Anggaran <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500">
                  & Kinerja Keuangan
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Akses informasi mendetail mengenai penggunaan anggaran, aset daerah, neraca keuangan, serta dokumen pelaksanaan anggaran DPRD Provinsi Jawa Tengah secara terbuka.
              </p>
            </div>

            {/* Grid Menu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {items.map((item, index) => (
                <Link 
                  key={index} 
                  href={`/daftar-informasi/berkala?q=${encodeURIComponent(item.query)}`}
                  className={`group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${item.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 relative overflow-hidden`}
                >
                  {/* Icon Box */}
                  <div className={`shrink-0 w-16 h-16 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {item.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-700 text-lg mb-1 group-hover:text-green-700 transition-colors">
                      {item.label}
                    </h3>
                    {item.subLabel && (
                        <p className="text-xs text-slate-400 font-medium mb-1">{item.subLabel}</p>
                    )}
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lihat Data <ArrowUpRight size={12} />
                    </span>
                  </div>

                  {/* Dekorasi Hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-300 ${item.bgColor}`}></div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AnggaranSection;