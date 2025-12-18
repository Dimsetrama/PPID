'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MessageCircle, Megaphone, 
  ArrowRight, MessageSquare
} from 'lucide-react';

export default function AduanPelayananPage() {
  const channels = [
    {
      id: "laporgub",
      title: "LaporGub!",
      desc: "Kanal aduan resmi Pemerintah Provinsi Jawa Tengah. Laporkan masalah infrastruktur dan pelayanan publik.",
      link: "https://laporgub.jatengprov.go.id/",
      color: "bg-red-600",
      lightColor: "bg-red-50",
      textColor: "text-red-600",
      icon: <Megaphone size={64} />,
      label: "Layanan Publik Jateng",
      logoSrc: "/logos/laporgub.png" 
    },
    {
      id: "sp4n",
      title: "SP4N Lapor!",
      desc: "Layanan Aspirasi dan Pengaduan Online Rakyat. Kanal pengaduan nasional lintas instansi.",
      link: "https://lapor.go.id/",
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      label: "Pengaduan Nasional",
      logoSrc: "/logos/sp4n.png"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Center",
      desc: "Chat interaktif untuk pertanyaan umum seputar PPID atau konfirmasi status permohonan.",
      link: "https://wa.link/tlj6ai",
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      icon: <MessageCircle size={64} />,
      label: "Chat Interaktif",
      logoSrc: "/logos/whatsapp.png"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-indigo-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src="/berlian.jpg" 
                alt="Background" 
                className="w-full h-full object-cover mix-blend-overlay grayscale absolute inset-0" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-yellow-900/30 rounded-full py-1 px-3 w-fit mx-auto">
            Suara Rakyat
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Kanal Aduan & Aspirasi
          </h1>
          <p className="text-indigo-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Sampaikan kritik, saran, dan laporan Anda melalui saluran resmi yang tersedia. Partisipasi Anda adalah kunci perbaikan kualitas pelayanan publik di Jawa Tengah.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="relative py-16">
        
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 translate-x-1/3 translate-y-1/3 -z-10"></div>

        <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* FEATURED CARD: WADUL DEWAN (Tanpa Widget, Logo Besar) */}
                <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageSquare size={200} />
                    </div>
                    {/* FIX: bg-gradient-to-b -> bg-linear-to-b */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-linear-to-b from-orange-400 to-orange-600"></div>
                    
                    <div className="flex flex-col md:flex-row items-center p-8 md:p-14 gap-10">
                        {/* Area Logo Wadul Dewan - Besar & Tanpa Border */}
                        <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 relative flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/logos/wadul-dewan.jpeg" 
                                alt="Logo Wadul Dewan" 
                                className="w-full h-full object-contain relative z-10 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            {/* Fallback Icon (Absolute Center) - FIX: -z-0 -> z-0 */}
                            <div className="absolute inset-0 flex items-center justify-center text-orange-200 z-0">
                                <MessageSquare size={120} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                Saluran Khusus DPRD
                            </div>
                            <h2 className="text-4xl font-extrabold text-slate-800">Wadul Dewan</h2>
                            <p className="text-slate-600 leading-relaxed text-lg md:text-xl">
                                Saluran aspirasi langsung kepada wakil rakyat Anda. Sampaikan masukan kebijakan, usulan Perda, atau kritik konstruktif untuk kinerja DPRD Provinsi Jawa Tengah.
                            </p>
                            <div className="pt-4">
                                <a 
                                    href="https://dprd.jatengprov.go.id/waduldewan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-400 transition-all transform hover:scale-105"
                                >
                                    Sampaikan Aspirasi <ArrowRight size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GRID CHANNELS (Lainnya - Logo Besar Tanpa Kotak) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {channels.map((item, idx) => (
                        <a 
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                        >
                            {/* Header Warna Tipis */}
                            <div className={`h-1.5 w-full ${item.color}`}></div>
                            
                            <div className="p-8 flex-1 flex flex-col items-center text-center">
                                {/* LOGO AREA - Besar & Langsung */}
                                <div className="mb-6 w-full h-32 relative flex items-center justify-center">
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                     <img 
                                        src={item.logoSrc} 
                                        alt={`Logo ${item.title}`} 
                                        className="h-full w-auto object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    {/* Fallback Icon - FIX: -z-0 -> z-0 */}
                                    <div className={`absolute inset-0 flex items-center justify-center opacity-20 ${item.textColor} z-0`}>
                                        {item.icon}
                                    </div>
                                </div>

                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                    {item.label}
                                </span>
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-4 group-hover:text-indigo-700 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                            </div>
                            
                            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex justify-center group-hover:bg-slate-100 transition-colors">
                                <span className={`text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all ${item.textColor}`}>
                                    Buka Layanan <ArrowRight size={18} />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}