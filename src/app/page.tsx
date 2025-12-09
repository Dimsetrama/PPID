'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PermohonanSection from '@/components/PermohonanSection';
import { Users, FileCheck, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />
      <Hero />
      
      {/* Spacer */}
      <div className="h-40 bg-slate-50"></div>

{/* SECTION 1: MAKLUMAT PELAYANAN (Fixed Syntax) */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-slate-100 overflow-hidden group">
          
          {/* 1. DEKORASI: Gradient Line (Syntax Fixed: bg-linear-to-r) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-green-600 via-yellow-400 to-green-600"></div>

          {/* 2. DEKORASI: Pattern Halus */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          {/* 3. DEKORASI: Watermark Logo Jateng */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 grayscale rotate-12 pointer-events-none">
             <Image 
               src="/logo-jateng.png" 
               alt="Watermark" 
               fill
               className="object-contain"
             />
          </div>

          <div className="relative z-10 px-8 py-12 md:p-16 text-center max-w-5xl mx-auto">
            
            {/* Judul Utama */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-12 font-serif tracking-tight">
              MAKLUMAT PELAYANAN
            </h2>
            
            {/* Box Teks Utama */}
            <div className="relative">
              {/* Tanda Kutip Besar */}
              <div className="absolute -top-8 -left-2 md:-left-6 text-7xl text-green-300 font-serif leading-none">“</div>
              
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium italic px-6 md:px-12 relative z-10">
                &quot;Dengan ini kami sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan, 
                dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan 
                perundang-undangan yang berlaku.&quot;
              </p>
              
              {/* Tanda Kutip Penutup */}
              <div className="absolute -bottom-10 -right-2 md:-right-6 text-7xl text-green-300 font-serif leading-none rotate-180">“</div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-2">
              <div className="h-1.5 w-24 bg-green-200 rounded-full mb-3"></div>
              <p className="font-bold text-slate-800 uppercase tracking-wide text-sm md:text-base">
                PPID Pelaksana Sekretariat DPRD
              </p>
              <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider">Provinsi Jawa Tengah</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PERMOHONAN INFORMASI */}
      <PermohonanSection />

      {/* SECTION 3: STATISTIK PENGUNJUNG (Visual Only - Simplified) */}
      <section className="relative py-16 overflow-hidden bg-green-900 text-white mt-10">
        
        {/* BACKGROUND IMAGE: BERLIAN.JPG */}
        <div className="absolute inset-0 z-0 opacity-20">
           <Image 
             src="/berlian.jpg" 
             alt="Background Pattern"
             fill
             className="object-cover mix-blend-overlay grayscale"
           />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-green-900/90 via-green-800/90 to-green-900/90 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* HEADER STATISTIK (Disederhanakan & Dikecilkan) */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-500/20 p-2 rounded-lg border border-green-400/30 backdrop-blur-sm">
              <TrendingUp size={24} className="text-green-300" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Statistik Pengunjung
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KARTU 1: HARI INI */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <Clock size={20} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                46
              </div>
              <div className="text-sm text-gray-400 font-medium">Pengunjung Hari Ini</div>
            </div>

            {/* KARTU 2: BULAN INI */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-300">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                334
              </div>
              <div className="text-sm text-gray-400 font-medium">Pengunjung Bulan Ini</div>
            </div>

            {/* KARTU 3: TOTAL (Clean Look) */}
            <div className="group relative bg-linear-to-br from-green-600 to-green-800 rounded-2xl p-6 shadow-xl border border-green-400/30 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white">
                  <FileCheck size={20} />
                </div>
                {/* Badge TOTAL dihapus disini */}
              </div>
              
              <div className="text-4xl font-extrabold text-white mb-1 tracking-tight relative z-10 tabular-nums">
                249.511
              </div>
              <div className="text-sm text-green-100 font-medium relative z-10 opacity-90">Total Kunjungan</div>
            </div>

          </div>

          {/* PARTNER LOGO (Opsional: Bisa dihapus jika tidak diinginkan) */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] uppercase tracking-[0.2em] text-green-300 mb-6">Didukung Oleh</p>
            <div className="flex flex-wrap justify-center gap-8 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholder Logo */}
               <div className="h-8 w-20 bg-white/20 rounded-md"></div>
               <div className="h-8 w-20 bg-white/20 rounded-md"></div>
               <div className="h-8 w-20 bg-white/20 rounded-md"></div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">&copy; 2025 PPID Pelaksana Sekretariat DPRD Provinsi Jawa Tengah.</p>
          <p className="text-sm">Jl. Pahlawan No.7, Semarang 50243 | (024) 8415500</p>
        </div>
      </footer>

    </main>
  );
}