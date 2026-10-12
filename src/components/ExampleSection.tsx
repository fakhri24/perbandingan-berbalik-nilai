import React, { useState } from 'react';
import MathView from './MathView';
import { Gauge, Check, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ExampleSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [testSpeed, setTestSpeed] = useState<number>(90);

  const options = [
    { id: 'EE', label: '30 menit', isCorrect: false },
    { id: 'FF', label: '35 menit', isCorrect: false },
    { id: 'GG', label: '40 menit', isCorrect: true },
    { id: 'HH', label: '45 menit', isCorrect: false },
    { id: 'II', label: '50 menit', isCorrect: false },
  ];

  // Hitung waktu dari kecepatan uji dinamis (Jarak tetap = 60 km)
  const calculatedHours = 60 / testSpeed;
  const calculatedMinutes = (calculatedHours * 60).toFixed(1);

  return (
    <section id="contoh" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2">
          <Gauge className="w-4 h-4" />
          <span>Analisis Studi Kasus Fisis</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contoh Soal 6: Grafik Perjalanan Menggunakan Mobil
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base">
          Perhatikan grafik hubungan antara kecepatan rata-rata mobil (<MathView math="v" />, km/jam) dan waktu perjalanan (<MathView math="t" />, jam) pada lintasan dengan jarak tetap berikut.
        </p>

        {/* Visualisasi Grafik Mobil & Soal */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Grafik SVG Representatif */}
          <div className="lg:col-span-6 bg-slate-900 p-4 rounded-xl shadow-inner flex flex-col items-center">
            <div className="w-full text-center text-xs text-slate-400 font-mono mb-2">
              Grafik Hubungan Kecepatan vs Waktu (Jarak Tempuh s = 60 km)
            </div>
            <svg viewBox="0 0 400 280" className="w-full max-w-[360px] h-auto select-none">
              {/* Axes */}
              <line x1="50" y1="240" x2="380" y2="240" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="240" x2="50" y2="20" stroke="#cbd5e1" strokeWidth="2" />
              
              {/* Axis Labels */}
              <text x="380" y="260" fill="#94a3b8" fontSize="11" textAnchor="end">Waktu (t, jam)</text>
              <text x="50" y="16" fill="#94a3b8" fontSize="11" textAnchor="start">Kecepatan (v, km/jam)</text>

              {/* Grid & Reference ticks */}
              {[1, 2, 3, 4, 5, 6].map((hour) => {
                const xPos = 50 + (hour / 7) * 310;
                return (
                  <g key={`tick-h-${hour}`}>
                    <line x1={xPos} y1="240" x2={xPos} y2="245" stroke="#94a3b8" />
                    <text x={xPos} y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">{hour}</text>
                  </g>
                );
              })}

              {[10, 12, 15, 20, 30, 60].map((v) => {
                const yPos = 240 - (v / 70) * 210;
                return (
                  <g key={`tick-v-${v}`}>
                    <line x1="45" y1={yPos} x2="50" y2={yPos} stroke="#94a3b8" />
                    <text x="40" y={yPos + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{v}</text>
                  </g>
                );
              })}

              {/* Kurva hiperbola v * t = 60 */}
              <path
                d="M 94,60 C 138,150 183,180 315,222"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />

              {/* Dotted lines untuk titik referensi */}
              {[
                { t: 1, v: 60 },
                { t: 2, v: 30 },
                { t: 3, v: 20 },
                { t: 6, v: 10 },
              ].map((pt, i) => {
                const xPos = 50 + (pt.t / 7) * 310;
                const yPos = 240 - (pt.v / 70) * 210;
                return (
                  <g key={`dot-${i}`}>
                    <line x1={xPos} y1="240" x2={xPos} y2={yPos} stroke="#475569" strokeDasharray="2,2" />
                    <line x1="50" y1={yPos} x2={xPos} y2={yPos} stroke="#475569" strokeDasharray="2,2" />
                    <circle cx={xPos} cy={yPos} r="4" fill="#38bdf8" />
                  </g>
                );
              })}
            </svg>
            <div className="mt-2 text-[11px] text-slate-400">
              Perhatikan pasangan koordinat: <span className="text-sky-300">(1, 60), (2, 30), (3, 20), (6, 10)</span>.
            </div>
          </div>

          {/* Kotak Soal & Opsi Pilihan Ganda */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900 text-base leading-relaxed">
                Soal 6: Berdasarkan grafik di atas, jika kecepatan rata-rata mobil ditingkatkan menjadi <span className="text-indigo-600 font-bold">90 km/jam</span>, maka waktu perjalanan yang ditempuh mobil tersebut adalah ....
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pilih Jawaban Anda:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map((opt) => {
                  const isChecked = selectedOption === opt.id;
                  const isCorrect = opt.isCorrect;
                  let btnStyle = "border-slate-200 bg-white hover:border-indigo-300 text-slate-700";
                  if (isChecked) {
                    btnStyle = isCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold"
                      : "border-rose-400 bg-rose-50 text-rose-800";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt.id);
                        if (!showSolution) setShowSolution(true);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm text-left transition-all ${btnStyle}`}
                    >
                      <span>
                        <strong className="mr-2 text-indigo-600">({opt.id})</strong> {opt.label}
                      </span>
                      {isChecked && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tombol Toggle Pembahasan */}
            <div className="pt-2">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold text-sm transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showSolution ? 'Sembunyikan Pembahasan Formal' : 'Lihat Pembahasan Lengkap SMA'}</span>
                {showSolution ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
              </button>
            </div>
          </div>
        </div>

        {/* Kotak Pembahasan Formal Terstruktur */}
        {showSolution && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Pembahasan Matematis Langkah Demi Langkah
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div className="font-bold text-slate-800 mb-1">Langkah 1: Menentukan Konstanta Jarak</div>
                <p className="text-slate-600 mb-2">
                  Berdasarkan konsep gerak lurus beraturan (<MathView math="s = v \cdot t" />), ambil sembarang titik koordinat pada grafik:
                </p>
                <div className="bg-white p-2 rounded border border-slate-200/80 font-mono text-xs text-indigo-700">
                  <MathView math="s = 60 \text{ km/jam} \times 1 \text{ jam} = 60 \text{ km}" />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div className="font-bold text-slate-800 mb-1">Langkah 2: Menghitung Waktu Tempuh</div>
                <p className="text-slate-600 mb-2">
                  Gunakan persamaan perbandingan berbalik nilai untuk kecepatan <MathView math="v = 90 \text{ km/jam}" />:
                </p>
                <div className="bg-white p-2 rounded border border-slate-200/80 font-mono text-xs text-indigo-700">
                  <MathView math="t = \frac{s}{v} = \frac{60}{90} = \frac{2}{3} \text{ jam}" />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div className="font-bold text-slate-800 mb-1">Langkah 3: Konversi Satuan Waktu</div>
                <p className="text-slate-600 mb-2">
                  Konversikan waktu dari satuan jam ke menit (<MathView math="1 \text{ jam} = 60 \text{ menit}" />):
                </p>
                <div className="bg-white p-2 rounded border border-slate-200/80 font-mono text-xs text-emerald-700 font-bold">
                  <MathView math="t = \frac{2}{3} \times 60 \text{ menit} = 40 \text{ menit}" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center justify-between">
              <div>
                <strong>Kesimpulan Akhir:</strong> Waktu yang dibutuhkan adalah <strong>40 menit</strong>. Pilihan jawaban yang tepat adalah <strong>(GG)</strong>.
              </div>
            </div>

            {/* Kalkulator Uji Kecepatan Dinamis */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                    Kalkulator Simulasi Kecepatan Lain
                  </span>
                  <p className="text-xs text-slate-500">
                    Uji kecepatan apa pun untuk melihat waktu tempuh pada rute 60 km ini:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={testSpeed}
                    onChange={(e) => setTestSpeed(Math.max(1, Number(e.target.value)))}
                    className="w-24 px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                  <span className="text-xs text-slate-600">km/jam</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg text-sm border border-indigo-100">
                    {calculatedMinutes} menit
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExampleSection;
