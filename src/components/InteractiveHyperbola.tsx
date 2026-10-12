import React, { useState, useId } from 'react';
import MathView from './MathView';
import { Sliders, RefreshCw, Info } from 'lucide-react';

export const InteractiveHyperbola: React.FC = () => {
  const [k, setK] = useState<number>(12);
  const [xVal, setXVal] = useState<number>(3);
  const clipId = useId();

  // Hitung y berdasarkan perbandingan berbalik nilai: y = k / x
  const yVal = parseFloat((k / xVal).toFixed(2));

  // Dimensi SVG
  const width = 520;
  const height = 360;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const maxX = 14;
  const maxY = 14;

  const scaleX = (x: number) => padding.left + (x / maxX) * graphWidth;
  const scaleY = (y: number) => height - padding.bottom - (y / maxY) * graphHeight;

  // Generate kurva hiperbola y = k / x
  const points: string[] = [];
  const step = 0.1;
  for (let x = 0.5; x <= maxX; x += step) {
    const y = k / x;
    if (y <= maxY + 1) {
      points.push(`${scaleX(x)},${scaleY(y)}`);
    }
  }
  const pathD = points.length > 0 ? `M ${points.join(' L ')}` : '';

  // Preset titik referensi seperti di gambar materi
  const presetPoints = [
    { label: 'A', x: 3, y: k / 3 },
    { label: 'B', x: 6, y: k / 6 },
    { label: 'C', x: 12, y: k / 12 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-1.5">
            <Sliders className="w-3.5 h-3.5" /> Laboratorium Visual
          </span>
          <h3 className="text-xl font-bold text-slate-900">Simulasi Grafik Kurva Hiperbola</h3>
          <p className="text-sm text-slate-500">
            Geser nilai <span className="font-semibold text-indigo-600">Konstanta (k)</span> dan <span className="font-semibold text-emerald-600">Variabel x</span> untuk mengamati sifat kurva asimtotik.
          </p>
        </div>
        <button
          onClick={() => { setK(12); setXVal(3); }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/70 px-3 py-2 rounded-lg transition-colors self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Nilai Acuan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Kontrol Interaktif */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="k-slider" className="text-sm font-semibold text-slate-700">
                Konstanta Hasil Kali (<MathView math="k" />)
              </label>
              <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-sm">
                k = {k}
              </span>
            </div>
            <input
              id="k-slider"
              type="range"
              min="4"
              max="24"
              step="1"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              aria-label="Konstanta Hasil Kali k"
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>k = 4</span>
              <span>k = 12 (Referensi)</span>
              <span>k = 24</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="x-slider" className="text-sm font-semibold text-slate-700">
                Variabel Bebas (<MathView math="x" />: Waktu / Bulan)
              </label>
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm">
                x = {xVal}
              </span>
            </div>
            <input
              id="x-slider"
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={xVal}
              onChange={(e) => setXVal(Number(e.target.value))}
              aria-label="Variabel Bebas x"
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 bulan</span>
              <span>6 bulan</span>
              <span>12 bulan</span>
            </div>
          </div>

          {/* Nilai Output Dinamis */}
          <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/50 p-4 rounded-xl border border-indigo-100">
            <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-2">
              Hasil Perhitungan Real-Time
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-indigo-100/70 shadow-xs">
                <div className="text-xs text-slate-500 mb-0.5">Variabel Terikat (<MathView math="y" />)</div>
                <div className="font-mono font-bold text-xl text-indigo-700">
                  {yVal} <span className="text-xs font-normal text-slate-500">pekerja</span>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-indigo-100/70 shadow-xs">
                <div className="text-xs text-slate-500 mb-0.5">Hasil Kali (<MathView math="x \cdot y" />)</div>
                <div className="font-mono font-bold text-xl text-emerald-600">
                  {(xVal * yVal).toFixed(1)} <span className="text-xs font-normal text-slate-500">(= k)</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600 bg-white/70 p-2.5 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                Ketika <MathView math="x" /> bernilai <strong>{xVal}</strong>, maka <MathView math={`y = \\frac{k}{x} = \\frac{${k}}{${xVal}} = ${yVal}`} />. Hasil kali keduanya selalu tetap yaitu <strong>{k}</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Grafik SVG */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full overflow-x-auto bg-slate-900 rounded-xl p-3 shadow-inner">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[500px] h-auto mx-auto select-none"
            >
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

              {/* Grid Lines */}
              {Array.from({ length: 7 }, (_, i) => i * 2).map((val) => (
                <g key={`grid-x-${val}`}>
                  <line
                    x1={scaleX(val)}
                    y1={padding.top}
                    x2={scaleX(val)}
                    y2={height - padding.bottom}
                    stroke="#334155"
                    strokeDasharray="2,2"
                    strokeWidth="0.8"
                  />
                  <text
                    x={scaleX(val)}
                    y={height - padding.bottom + 18}
                    fill="#94a3b8"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {Array.from({ length: 7 }, (_, i) => i * 2).map((val) => (
                <g key={`grid-y-${val}`}>
                  <line
                    x1={padding.left}
                    y1={scaleY(val)}
                    x2={width - padding.right}
                    y2={scaleY(val)}
                    stroke="#334155"
                    strokeDasharray="2,2"
                    strokeWidth="0.8"
                  />
                  <text
                    x={padding.left - 12}
                    y={scaleY(val) + 4}
                    fill="#94a3b8"
                    fontSize="11"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              ))}

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

              {/* Label Sumbu */}
              <text
                x={width - padding.right}
                y={height - padding.bottom + 36}
                fill="#f8fafc"
                fontSize="12"
                fontWeight="600"
                textAnchor="end"
              >
                Waktu (x, bulan) →
              </text>
              <text
                x={padding.left - 30}
                y={padding.top - 8}
                fill="#f8fafc"
                fontSize="12"
                fontWeight="600"
                textAnchor="start"
              >
                ↑ Banyak Pekerja (y)
              </text>

              {/* Kurva Hiperbola Utama */}
              <g clipPath={`url(#${clipId})`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* Garis Proyeksi Titik Aktif (xVal, yVal) */}
              <line
                x1={scaleX(xVal)}
                y1={height - padding.bottom}
                x2={scaleX(xVal)}
                y2={scaleY(yVal)}
                stroke="#10b981"
                strokeDasharray="4,4"
                strokeWidth="1.8"
              />
              <line
                x1={padding.left}
                y1={scaleY(yVal)}
                x2={scaleX(xVal)}
                y2={scaleY(yVal)}
                stroke="#10b981"
                strokeDasharray="4,4"
                strokeWidth="1.8"
              />

              {/* Titik Referensi A, B, C */}
              {presetPoints.map((pt) => {
                const isSelected = Math.abs(xVal - pt.x) < 0.2;
                return (
                  <g key={`pt-${pt.label}`}>
                    <circle
                      cx={scaleX(pt.x)}
                      cy={scaleY(pt.y)}
                      r={isSelected ? "6" : "4.5"}
                      fill={isSelected ? "#10b981" : "#f1f5f9"}
                      stroke={isSelected ? "#ffffff" : "#6366f1"}
                      strokeWidth="2"
                    />
                    <text
                      x={scaleX(pt.x) + 8}
                      y={scaleY(pt.y) - 8}
                      fill="#e2e8f0"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {pt.label} ({pt.x}, {pt.y.toFixed(1)})
                    </text>
                  </g>
                );
              })}

              {/* Titik Aktif */}
              <circle
                cx={scaleX(xVal)}
                cy={scaleY(yVal)}
                r="7"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Kurva hiperbola tidak pernah menyentuh sumbu X maupun sumbu Y (garis asimtot: <MathView math="x \neq 0" /> dan <MathView math="y \neq 0" />).
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHyperbola;
