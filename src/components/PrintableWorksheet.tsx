import React from 'react';
import MathView from './MathView';
import { Printer, X } from 'lucide-react';

interface PrintableWorksheetProps {
  onClose: () => void;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs overflow-y-auto flex justify-center p-4 sm:p-6 print:p-0 print:static print:bg-white print:overflow-visible">
      {/* Floating Toolbar (hanya tampil di layar) */}
      <div className="no-print fixed top-4 right-4 sm:right-8 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
        <button
          onClick={onClose}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          title="Tutup Pratinjau"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dokumen LKPD Fisik (Kertas A4) */}
      <div className="bg-white text-slate-900 w-full max-w-[850px] p-8 md:p-12 rounded-2xl shadow-2xl my-8 print:my-0 print:p-0 print:shadow-none print:w-full print:max-w-none text-sm leading-relaxed border border-slate-200 print:border-none">
        {/* Kop Lembar Kerja */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-slate-900">
            Lembar Kerja Peserta Didik (LKPD)
          </h1>
          <h2 className="text-base font-bold text-slate-700 mt-0.5">
            Materi: Perbandingan Berbalik Nilai & Laju Kerja Simultan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Matematika Wajib — Fase E (Kelas X) SMA | Kurikulum Merdeka
          </p>
        </div>

        {/* Identitas Peserta Didik */}
        <div className="grid grid-cols-2 gap-4 my-6 p-4 border border-slate-300 rounded-lg text-xs">
          <div>
            <div className="mb-2"><strong>Nama Siswa:</strong> ___________________________________</div>
            <div><strong>Nomor Presensi:</strong> ___________________________________</div>
          </div>
          <div>
            <div className="mb-2"><strong>Kelas / Fase:</strong> ___________________________________</div>
            <div><strong>Tanggal Pelaksanaan:</strong> ___________________________</div>
          </div>
        </div>

        {/* Capaian & Tujuan Pembelajaran */}
        <div className="mb-6 text-xs text-slate-700 space-y-1 bg-slate-50 p-3 rounded border border-slate-200">
          <div><strong>Tujuan Pembelajaran:</strong></div>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
            <li>Peserta didik mampu mengidentifikasi karakteristik relasi perbandingan berbalik nilai (<MathView math="x \cdot y = k" />).</li>
            <li>Peserta didik mampu memodelkan dan menyelesaikan masalah kontekstual yang melibatkan laju kerja (*work rate*) gabungan.</li>
          </ul>
        </div>

        {/* Ringkasan Teori */}
        <div className="mb-6 border-l-4 border-indigo-600 pl-3 py-1">
          <div className="font-bold text-slate-900 text-xs mb-1">RANGKUMAN RUMUS INTI:</div>
          <div className="text-xs text-slate-700 flex flex-wrap gap-6 font-mono">
            <span>• Hasil kali konstan: <MathView math="x \cdot y = k" /></span>
            <span>• Proporsi terbalik: <MathView math="\frac{a_1}{a_2} = \frac{b_2}{b_1}" /></span>
            <span>• Laju gabungan: <MathView math="\frac{1}{t_{\text{total}}} = \sum \frac{1}{t_i}" /></span>
          </div>
        </div>

        {/* Bagian Soal 1 */}
        <div className="mb-8 space-y-3">
          <div className="font-bold text-slate-900 border-b border-slate-300 pb-1">
            Aktivitas 1: Analisis Grafik Mobil (Studi Kasus Jarak Tetap)
          </div>
          <p className="text-xs text-slate-800">
            Sebuah mobil melintasi jalan tol dengan hubungan kecepatan (<MathView math="v" />) dan waktu (<MathView math="t" />) sesuai tabel koordinat: (1 jam, 60 km/jam), (2 jam, 30 km/jam), (3 jam, 20 km/jam).
          </p>
          <div className="text-xs font-semibold text-slate-800">
            Pertanyaan: Jika mobil melaju dengan kecepatan rata-rata 90 km/jam, berapakah waktu tempuh yang dibutuhkan?
          </div>
          <div className="border border-dashed border-slate-400 rounded-lg p-4 min-h-[90px] text-xs text-slate-400">
            <em>Ruang Uraian dan Langkah Pengerjaan Siswa:</em>
          </div>
        </div>

        {/* Bagian Soal 2 */}
        <div className="mb-8 space-y-3">
          <div className="font-bold text-slate-900 border-b border-slate-300 pb-1">
            Aktivitas 2: Masalah Kontekstual Padang Rumput Pak Burhan
          </div>
          <p className="text-xs text-slate-800">
            Pak Burhan memiliki seekor sapi, kerbau, dan kambing. Masing-masing dapat menghabiskan seluruh rumput dalam waktu: Sapi = 2 jam, Kerbau = 3 jam, Kambing = 4 jam.
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <p className="font-semibold text-slate-800">
                1. Jika seluruh ternak dilepas bersamaan, dalam berapa jam seluruh rumput akan habis?
              </p>
              <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[80px] text-slate-400 mt-1">
                <em>Langkah perhitungan laju gabungan:</em>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                2. Kambing makan terlebih dahulu hingga 1/2 bagian padang rumput habis. Kemudian sapi dan kerbau dilepas bersamaan untuk menghabiskan sisanya (kambing dikandangkan). Berapa total waktu dari awal hingga rumput habis?
              </p>
              <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[90px] text-slate-400 mt-1">
                <em>Langkah perhitungan tahap 1 dan tahap 2:</em>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                3. Jika sapi, kerbau, dan kambing makan bersamaan selama 20 menit, tentukan sisa bagian padang rumput yang belum termakan!
              </p>
              <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[80px] text-slate-400 mt-1">
                <em>Langkah perhitungan bagian sisa:</em>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Penilaian & Tanda Tangan */}
        <div className="border-t-2 border-slate-900 pt-4 grid grid-cols-2 text-xs">
          <div>
            <div className="font-bold mb-1">Catatan / Umpan Balik Guru:</div>
            <div className="border border-slate-300 rounded p-2 min-h-[60px] text-slate-400">
              ..................................................................................
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="font-bold">Paraf Guru Pengampu:</div>
            <div className="mt-8">________________________</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableWorksheet;
