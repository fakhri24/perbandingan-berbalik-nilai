import React from 'react';
import MathView from './MathView';
import { BookOpen, CheckCircle2, ArrowRightLeft, Sparkles } from 'lucide-react';

export const TheorySection: React.FC = () => {
  return (
    <section id="teori" className="space-y-6">
      {/* Kartu Pengantar & Definisi Formal */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Materi Pembelajaran Matematika Fase E / Kelas X SMA</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Konsep Perbandingan Berbalik Nilai
        </h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Perbandingan berbalik nilai (*inverse proportion*) merupakan relasi fungsional antara dua atau lebih variabel, di mana kenaikan nilai suatu variabel mengakibatkan penurunan proporsional pada variabel lainnya, dan sebaliknya, dengan ketentuan bahwa <strong className="text-slate-900">hasil kali pasangan variabel tersebut bernilai konstan</strong>.
        </p>

        {/* Kotak Persamaan Utama */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50 p-5 rounded-xl border border-indigo-100">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
              Bentuk Persamaan Hasil Kali Konstan
            </span>
            <div className="text-center py-3">
              <MathView math="x \cdot y = k \quad \Longleftrightarrow \quad y = \frac{k}{x}" display className="text-xl md:text-2xl text-indigo-950 font-bold" />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              dengan <MathView math="k \in \mathbb{R}^+, k \neq 0" /> menyatakan konstanta perbandingan.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50/80 to-slate-50 p-5 rounded-xl border border-blue-100">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
              Rumus Perbandingan Dua Kondisi
            </span>
            <div className="text-center py-3">
              <MathView math="\frac{a_1}{a_2} = \frac{b_2}{b_1} \quad \Longleftrightarrow \quad a_1 \cdot b_1 = a_2 \cdot b_2" display className="text-xl md:text-2xl text-blue-950 font-bold" />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Variabel pada kondisi pertama berpasangan terbalik terhadap kondisi kedua.
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Komparasi: Senilai vs Berbalik Nilai */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
          Komparasi: Perbandingan Senilai vs Perbandingan Berbalik Nilai
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-700 font-semibold">
                <th className="py-3 px-4">Parameter Karakteristik</th>
                <th className="py-3 px-4 text-emerald-800 bg-emerald-50/40">Perbandingan Senilai (*Direct*)</th>
                <th className="py-3 px-4 text-indigo-800 bg-indigo-50/40">Perbandingan Berbalik Nilai (*Inverse*)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800">Relasi Antar Variabel</td>
                <td className="py-3 px-4">Jika <MathView math="x" /> meningkat, maka <MathView math="y" /> meningkat searah.</td>
                <td className="py-3 px-4">Jika <MathView math="x" /> meningkat, maka <MathView math="y" /> menurun terbalik.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800">Besaran Konstan</td>
                <td className="py-3 px-4 font-mono">Hasil bagi konstan: <MathView math="\frac{y}{x} = k" /></td>
                <td className="py-3 px-4 font-mono font-semibold text-indigo-600">Hasil kali konstan: <MathView math="x \cdot y = k" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800">Bentuk Persamaan Proporsi</td>
                <td className="py-3 px-4 font-mono"><MathView math="\frac{a_1}{a_2} = \frac{b_1}{b_2}" /></td>
                <td className="py-3 px-4 font-mono font-semibold text-indigo-600"><MathView math="\frac{a_1}{a_2} = \frac{b_2}{b_1}" /> atau <MathView math="a_1 b_1 = a_2 b_2" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800">Bentuk Geometri Grafik</td>
                <td className="py-3 px-4">Garis lurus linier berpangkal di titik asal <MathView math="(0,0)" />.</td>
                <td className="py-3 px-4 font-semibold text-indigo-600">Kurva hiperbola siku-siku mulus asimtotik terhadap sumbu koordinat.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800">Contoh Kasus Fisik / Sehari-hari</td>
                <td className="py-3 px-4">Jumlah barang dibeli dengan total biaya belanja.</td>
                <td className="py-3 px-4">Kecepatan terhadap waktu tempuh; banyak pekerja terhadap durasi proyek.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Karakteristik Kurva Hiperbola & Asimtot */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Analisis Matematis Grafik Hiperbola</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          Sifat Geometris Kurva <MathView math="y = \frac{k}{x}" /> pada Kuadran I
        </h3>
        <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
            <div>
              <strong className="text-white">Asimtot Tegak (Sumbu Y, <MathView math="x = 0" />):</strong> Kurva mendekati sumbu vertikal hingga tak terhingga (<MathView math="y \to \infty" /> saat <MathView math="x \to 0^+" />), namun tidak pernah menyentuh sumbu Y karena pembagian dengan nol tidak terdefinisi.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
            <div>
              <strong className="text-white">Asimtot Datar (Sumbu X, <MathView math="y = 0" />):</strong> Seiring pertambahan nilai <MathView math="x" /> menuju tak terhingga (<MathView math="x \to \infty" />), nilai <MathView math="y" /> mendekati nol secara asimtotik (<MathView math="y \to 0" />).
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
            <div>
              <strong className="text-white">Invariansi Luas Persegi Panjang:</strong> Luas daerah yang dibentuk oleh titik koordinat <MathView math="(x,y)" /> terhadap sumbu koordinat selalu konstan sebesar <MathView math="L = x \cdot y = k" /> satuan luas.
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TheorySection;
