import { useState } from 'react';
import { TheorySection } from './components/TheorySection';
import { InteractiveHyperbola } from './components/InteractiveHyperbola';
import { ExampleSection } from './components/ExampleSection';
import { PracticeSection } from './components/PracticeSection';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import {
  BookOpen,
  Sliders,
  Award,
  GraduationCap,
  Printer,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'teori' | 'lab' | 'contoh' | 'latihan'>('all');
  const [teacherMode, setTeacherMode] = useState<boolean>(false);
  const [forceShowSolutions, setForceShowSolutions] = useState<boolean>(false);
  const [showWorksheetModal, setShowWorksheetModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar Atas */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-xs">
              📉
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                Perbandingan Berbalik Nilai
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Matematika SMA Fase E • Kurikulum Merdeka
              </div>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua Modul
            </button>
            <button
              onClick={() => setActiveTab('teori')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'teori' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Teori Dasar
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'lab' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Lab Hiperbola
            </button>
            <button
              onClick={() => setActiveTab('contoh')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'contoh' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Contoh Soal 6
            </button>
            <button
              onClick={() => setActiveTab('latihan')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'latihan' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Latihan Soal 9–12
            </button>
          </nav>

          {/* Action Buttons: Mode Guru & Cetak LKPD */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTeacherMode(!teacherMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                teacherMode
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-400/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
              title="Aktifkan kontrol pedagogis guru"
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Mode Guru</span>
            </button>

            <button
              onClick={() => setShowWorksheetModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak LKPD</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bar Pemberitahuan Mode Guru Aktif */}
      {teacherMode && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-3 no-print animate-in fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Panel Guru Aktif:</strong> Anda dapat mengontrol keterbukaan kunci jawaban dan mencetak lembar kerja siswa.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setForceShowSolutions(!forceShowSolutions)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100/50 transition-colors cursor-pointer"
              >
                {forceShowSolutions ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{forceShowSolutions ? 'Sembunyikan Kunci Jawaban' : 'Tampilkan Semua Kunci & Pembahasan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Media Pembelajaran Digital Matematika SMA
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Eksplorasi Konseptual & Praktis Perbandingan Berbalik Nilai
            </h1>
            <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed">
              Selamat datang pada portal pembelajaran interaktif materi perbandingan berbalik nilai (*inverse proportion*). Dilengkapi dengan formulasi matematis baku SMA, laboratorium kurva hiperbola interaktif, telaah kasus fisik perjalanan mobil, dan pemecahan masalah padang rumput Pak Burhan.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <a
                href="#teori"
                onClick={() => setActiveTab('teori')}
                className="px-4 py-2.5 rounded-xl bg-white text-indigo-950 font-bold hover:bg-indigo-50 transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" /> Pelajari Teori
              </a>
              <a
                href="#lab"
                onClick={() => setActiveTab('lab')}
                className="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold transition-colors border border-indigo-500/40 inline-flex items-center gap-1.5"
              >
                <Sliders className="w-4 h-4 text-emerald-400" /> Coba Lab Visual
              </a>
              <a
                href="#latihan"
                onClick={() => setActiveTab('latihan')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" /> Kuis Soal 9–12
              </a>
            </div>
          </div>
        </div>

        {/* Komponen-Komponen Materi Sesuai Tab / Mode */}
        {(activeTab === 'all' || activeTab === 'teori') && (
          <div id="teori" className="scroll-mt-20">
            <TheorySection />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'lab') && (
          <div id="lab" className="scroll-mt-20">
            <InteractiveHyperbola />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'contoh') && (
          <div id="contoh" className="scroll-mt-20">
            <ExampleSection />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'latihan') && (
          <div id="latihan" className="scroll-mt-20">
            <PracticeSection forceShowSolutions={forceShowSolutions} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 no-print text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-700">Perbandingan Berbalik Nilai • Media Ajar SMA</div>
            <div>Dirancang berdasarkan referensi kurikulum matematika & bank soal resmi.</div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fakhri24/perbandingan-berbalik-nilai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Repositori GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal LKPD Cetak */}
      {showWorksheetModal && (
        <PrintableWorksheet onClose={() => setShowWorksheetModal(false)} />
      )}
    </div>
  );
}

export default App;
