import React from 'react';
import Image from 'next/image';
import { 
  FileText, 
  Wifi, 
  MessageSquareWarning, 
  ShieldAlert, 
  ArrowRight,
  Leaf 
} from 'lucide-react';

const PermohonanSection = () => {
  const buttons = [
    {
      label: "Permohonan Informasi Manual",
      desc: "Datang langsung ke kantor pelayanan",
      icon: <FileText size={22} />,
      color: "bg-emerald-600",
      href: "permohonan-informasi/manual"
    },
    {
      label: "Permohonan Informasi Online",
      desc: "Isi formulir digital dari mana saja",
      icon: <Wifi size={22} />,
      color: "bg-blue-600",
      href: "permohonan-informasi/online"
    },
    {
      label: "Pengajuan Keberatan",
      desc: "Laporkan kendala layanan informasi",
      icon: <MessageSquareWarning size={22} />,
      color: "bg-yellow-500",
      href: "permohonan-informasi/pengajuan-keberatan"
    },
    {
      label: "Pengaduan Pelanggaran ASN",
      desc: "Lapor pelanggaran kode etik pegawai",
      icon: <ShieldAlert size={22} />,
      color: "bg-red-600",
      href: "permohonan-informasi/pengaduan-wewenang"
    }
  ];

  return (
    // FIX: Syntax Gradient v4
    <section className="relative py-24 overflow-hidden bg-linear-to-br from-white via-green-50/50 to-green-100/50">
      
      {/* 1. DEKORASI BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="absolute top-10 right-10 text-green-200 animate-bounce delay-700 opacity-50">
        <Leaf size={64} className="rotate-45" />
      </div>
      <div className="absolute bottom-20 left-10 text-green-200 animate-pulse delay-1000 opacity-50">
        <Leaf size={48} className="-rotate-12" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* KOLOM KIRI */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative group">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-green-200/60 animate-[spin_20s_linear_infinite]">
                <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.2C93.5,8.8,82.2,21.9,71.6,33.4C60.9,44.9,50.9,54.8,39.6,62.4C28.3,70,15.7,75.3,2.3,71.4C-11.1,67.5,-25.3,54.4,-37.8,42.8C-50.3,31.2,-61.1,21.1,-67.2,8.1C-73.3,-4.9,-74.7,-20.8,-68.6,-34.7C-62.5,-48.6,-48.9,-60.5,-34.8,-67.8C-20.7,-75.1,-6.1,-77.8,6.8,-89.6L44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative z-10 w-full max-w-md drop-shadow-2xl transition-transform duration-500 hover:scale-105">
              <Image 
                src="/laptop.png"
                alt="Layanan Informasi"
                width={500}
                height={600}
                className="object-contain"
                priority
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-green-100 flex items-center gap-3 animate-bounce">
                <div className="bg-green-100 p-2 rounded-full">
                  <Wifi className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Status</div>
                  <div className="text-sm font-bold text-green-700">Online 24 Jam</div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="w-full lg:w-7/12 space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1 w-10 bg-green-500 rounded-full"></span>
                <span className="text-green-700 font-bold tracking-wider text-sm uppercase">
                  Pusat Layanan
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Permohonan Informasi <br/>
                {/* FIX: Gradient v4 */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-400">
                  Publik & Pengaduan
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                Apabila Anda tidak menemukan informasi publik yang diinginkan di daftar dokumen, 
                silakan gunakan layanan prioritas kami di bawah ini.
              </p>
            </div>

            <div className="grid gap-4">
              {buttons.map((btn, index) => (
                <a 
                  key={index} 
                  href={btn.href}
                  // FIX: Ganti translate negatif ganda jadi positive translate-x-2
                  className="group relative flex items-center gap-5 p-4 bg-white rounded-xl shadow-sm hover:shadow-xl hover:shadow-green-900/5 border border-green-100/50 hover:border-green-300 hover:translate-x-2 transition-all duration-300 overflow-hidden"
                >
                  <div className={`relative z-10 w-12 h-12 rounded-lg ${btn.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {btn.icon}
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="font-bold text-gray-800 text-base md:text-lg group-hover:text-green-700 transition-colors">
                      {btn.label}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-600">
                      {btn.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pr-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-green-600 bg-green-50 p-2 rounded-full">
                    <ArrowRight size={18} />
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PermohonanSection;