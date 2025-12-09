'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled 
          ? 'bg-green-900/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO AREA (Kiri) - Muncul saat discroll atau di mobile */}
        <Link href="/" className="flex items-center gap-3 group">
           <div className={`relative h-10 w-10 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
             <Image 
                src="/logo-jateng.png" 
                alt="Logo Jateng" 
                fill
                className="object-contain drop-shadow-md"
             />
          </div>
          <div className={`flex flex-col ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-0'} transition-opacity duration-300`}>
            <span className="font-bold text-white text-sm tracking-widest">PPID</span>
            <span className="text-[10px] text-green-200 uppercase tracking-wider">DPRD Jawa Tengah</span>
          </div>
        </Link>

        {/* DESKTOP MENU (Lengkap Sesuai Audit PDF) */}
        {/* Menggunakan text-xs atau text-sm agar muat */}
        <div className="hidden xl:flex items-center gap-6 text-white">
          <NavLink href="/" text="Beranda" />
          
          <NavDropdown title="Profil PPID" items={[
            'Visi Misi', 
            'Struktur Organisasi', 
            'Tugas & Fungsi', 
            'Profil Pejabat',
            'LHKPN'
          ]} />
          
          <NavDropdown title="Daftar Informasi" items={[
            'Informasi Berkala', 
            'Informasi Serta Merta', 
            'Informasi Setiap Saat', 
            'Informasi Dikecualikan'
          ]} />

          <NavDropdown title="Standar Pelayanan" items={[
            'Maklumat Pelayanan', 
            'Prosedur Pelayanan', 
            'Biaya Pelayanan', 
            'Waktu Pelayanan'
          ]} />

          {/* Whistle Blower (Menu Penting) */}
          <Link href="#" className="font-semibold text-xs uppercase tracking-wide text-yellow-400 hover:text-white transition-colors border border-yellow-400/50 px-3 py-1.5 rounded hover:bg-yellow-500 hover:border-yellow-500">
            Whistle Blower
          </Link>

          <NavDropdown title="Permohonan" items={[
            'Permohonan Online', 
            'Cek Status Tiket', 
            'Pengajuan Keberatan'
          ]} />

          <NavLink href="#" text="Regulasi" />
          <NavLink href="#" text="Open Data" />
          <NavLink href="#" text="Aduan" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="xl:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-green-900 shadow-xl border-t border-green-800 p-6 flex flex-col gap-4 xl:hidden max-h-[80vh] overflow-y-auto">
          <MobileLink text="Beranda" />
          <MobileLink text="Profil PPID" />
          <MobileLink text="Daftar Informasi Publik" />
          <MobileLink text="Standar Pelayanan" />
          <MobileLink text="Whistle Blower" isHighlight />
          <MobileLink text="Permohonan Informasi" />
          <MobileLink text="Regulasi" />
          <MobileLink text="Open Data" />
          <MobileLink text="Aduan Pelayanan" />
        </div>
      )}
    </nav>
  );
};

// Helper Components
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link 
    href={href} 
    className="font-medium text-xs uppercase tracking-wide text-white/80 hover:text-white hover:underline decoration-yellow-400 decoration-2 underline-offset-4 transition-all"
  >
    {text}
  </Link>
);

const NavDropdown = ({ title, items }: { title: string; items: string[] }) => (
  <div className="relative group cursor-pointer h-full flex items-center">
    <div className="flex items-center gap-1 font-medium text-xs uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">
      {title} <ChevronDown size={12} />
    </div>
    {/* Dropdown Menu */}
    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2 border-t-4 border-green-600">
      {items.map((item, i) => (
        <div key={i} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 rounded-md transition-colors border-b border-gray-50 last:border-0">
          {item}
        </div>
      ))}
    </div>
  </div>
);

const MobileLink = ({ text, isHighlight }: { text: string, isHighlight?: boolean }) => (
  <Link href="#" className={`block text-sm font-medium ${isHighlight ? 'text-yellow-400' : 'text-white'} border-b border-white/10 pb-2`}>
    {text}
  </Link>
);

export default Navbar;