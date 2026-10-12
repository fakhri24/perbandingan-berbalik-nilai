import React, { useState, useId } from 'react';
import MathView from './MathView';
import { Gauge, Check, HelpCircle, ChevronDown, ChevronUp, Crosshair } from 'lucide-react';

interface PointData {
  t: number;
  v: number;
  label?: string;
  isQuestionTarget?: boolean;
}

export const ExampleSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [testSpeed, setTestSpeed] = useState<number>(90);
  const [activePoint, setActivePoint] = useState<PointData | null>(null);
  const [showTargetOnGraph, setShowTargetOnGraph] = useState<boolean>(false);
  const clipId = useId();

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

  // Titik acuan sesuai buku cetak: (t, v) di mana v = 60 / t
  const referencePoints: PointData[] = [
    { t: 1, v: 60, label: '(1, 60)' },
    { t: 2, v: 30, label: '(2, 30)' },
    { t: 3, v: 20, label: '(3, 20)' },
    { t: 4, v: 15, label: '(4, 15)' },
    { t: 5, v: 12, label: '(5, 12)' },
    { t: 6, v: 10, label: '(6, 10)' },
  ];

  // Titik target dari Soal 6: v = 90 km/jam -> t = 60/90 = 2/3 jam = 40 menit
  const targetPoint: PointData = {
    t: 2 / 3,
    v: 90,
    label: '(2/3 jam, 90)',
    isQuestionTarget: true,
  };

  // Dimensi SVG & Skala Matematis Presisi
  const width = 480;
  const height = 370;
  const padding = { top: 40, right: 35, bottom: 65, left: 65 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Rentang nilai koordinat (menyesuaikan jika menampilkan titik target 90 km/jam)
  const maxT = 7;
  const maxV = showTargetOnGraph ? 100 : 75;

  const scaleX = (t: number) => padding.left + (t / maxT) * graphWidth;
  const scaleY = (v: number) => height - padding.bottom - (v / maxV) * graphHeight;

  // Generate kurva hiperbola v = 60 / t secara matematis presisi
  const curvePoints: string[] = [];
  const tMin = 60 / (maxV - 2); // Mulai sesaat sebelum batas atas
  const tMax = 6.7;
  const numSteps = 120;
  for (let i = 0; i <= numSteps; i++) {
    const t = tMin + (i / numSteps) * (tMax - tMin);
    const v = 60 / t;
    curvePoints.push(`${scaleX(t).toFixed(2)},${scaleY(v).toFixed(2)}`);
  }
  const curvePathD = `M ${curvePoints.join(' L ')}`;

  const currentPoints = showTargetOnGraph ? [...referencePoints, targetPoint] : referencePoints;

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
          Perhatikan grafik kurva hiperbola antara kecepatan rata-rata mobil (<MathView math="v" />, km/jam) dan waktu tempuh (<MathView math="t" />, jam) pada jarak tetap <MathView math="s = 60 \text{ km}" /> berikut.
        </p>

        {/* Visualisasi Grafik Mobil & Soal */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Grafik SVG Representatif Presisi Tinggi */}
          <div className="lg:col-span-6 bg-slate-900 p-4 rounded-xl shadow-inner flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 font-mono mb-2 px-1">
              <span>Kurva Hiperbola: <MathView math="v \cdot t = 60 \text{ km}" /></span>
              <button
                onClick={() => setShowTargetOnGraph(!showTargetOnGraph)}
                className={`px-2 py-0.5 rounded text-[11px] font-sans font-semibold transition-colors cursor-pointer ${
                  showTargetOnGraph
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
                title="Tampilkan titik target soal 90 km/jam pada grafik"
              >
                {showTargetOnGraph ? '✓ Titik Soal (90 km/jam)' : '+ Titik Soal (90 km/jam)'}
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[460px] h-auto mx-auto select-none">
                <defs>
                  <clipPath id={clipId}>
                    <rect
                      x={padding.left}
                      y={padding.top}
                      width={graphWidth}
                      height={graphHeight}
                    />
                  </clipPath>
                </defs>

                {/* Sumbu X dan Sumbu Y */}
                <line
                  x1={padding.left}
                  y1={height - padding.bottom}
                  x2={width - padding.right + 15}
                  y2={height - padding.bottom}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <line
                  x1={padding.left}
                  y1={height - padding.bottom}
                  x2={padding.left}
                  y2={padding.top - 15}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                {/* Grid Horisontal & Label Sumbu Y Utama */}
                {(showTargetOnGraph ? [20, 40, 60, 80, 100] : [10, 20, 30, 40, 50, 60, 70]).map((v) => {
                  const yPos = scaleY(v);
                  return (
                    <g key={`grid-v-${v}`}>
                      <line
                        x1={padding.left}
                        y1={yPos}
                        x2={width - padding.right}
                        y2={yPos}
                        stroke="#334155"
                        strokeDasharray="2,2"
                        strokeWidth="0.7"
                      />
                      <line
                        x1={padding.left - 4}
                        y1={yPos}
                        x2={padding.left}
                        y2={yPos}
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                      />
                      <text
                        x={padding.left - 8}
                        y={yPos + 4}
                        fill="#94a3b8"
                        fontSize="10"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {v}
                      </text>
                    </g>
                  );
                })}

                {/* Grid Vertikal & Ticks Sumbu X (0 - 6 jam) */}
                {[0, 1, 2, 3, 4, 5, 6].map((hour) => {
                  const xPos = scaleX(hour);
                  return (
                    <g key={`tick-h-${hour}`}>
                      <line
                        x1={xPos}
                        y1={padding.top}
                        x2={xPos}
                        y2={height - padding.bottom}
                        stroke="#334155"
                        strokeDasharray="2,2"
                        strokeWidth="0.7"
                      />
                      <line
                        x1={xPos}
                        y1={height - padding.bottom}
                        x2={xPos}
                        y2={height - padding.bottom + 5}
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                      />
                      <text
                        x={xPos}
                        y={height - padding.bottom + 18}
                        fill="#94a3b8"
                        fontSize="11"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {hour}
                      </text>
                    </g>
                  );
                })}

                {/* Label Sumbu (Diposisikan Aman Tanpa Menabrak Angka) */}
                <text
                  x={padding.left + graphWidth / 2}
                  y={height - 12}
                  fill="#f8fafc"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  Waktu Perjalanan (t, jam) →
                </text>
                <text
                  x={padding.left - 10}
                  y={padding.top - 15}
                  fill="#f8fafc"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="start"
                >
                  ↑ Kecepatan (v, km/jam)
                </text>

                {/* Kurva Hiperbola Matematik v = 60 / t */}
                <g clipPath={`url(#${clipId})`}>
                  <path
                    d={curvePathD}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Garis Proyeksi Dotted untuk Setiap Titik Koordinat */}
                {currentPoints.map((pt) => {
                  const xPos = scaleX(pt.t);
                  const yPos = scaleY(pt.v);
                  const isActive = activePoint?.t === pt.t;

                  return (
                    <g key={`proj-${pt.t}-${pt.v}`}>
                      {/* Garis putus-putus ke sumbu X */}
                      <line
                        x1={xPos}
                        y1={height - padding.bottom}
                        x2={xPos}
                        y2={yPos}
                        stroke={pt.isQuestionTarget ? '#fbbf24' : isActive ? '#10b981' : '#64748b'}
                        strokeDasharray="3,3"
                        strokeWidth={isActive || pt.isQuestionTarget ? '1.8' : '1'}
                      />
                      {/* Garis putus-putus ke sumbu Y */}
                      <line
                        x1={padding.left}
                        y1={yPos}
                        x2={xPos}
                        y2={yPos}
                        stroke={pt.isQuestionTarget ? '#fbbf24' : isActive ? '#10b981' : '#64748b'}
                        strokeDasharray="3,3"
                        strokeWidth={isActive || pt.isQuestionTarget ? '1.8' : '1'}
                      />
                    </g>
                  );
                })}

                {/* Titik-Titik Koordinat (Presisi 100% pada Kurva) */}
                {currentPoints.map((pt) => {
                  const xPos = scaleX(pt.t);
                  const yPos = scaleY(pt.v);
                  const isActive = activePoint?.t === pt.t;

                  return (
                    <g
                      key={`pt-${pt.t}-${pt.v}`}
                      className="cursor-pointer"
                      onClick={() => setActivePoint(pt)}
                      onMouseEnter={() => setActivePoint(pt)}
                    >
                      {/* Lingkaran Titik Luar (Glow saat aktif) */}
                      <circle
                        cx={xPos}
                        cy={yPos}
                        r={pt.isQuestionTarget ? '7' : isActive ? '6.5' : '5'}
                        fill={pt.isQuestionTarget ? '#fbbf24' : isActive ? '#10b981' : '#38bdf8'}
                        stroke="#ffffff"
                        strokeWidth={isActive || pt.isQuestionTarget ? '2.5' : '1.8'}
                      />

                      {/* Label Teks Koordinat di Samping Titik */}
                      <text
                        x={xPos + (pt.t < 2 ? 8 : pt.t > 4 ? -8 : 8)}
                        y={yPos + (pt.t > 4 ? -10 : -8)}
                        fill={pt.isQuestionTarget ? '#fef08a' : isActive ? '#6ee7b7' : '#e2e8f0'}
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor={pt.t > 4 ? 'end' : 'start'}
                        className="pointer-events-none drop-shadow-sm"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Info Titik Aktif / Tooltip */}
            <div className="w-full mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  {activePoint ? (
                    <span>
                      Titik Aktif: <strong className="text-white">v = {activePoint.v} km/jam</strong>, waktu = <strong className="text-white">{activePoint.t === 2/3 ? '40 menit (2/3 jam)' : `${activePoint.t} jam`}</strong> → <span className="text-emerald-400 font-mono">v × t = 60 km</span>
                    </span>
                  ) : (
                    <span>Arahkan kursor atau klik sembarang titik pada kurva untuk memeriksa hasil kali.</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Kotak Soal & Opsi Pilihan Ganda */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900 text-base leading-relaxed">
                Soal 6: Berdasarkan grafik di samping, jika kecepatan rata-rata mobil ditingkatkan menjadi <span className="text-indigo-600 font-bold">90 km/jam</span>, maka waktu perjalanan yang ditempuh mobil tersebut adalah ....
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
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold ring-1 ring-emerald-500"
                      : "border-rose-400 bg-rose-50 text-rose-800 ring-1 ring-rose-400";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt.id);
                        if (!showSolution) setShowSolution(true);
                        if (opt.isCorrect) setShowTargetOnGraph(true);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm text-left transition-all cursor-pointer ${btnStyle}`}
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold text-sm transition-colors cursor-pointer"
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
