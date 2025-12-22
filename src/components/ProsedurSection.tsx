'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Wallet, 
  List, 
  ShieldCheck, 
  FileBox, 
  FileText, 
  Scale,
  ArrowRight
} from 'lucide-react';

const ProsedurSection = () => {
  const menus = [
    {
      title: "SOP Pelayanan Publik",
      href: "/standar-pelayanan/prosedur-pelayanan",
      icon: <BookOpen size={24} />,
      color: "bg-blue-100 text-blue-600",
      border: "hover:border-blue-400",
      isExternal: false
    },
    {
      title: "Waktu Pelayanan",
      href: "/standar-pelayanan/waktu-pelayanan",
      icon: <Clock size={24} />,
      color: "bg-orange-100 text-orange-600",
      border: "hover:border-orange-400",
      isExternal: false
    },
    {
      title: "Biaya Pelayanan",
      href: "/standar-pelayanan/biaya-pelayanan",
      icon: <Wallet size={24} />,
      color: "bg-green-100 text-green-600",
      border: "hover:border-green-400",
      isExternal: false
    },
    {
      title: "Daftar Informasi Publik",
      href: "/daftar-informasi/berkala", 
      icon: <List size={24} />,
      color: "bg-purple-100 text-purple-600",
      border: "hover:border-purple-400",
      isExternal: false
    },
    {
      title: "SOP PPID",
      href: "/standar-pelayanan/prosedur-pelayanan", 
      icon: <ShieldCheck size={24} />,
      color: "bg-red-100 text-red-600",
      border: "hover:border-red-400",
      isExternal: false
    },
    {
      title: "SOP Dokumentasi Info",
      href: "https://drive.google.com/file/d/19RdwzfJrMFEHCWfhMaE2oLE7fZe91mxb/view",
      icon: <FileBox size={24} />,
      color: "bg-teal-100 text-teal-600",
      border: "hover:border-teal-400",
      isExternal: true
    },
    {
      title: "SOP Penyusunan DIP",
      href: "https://drive.google.com/file/d/1pwuWRnveNjDFf2DLpfpHIOdiPALCTLEm/view",
      icon: <FileText size={24} />,
      color: "bg-indigo-100 text-indigo-600",
      border: "hover:border-indigo-400",
      isExternal: true
    },
    {
      title: "SOP Uji Konsekuensi",
      href: "https://drive.google.com/file/d/1vcRRPeN6bSOQ6QN5Ocgt3WDQsFUnYNnc/view",
      icon: <Scale size={24} />,
      color: "bg-pink-100 text-pink-600",
      border: "hover:border-pink-400",
      isExternal: true
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-emerald-50/60">
      
      {/* 1. DEKORASI BACKGROUND (Tema Hijau/Kuning Estetik) */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-100/40 via-yellow-50/40 to-emerald-100/40 z-0"></div>
      
      {/* Pola Dots */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#059669 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Blobs Abstract */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200 rounded-full blur-[120px] opacity-30 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-300 rounded-full blur-[120px] opacity-30 -translate-x-1/2 translate-y-1/3"></div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* KOLOM KIRI: KONTEN & GRID MENU */}
          <div className="w-full lg:w-7/12 space-y-10 order-2 lg:order-1">
            
            {/* Header Text */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                 <BookOpen size={14} /> Standar Operasional
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                Prosedur Pelayanan <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-yellow-500">
                  Informasi Publik
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Panduan lengkap, standar biaya, waktu, dan SOP teknis untuk menjamin transparansi dan akuntabilitas layanan informasi di DPRD Jawa Tengah.
              </p>
            </div>

            {/* Grid Menu Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menus.map((item, idx) => {
                // Wrapper Link logic
                const CardContent = (
                  <div className={`flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group`}>
                    <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-700 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-medium">
                        {item.isExternal ? 'Buka Dokumen' : 'Lihat Halaman'} 
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </div>
                );

                return item.isExternal ? (
                  <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {CardContent}
                  </a>
                ) : (
                  <Link key={idx} href={item.href} className="block h-full">
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          </div>


          {/* KOLOM KANAN: KARAKTER */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-center relative group order-1 lg:order-2">
             
             {/* Lingkaran Dekorasi Belakang Karakter */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
                <div className="absolute inset-0 bg-linear-to-tr from-yellow-200/40 to-emerald-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 bg-white/30 rounded-full blur-2xl"></div>
             </div>

             {/* Gambar Karakter */}
             <div className="relative z-10 w-full max-w-sm drop-shadow-2xl transition-transform duration-500 hover:scale-105">
                <Image 
                  src="/karakter2.png"
                  alt="Petugas PPID"
                  width={400}
                  height={600}
                  className="object-contain"
                  priority
                />

                {/* Floating Badge Kiri */}
                <div className="absolute top-20 -left-14 bg-white p-3 rounded-2xl shadow-xl border border-emerald-100 animate-bounce delay-1000 hidden md:block">
                   <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Standar</p>
                        <p className="text-sm font-bold text-slate-800">Terverifikasi</p>
                      </div>
                   </div>
                </div>

                {/* Floating Badge Kanan (FIXED: hidden md:flex) */}
                <div className="absolute bottom-32 -right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-yellow-100 hidden md:flex items-center gap-2 animate-pulse">
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <span className="text-xs font-bold text-slate-600">Pelayanan Prima</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProsedurSection;