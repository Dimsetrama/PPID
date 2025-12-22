'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PermohonanSection from '@/components/PermohonanSection';
import ProsedurSection from '@/components/ProsedurSection';
import GaleriSection from '@/components/GaleriSection';
import AnggaranSection from '@/components/AnggaranSection';
import { Users, FileCheck, Clock, TrendingUp, Facebook, Instagram, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import SupportedBy from '@/components/SupportedBy';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="h-40 bg-slate-50"></div>

      {/* SECTION 1: MAKLUMAT PELAYANAN */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-slate-100 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-green-600 via-yellow-400 to-green-600"></div>
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 grayscale rotate-12 pointer-events-none">
             <Image 
               src="/logo-jateng.png" 
               alt="Watermark" 
               fill
               className="object-contain"
             />
          </div>

          <div className="relative z-10 px-8 py-12 md:p-16 text-center max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-12 font-serif tracking-tight">
              MAKLUMAT PELAYANAN
            </h2>
            
            <div className="relative">
              <div className="absolute -top-8 -left-2 md:-left-6 text-7xl text-green-300 font-serif leading-none">“</div>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium italic px-6 md:px-12 relative z-10">
                &quot;Dengan ini kami sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan, 
                dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan 
                perundang-undangan yang berlaku.&quot;
              </p>
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

      {/* SECTION 3 DI SINI */}
      <ProsedurSection />

      {/* SECTION 5: ANGGARAN & NERACA */}
      <AnggaranSection />

            {/* SECTION 4: GALERI (DIANTARA PERMOHONAN & ANGGARAN) */}
      <GaleriSection />

      {/* --- SECTION 3 & 4 GABUNGAN: MEDIA SOSIAL & STATISTIK (SEAMLESS) --- */}
      <section className="relative py-20 overflow-hidden bg-green-900 mt-10">
        
        {/* Shared Background Aesthetic */}
        <div className="absolute inset-0 z-0">
           <Image 
             src="/berlian2.jpeg" 
             alt="Social Media Background" 
             fill
             className="object-cover"
             onError={(e) => { e.currentTarget.src = "/berlian.jpg"; }}
           />
           {/* Gradient Overlay Hijau Gelap (Menyatukan Tema) */}
           <div className="absolute inset-0 bg-linear-to-b from-green-900/90 via-green-800/95 to-green-900/95"></div>
        </div>

        {/* --- BAGIAN A: MEDIA SOSIAL --- */}
        <div className="container mx-auto px-6 relative z-10 mb-24">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2 block">Terhubung Dengan Kami</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Jendela Media Sosial</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* KOLOM KIRI: FACEBOOK & INSTAGRAM BUTTON */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Facebook Frame */}
                    <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 h-[500px]">
                        <div className="bg-[#1877F2] p-3 flex items-center gap-3 text-white">
                            <Facebook size={20} />
                            <span className="font-bold text-sm">Facebook Page</span>
                        </div>
                        <div className="w-full h-[calc(100%-50px)] bg-slate-100">
                            <iframe 
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2FDPRDJATENG&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 'none', overflow: 'hidden' }} 
                                scrolling="no" 
                                frameBorder="0" 
                                allowFullScreen={true} 
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Instagram Simbol Kecil */}
                    <a 
                        href="https://www.instagram.com/dprdjatengprovinsi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl p-4 flex items-center justify-between text-white shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1 transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                <Instagram size={20} />
                            </div>
                            <span className="font-bold text-sm">Instagram Resmi</span>
                        </div>
                        <ArrowRight size={18} className="opacity-80" />
                    </a>
                </div>

                {/* KOLOM KANAN: YOUTUBE (BESAR) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Video Utama (Paling Besar - Full Width di Mobile, Span 2 di Desktop) */}
                    <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group">
                         <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/BIiIJUKgQR4" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Video Tambahan 1 */}
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black">
                         <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/rGcu4v3zZGs" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Video Tambahan 2 */}
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black">
                         <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/8NQJcZZf23w" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>

        {/* --- SEPARATOR HALUS (Hanya Jarak) --- */}
        <div className="container mx-auto px-6">
            <div className="h-px w-full bg-linear-to-r from-transparent via-green-400/30 to-transparent mb-16"></div>
        </div>


        {/* --- BAGIAN B: STATISTIK PENGUNJUNG --- */}
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
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

            {/* KARTU 3: TOTAL */}
            <div className="group relative bg-linear-to-br from-green-600 to-green-800 rounded-2xl p-6 shadow-xl border border-green-400/30 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white">
                  <FileCheck size={20} />
                </div>
              </div>
              
              <div className="text-4xl font-extrabold text-white mb-1 tracking-tight relative z-10 tabular-nums">
                249.511
              </div>
              <div className="text-sm text-green-100 font-medium relative z-10 opacity-90">Total Kunjungan</div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: LINK TERKAIT */}
      <SupportedBy />

      <Footer />
    </main>
  );
}