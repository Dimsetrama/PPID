'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wallet, Info, Printer, Save } from 'lucide-react';
import Image from 'next/image';

export default function BiayaPelayananPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-red-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="/berlian.jpg" 
                alt="Background" 
                fill
                className="object-cover mix-blend-overlay grayscale" 
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up border border-yellow-500/50 bg-red-950/30 rounded-full py-1 px-3 w-fit mx-auto">
            Standar Pelayanan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Biaya Pelayanan
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="relative py-20 bg-slate-50 overflow-hidden">
        
        {/* Dekorasi Background (Dots & Blobs) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#991b1b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-50 translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    
                    {/* BAGIAN KIRI: BANNER MERAH (Mirip Gambar Referensi) */}
                    <div className="w-full lg:w-5/12 bg-red-600 p-10 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Garis Dekoratif Banner */}
                        <div className="absolute top-10 left-0 w-full h-1 bg-white/20"></div>
                        <div className="absolute bottom-10 left-0 w-full h-1 bg-white/20"></div>
                        
                        <div className="relative z-10 border-4 border-white/30 p-8 rounded-xl bg-red-700/50 backdrop-blur-sm">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight uppercase tracking-wide">
                                Standar Biaya <br/>
                                <span className="text-yellow-400">Perolehan</span> <br/>
                                Informasi
                            </h2>
                        </div>
                        
                        {/* Ikon Besar Background Overlay */}
                        <Wallet size={300} className="absolute -bottom-10 -left-10 text-red-900 opacity-20 rotate-12" />
                    </div>

                    {/* BAGIAN KANAN: KONTEN TEKS */}
                    <div className="w-full lg:w-7/12 p-8 lg:p-14 relative">
                        

                        <div className="mt-8 lg:mt-4 space-y-6 relative z-10">
                            
                            {/* Paragraf Utama */}
                            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed font-medium text-justify">
                                Pejabat Pengelola Informasi dan Dokumentasi (PPID) Pelaksana menyediakan informasi publik secara{' '}
                                <span className="text-red-600 font-extrabold text-2xl">
                                    GRATIS (TIDAK DIPUNGUT BIAYA)
                                </span>
                                , sedangkan untuk penggandaan atau perekaman:
                            </p>

                            {/* Detail List */}
                            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex gap-4 items-start">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-1">
                                        <Printer size={20} />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        Pemohon dapat melakukan penggandaan (fotocopy){' '}
                                        <span className="text-blue-600 font-bold italic text-lg">
                                            SENDIRI
                                        </span>{' '}
                                        di sekitar Lingkungan Sekretariat DPRD Provinsi Jawa Tengah.
                                    </p>
                                </div>
                                
                                <div className="w-full h-px bg-slate-200"></div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0 mt-1">
                                        <Save size={20} />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        Menyediakan{' '}
                                        <span className="text-slate-800 font-bold">Flashdisk / Penyimpanan Eksternal</span>{' '}
                                        pribadi untuk perekaman data digital dan informasinya.
                                    </p>
                                </div>
                            </div>

                            {/* STAMPEL GRATIS DI BAWAH (Visual Replication) */}
                            <div className="pt-8 flex flex-wrap gap-6 justify-center lg:justify-start opacity-80">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`border-4 border-red-600 rounded-lg px-4 py-2 transform ${i % 2 === 0 ? '-rotate-6' : 'rotate-6'} mask-grunge`}>
                                        <span className="text-2xl font-black text-red-600 uppercase tracking-widest">
                                            GRATIS
                                            <span className="block text-[8px] text-center tracking-normal font-medium mt-[-5px]">PPID JATENG</span>
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Tambahan Info Box Kecil */}
            <div className="max-w-3xl mx-auto mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-800 text-sm font-medium">
                    <Info size={16} />
                    <span>Layanan ini didukung penuh oleh APBD Provinsi Jawa Tengah</span>
                </div>
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}