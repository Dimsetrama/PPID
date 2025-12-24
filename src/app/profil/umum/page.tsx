import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Building2, History, Gavel, Info } from 'lucide-react';

export default function ProfilUmumPage() {
  const midPoint = Math.ceil(PROGRAM_UNGGULAN.length / 2);
  const leftColumn = PROGRAM_UNGGULAN.slice(0, midPoint);
  const rightColumn = PROGRAM_UNGGULAN.slice(midPoint);

  return (
    // FIX: Hapus 'overflow-x-hidden' agar 'sticky' di Desktop kembali jalan
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* --- HERO SECTION KECIL --- */}
      <div className="relative bg-green-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="/berlian.jpg" 
                alt="Background Pattern" 
                fill 
                className="object-cover mix-blend-overlay grayscale"
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-fade-in-up">
            Profil PPID
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Selayang Pandang
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* --- SECTION 1: INTRO & SEJARAH --- */}
      <section className="container mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* KIRI: Ilustrasi */}
          {/* Sticky Logic:
              - Mobile: 'relative' (diam)
              - Desktop: 'lg:sticky lg:top-24' (mengikuti scroll)
          */}
          <div className="w-full lg:w-5/12 group relative lg:sticky lg:top-24 mb-8 lg:mb-0">
            
            {/* Gambar Responsif */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-1 transition-transform lg:hover:rotate-0 duration-500">
              <Image 
                src="/gedung-dprd-jateng.jpg" 
                alt="Gedung Berlian DPRD Jateng"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-green-900/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <p className="text-yellow-400 font-bold text-xs lg:text-sm tracking-widest uppercase mb-1">Kantor Pusat</p>
                <h3 className="text-white text-xl lg:text-2xl font-bold">Gedung Berlian</h3>
                <p className="text-green-100 text-xs lg:text-sm mt-2 opacity-80">Jl. Pahlawan No.7, Semarang</p>
              </div>
            </div>
            
            {/* Dekorasi: 'hidden' di mobile (mencegah zoom out), 'block' di desktop */}
            <div className="hidden lg:block absolute -z-10 top-10 -right-10 w-full h-full bg-green-100 rounded-2xl -rotate-1"></div>
          </div>

          {/* KANAN: Teks Narasi */}
          <div className="w-full lg:w-7/12 space-y-8">
            
            <div>
              <div className="flex items-center gap-2 mb-2 text-green-600 font-bold uppercase text-xs tracking-wider">
                <Building2 size={16} />
                <span>Tentang Institusi</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight mb-4">
                Keterbukaan Informasi adalah <span className="text-green-600">Hak Asasi.</span>
              </h2>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed text-justify">
                Hak memperoleh informasi merupakan hak asasi manusia dan keterbukaan informasi publik merupakan salah satu ciri penting negara demokratis yang menjunjung tinggi kedaulatan rakyat. 
                Pemerintah Provinsi Jawa Tengah berkomitmen penuh untuk mewujudkan <i>Good Government</i> dan <i>Clean Government</i> melalui transparansi informasi yang akuntabel kepada masyarakat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                <div className="flex items-start gap-4">
                    <Gavel className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">Dasar Pembentukan PPID Pelaksana</h4>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            &quot;Di lingkungan DPRD, dibentuklah PPID Pembantu DPRD Provinsi Jawa Tengah berdasarkan 
                            <strong> Surat Keputusan Sekda Provinsi Jateng Nomor 821.2/0011554/2017</strong> tentang 
                            Pejabat Pengelola Informasi dan Dokumentasi Pembantu Sekretariat Daerah Provinsi Jawa Tengah.&quot;
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                    <History size={24} className="text-green-600"/>
                    Sejarah & Fungsi
                </h3>
                
                <div className="text-slate-600 space-y-4 text-justify leading-relaxed text-sm lg:text-base">
                    <p>
                        Keterbukaan informasi publik di Jawa Tengah diselenggarakan pasca berlakunya UU Nomor 14 Tahun 2008. 
                        Sebagai wujud keseriusan, Pemerintah Provinsi Jawa Tengah menjadi provinsi pertama di Indonesia yang membentuk 
                        <strong> Komisi Informasi Provinsi (KIP)</strong> pada bulan April 2010.
                    </p>
                    <p>
                        Landasan hukum tersebut diperkuat dengan disahkannya <strong>Peraturan Daerah Provinsi Jawa Tengah Nomor 6 Tahun 2012</strong> tentang 
                        Pelayanan Informasi Publik Penyelenggaraan Pemerintah Daerah. Standar teknis pelayanannya kemudian diatur secara rinci melalui 
                        Peraturan Gubernur Nomor 47 Tahun 2012 yang telah direvisi dengan <strong>Peraturan Gubernur Nomor 12 Tahun 2015</strong>.
                    </p>
                    <p>
                        Untuk meningkatkan kualitas data dan informasi publik, Pemerintah Provinsi Jawa Tengah juga mengesahkan regulasi mengenai 
                        <em> Single Data System</em> melalui Pergub Nomor 52 Tahun 2016 dan Pergub Nomor 20 Tahun 2017 untuk pembangunan daerah yang lebih terintegrasi.
                    </p>
                    <p>
                        Secara kelembagaan, PPID Pemerintah Provinsi Jawa Tengah diatur berdasarkan <strong>Keputusan Gubernur Jawa Tengah Nomor 550/32 Tahun 2017</strong> tentang 
                        Pembentukan PPID Utama dan PPID Pembantu pada Badan Publik Pemerintah Provinsi Jawa Tengah, di mana PPID Utama dikelola oleh 
                        Dinas Komunikasi dan Informatika Provinsi Jawa Tengah.
                    </p>

                    <div className="bg-green-50/60 p-5 rounded-xl border border-green-100 mt-6 text-sm">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                            <Info size={18} />
                            Peran Strategis PPID
                        </h4>
                        <p className="text-slate-700 leading-relaxed">
                            <strong>PPID (Pejabat Pengelola Informasi dan Dokumentasi)</strong> adalah pejabat yang bertanggung jawab di bidang penyimpanan, pendokumentasian, penyediaan, dan pelayanan informasi di badan publik.
                            Kehadiran PPID bertujuan untuk mewujudkan penyelenggaraan negara yang transparan, efektif, dan akuntabel.
                            Bagi masyarakat, PPID memberikan jaminan akses atas informasi publik untuk meningkatkan peran aktif mereka dalam proses pengambilan kebijakan publik.
                        </p>
                    </div>

                </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 2: 10 PROGRAM UNGGULAN --- */}
      <section className="relative py-20 bg-linear-to-b from-slate-50 to-green-50 overflow-hidden">
        
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-200 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-200 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-green-600 font-bold tracking-widest text-xs uppercase bg-green-100 px-3 py-1 rounded-full">Komitmen Nyata</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4">10 Program Unggulan</h2>
                <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
                    Inisiatif strategis Pemerintah Provinsi Jawa Tengah untuk memajukan kesejahteraan masyarakat.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                    {leftColumn.map((program, index) => (
                        <div key={index} className="group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-x-1">
                            <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-700 font-bold text-lg border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-green-700 transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {program.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KOLOM KANAN */}
                <div className="space-y-6">
                    {rightColumn.map((program, index) => (
                        <div key={index + midPoint} className="group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 md:hover:translate-x-1">
                            <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-700 font-bold text-lg border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                {index + 1 + midPoint}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-green-700 transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {program.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- DATA PROGRAM UNGGULAN ---
const PROGRAM_UNGGULAN = [
    { title: "Sekolah Tanpa Sekat", desc: "Pelatihan tentang demokrasi, pemilu, gender, anti korupsi, dan magang gubernur untuk siswa SMA/SMK." },
    { title: "Peningkatan Peran Rumah Ibadah", desc: "Fasilitasi pendakwah dan guru ngaji untuk memperkuat karakter masyarakat." },
    { title: "Reformasi Birokrasi", desc: "Reformasi birokrasi di Kabupaten/Kota dan sistem layanan terintegrasi." },
    { title: "Satgas Kemiskinan", desc: "Bantuan desa dan penyediaan rumah sederhana layak huni." },
    { title: "Ekonomi Kerakyatan", desc: "Obligasi daerah, kemudahan akses kredit UMKM, penguatan BUMDes, dan pelatihan start-up wirausaha muda." },
    { title: "Perlindungan Petani & Nelayan", desc: "Menjaga harga komoditas dan asuransi gagal panen untuk petani serta melindungi kepentingan nelayan." },
    { title: "Infrastruktur & Transportasi", desc: "Pengembangan transportasi massal, revitalisasi jalur kereta dan bandara, serta pembangunan embung/irigasi." },
    { title: "Kawasan Industri & Pertanian", desc: "Pembukaan kawasan industri baru dan rintisan pertanian terintegrasi." },
    { title: "Pendidikan & Kesehatan Inklusif", desc: "Rumah sakit tanpa dinding, sekolah gratis untuk SMAN/SMKN/SLB, dan bantuan sekolah swasta, pondok pesantren, madrasah, dan difabel." },
    { title: "Budaya & Lingkungan", desc: "Festival seni serta pengembangan infrastruktur olahraga, rumah kebudayaan, dan kepedulian lingkungan." }
];