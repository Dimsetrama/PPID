'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- DATA STRUKTUR NAVBAR ---
const NAV_ITEMS = [
  { 
    label: 'Beranda', 
    href: '/' 
  },
  {
    label: 'Profil PPID',
    children: [
      { label: 'Profil PPID (Umum)', href: '/profil/umum' },
      { label: 'Visi Misi', href: '/profil/visi-misi' },
      { label: 'Profil Pejabat Struktural', href: '/profil/pejabat-struktural' },
      { label: 'Susunan Organisasi', href: '/profil/susunan-organisasi' },
      { label: 'Susunan PPID Pelaksana', href: '/profil/susunan-ppid-pelaksana' },
      { label: 'LHKPN', href: '/profil/lhkpn' },
      { label: 'SDM yang Tersedia', href: '/profil/sdm' },
      { label: 'Kelembagaan', href: '/profil/kelembagaan' },
    ]
  },
  {
    label: 'Daftar Informasi',
    children: [
      { label: 'Daftar Informasi Publik', href: '/daftar-informasi/publik' },
      { label: 'Informasi Berkala', href: '/daftar-informasi/berkala' },
      { label: 'Barang & Jasa (PBJ)', href: '/daftar-informasi/pbj' },
      { label: 'Informasi Dikecualikan', href: '/daftar-informasi/dikecualikan' },
      { label: 'Informasi Serta Merta', href: '/daftar-informasi/serta-merta' },
      { label: 'Informasi Setiap Saat', href: '/daftar-informasi/setiap-saat' },
    ]
  },
  {
    label: 'Standar Pelayanan',
    children: [
      { label: 'SOP Pelayanan Publik', href: '/standar-pelayanan/pelayanan-publik' },
      { label: 'SOP Operasional', href: '/standar-pelayanan/sop-operasional' },
      { label: 'SOP PPID', href: '/standar-pelayanan/sop-ppid' },
      { label: 'Waktu Pelayanan', href: '/standar-pelayanan/waktu-pelayanan' },
      { label: 'Biaya Pelayanan', href: '/standar-pelayanan/biaya-pelayanan' },
    ]
  },
  { 
    label: 'Whistle Blower', 
    href: '/whistle-blower', 
    highlight: true 
  },
  {
    label: 'Permohonan Informasi',
    children: [
      { label: 'Permohonan Informasi Manual', href: '/permohonan-informasi/manual' },
      { label: 'Permohonan Informasi Online', href: '/permohonan-informasi/online' },
      { label: 'Pengajuan Keberatan', href: '/permohonan-informasi/pengajuan-keberatan' },
      { label: 'Tata Cara Pengaduan Wewenang', href: '/permohonan-informasi/pengaduan-wewenang' },
    ]
  },
  {
    label: 'Regulasi',
    children: [
      { label: 'Daftar Peraturan', href: '/regulasi/daftar-peraturan' },
      { label: 'JDIH DPRD Jateng', href: 'https://jdih.dprd.jatengprov.go.id/' }, 
    ]
  },
  {
    label: 'Open Data',
    children: [
      { label: 'Portal Open Data Jateng', href: 'https://data.jatengprov.go.id/organization/sekretariat-dprd-provinsi-jawa-tengah' },
      { label: 'Statistik Data Sektoral', href: '/open-data/statistik-sektoral' },
    ]
  },
  { 
    label: 'Aduan Pelayanan', 
    href: '/aduan-pelayanan' 
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled 
          ? 'bg-green-900/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group">
           <div className={`relative h-10 w-10 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
             {/* Pastikan file logo-jateng.png ada di folder public */}
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

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center gap-6 text-white">
          {NAV_ITEMS.map((item, index) => (
            item.children ? (
              <NavDropdown key={index} title={item.label} items={item.children} />
            ) : (
              <NavLink 
                key={index} 
                href={item.href} 
                text={item.label} 
                isHighlight={item.highlight} 
              />
            )
          ))}
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
        <div className="absolute top-full left-0 w-full bg-green-900 shadow-xl border-t border-green-800 p-6 flex flex-col gap-2 xl:hidden max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-white/10 last:border-0 pb-2">
              {item.children ? (
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="flex justify-between items-center w-full text-white font-medium py-2"
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform ${mobileDropdowns[item.label] ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {mobileDropdowns[item.label] && (
                    <div className="pl-4 flex flex-col gap-2 mt-1 mb-2 bg-green-950/30 rounded-lg p-3">
                      {item.children.map((subItem, subIndex) => {
                         const isExternal = subItem.href.startsWith('http');
                         return (
                            <Link 
                              key={subIndex} 
                              href={subItem.href}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                              className="text-sm text-green-100 hover:text-yellow-400 py-1 flex items-center gap-2"
                              onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat klik link
                            >
                              <ChevronRight size={12} className="text-yellow-500/50" />
                              {subItem.label}
                            </Link>
                         );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href={item.href} 
                  className={`block py-2 font-medium ${item.highlight ? 'text-yellow-400 font-bold' : 'text-white'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- COMPONENTS HELPER ---

const NavLink = ({ href, text, isHighlight }: { href: string; text: string; isHighlight?: boolean }) => {
  if (isHighlight) {
    return (
      <Link href={href} className="font-bold text-xs uppercase tracking-wide text-yellow-400 hover:text-white transition-colors border border-yellow-400/50 px-3 py-1.5 rounded hover:bg-yellow-500 hover:border-yellow-500 shadow-sm hover:shadow-yellow-500/20">
        {text}
      </Link>
    );
  }
  return (
    <Link 
      href={href} 
      className="font-medium text-xs uppercase tracking-wide text-white/80 hover:text-white hover:underline decoration-yellow-400 decoration-2 underline-offset-4 transition-all"
    >
      {text}
    </Link>
  );
};

// FIX: Update NavDropdown untuk menangani External Links
const NavDropdown = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => (
  <div className="relative group h-full flex items-center cursor-default">
    <div className="flex items-center gap-1 font-medium text-xs uppercase tracking-wide text-white/80 group-hover:text-white transition-colors cursor-pointer py-4">
      {title} <ChevronDown size={12} />
    </div>
    
    {/* Dropdown Menu Box */}
    <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-4 group-hover:translate-y-0 p-1 border-t-4 border-green-600 origin-top-left">
      <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
        {items.map((item, i) => {
          const isExternal = item.href.startsWith('http');
          return (
            <Link 
              key={i} 
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 rounded-md transition-colors border-b border-gray-50 last:border-0"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

export default Navbar;