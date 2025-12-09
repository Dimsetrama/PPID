import React, { ReactNode } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative bg-green-950 text-white pt-12 pb-8 overflow-hidden border-t-4 border-yellow-500">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>
      
      {/* Blob Dekorasi */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-900 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          
          {/* KOLOM KIRI: Identitas & Kontak */}
          <div className="w-full md:w-5/12 space-y-6">
            
            {/* Logo & Judul */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Image 
                  src="/logo-jateng.png" 
                  alt="Logo Jateng" 
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-wide leading-tight">PPID PELAKSANA</h3>
                <p className="text-[10px] text-green-300 uppercase tracking-widest">Sekretariat DPRD Jawa Tengah</p>
              </div>
            </div>

            {/* List Kontak */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <ContactItem 
                icon={<MapPin size={16} />} 
                text="Jl. Pahlawan No.7, Mugassari, Kec. Semarang Sel., Kota Semarang, Jawa Tengah 50249" 
              />
              
              <ContactItem 
                icon={<Mail size={16} />} 
                text="setwan.dprd@jatengprov.go.id" 
              />
              
              <ContactItem 
                icon={<Phone size={16} />} 
                text="(024) 8415500" 
              />
            </div>

          </div>

          {/* KOLOM KANAN: Peta Akurat DPRD Jateng */}
          <div className="w-full md:w-6/12 lg:w-5/12">
            <div className="h-[200px] w-full bg-white/5 p-1.5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm relative overflow-hidden">
              
              <iframe 
                src="https://maps.google.com/maps?q=DPRD+Provinsi+Jawa+Tengah+Jl.+Pahlawan+No.7&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.6rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Lokasi DPRD Jateng"
              ></iframe>

            </div>
          </div>

        </div>

        {/* COPYRIGHT SIMPLE */}
        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500">
            © {new Date().getFullYear()} PPID Sekretariat DPRD Provinsi Jawa Tengah. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

// FIX: Hapus 'title' dari Interface
type ContactItemProps = {
  icon: ReactNode;
  text: string;
};

// FIX: Hapus 'title' dari komponen
const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-0.5 text-yellow-500 group-hover:text-white transition-colors shrink-0">
      {icon}
    </div>
    <div className="text-sm">
      <p className="text-gray-300 leading-snug font-light tracking-wide">{text}</p>
    </div>
  </div>
);

export default Footer;