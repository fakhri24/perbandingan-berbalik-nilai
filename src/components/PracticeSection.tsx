import React, { useState } from 'react';
import MathView from './MathView';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, ChevronDown, ChevronUp, RotateCcw, HelpCircle } from 'lucide-react';

interface QuestionItem {
  id: number;
  text: string;
  options: { key: string; label: string; isCorrect: boolean }[];
  steps: {
    title: string;
    explanation: string;
    math: string;
  }[];
  finalAnswerKey: string;
  finalAnswerLabel: string;
}

const practiceQuestions: QuestionItem[] = [
  {
    id: 9,
    text: 'Jika seluruh ternak dilepas bersamaan untuk makan, rumput akan habis dalam waktu ....',
    options: [
      { key: 'RRRR', label: '14/13 jam', isCorrect: false },
      { key: 'SSSS', label: '13/12 jam', isCorrect: false },
      { key: 'TTTT', label: '1 jam', isCorrect: false },
      { key: 'UUUU', label: '12/13 jam', isCorrect: true },
      { key: 'VVVV', label: '13/14 jam', isCorrect: false },
    ],
    steps: [
      {
        title: 'Langkah 1: Menghitung Laju Makan Individual per Jam',
        explanation: 'Kecepatan makan masing-masing ternak menyatakan bagian padang rumput yang diselesaikan dalam 1 jam:',
        math: 'v_{\\text{sapi}} = \\frac{1}{2}, \\quad v_{\\text{kerbau}} = \\frac{1}{3}, \\quad v_{\\text{kambing}} = \\frac{1}{4}',
      },
      {
        title: 'Langkah 2: Menjumlahkan Laju Gabungan Seluruh Ternak',
        explanation: 'Karena makan secara simultan (bersama-sama), laju kerja dijumlahkan dengan menyamakan penyebut (KPK 12):',
        math: 'v_{\\text{total}} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} = \\frac{6 + 4 + 3}{12} = \\frac{13}{12} \\text{ bagian/jam}',
      },
      {
        title: 'Langkah 3: Menentukan Waktu Penyelesaian',
        explanation: 'Waktu yang dibutuhkan untuk menyelesaikan 1 padang rumput penuh adalah kebalikan dari laju total:',
        math: 't = \\frac{1}{v_{\\text{total}}} = \\frac{1}{\\frac{13}{12}} = \\frac{12}{13} \\text{ jam}',
      },
    ],
    finalAnswerKey: 'UUUU',
    finalAnswerLabel: '12/13 jam',
  },
  {
    id: 10,
    text: 'Pak Burhan melepaskan kambing terlebih dahulu. Setelah setengah bagian padang rumput dimakan kambing, sapi dan kerbau dilepas bersamaan untuk menghabiskan sisa rumput, sedangkan kambing dimasukkan kembali ke kandang. Total waktu dari awal hingga rumput habis adalah ....',
    options: [
      { key: 'WWWW', label: '2 jam', isCorrect: false },
      { key: 'XXXX', label: '2 jam 24 menit', isCorrect: false },
      { key: 'YYYY', label: '2 jam 36 menit', isCorrect: true },
      { key: 'ZZZZ', label: '2 jam 40 menit', isCorrect: false },
      { key: 'AAAAA', label: '2 jam 48 menit', isCorrect: false },
    ],
    steps: [
      {
        title: 'Langkah 1: Menghitung Waktu Tahap Pertama (Kambing)',
        explanation: 'Kambing memakan setengah (1/2) bagian padang rumput dengan laju 1/4 bagian per jam:',
        math: 't_1 = \\frac{1/2}{1/4} = \\frac{1}{2} \\times 4 = 2 \\text{ jam}',
      },
      {
        title: 'Langkah 2: Menghitung Waktu Tahap Kedua (Sapi & Kerbau)',
        explanation: 'Sisa rumput adalah 1/2 bagian. Laju gabungan sapi dan kerbau adalah (1/2 + 1/3 = 5/6):',
        math: 't_2 = \\frac{1/2}{v_{\\text{sapi}} + v_{\\text{kerbau}}} = \\frac{1/2}{5/6} = \\frac{1}{2} \\times \\frac{6}{5} = \\frac{3}{5} \\text{ jam} = 36 \\text{ menit}',
      },
      {
        title: 'Langkah 3: Menjumlahkan Total Waktu',
        explanation: 'Total durasi dari awal pengerjaan hingga padang rumput habis:',
        math: 't_{\\text{total}} = 2 \\text{ jam} + 36 \\text{ menit} = 2 \\text{ jam } 36 \\text{ menit}',
      },
    ],
    finalAnswerKey: 'YYYY',
    finalAnswerLabel: '2 jam 36 menit',
  },
  {
    id: 11,
    text: 'Bagian padang rumput yang tersisa jika sapi, kerbau, dan kambing makan bersamaan selama 20 menit adalah ....',
    options: [
      { key: 'BBBBB', label: '23/36 bagian', isCorrect: true },
      { key: 'CCCCC', label: '2/3 bagian', isCorrect: false },
      { key: 'DDDDD', label: '25/36 bagian', isCorrect: false },
      { key: 'EEEEE', label: '13/36 bagian', isCorrect: false },
      { key: 'FFFFF', label: '3/4 bagian', isCorrect: false },
    ],
    steps: [
      {
        title: 'Langkah 1: Konversi Waktu ke Satuan Jam',
        explanation: 'Durasi makan bersama adalah 20 menit:',
        math: 't = 20 \\text{ menit} = \\frac{20}{60} = \\frac{1}{3} \\text{ jam}',
      },
      {
        title: 'Langkah 2: Menghitung Bagian yang Berhasil Dimakan',
        explanation: 'Dengan laju gabungan 13/12 bagian/jam:',
        math: 'W_{\\text{termakan}} = v_{\\text{total}} \\times t = \\frac{13}{12} \\times \\frac{1}{3} = \\frac{13}{36} \\text{ bagian}',
      },
      {
        title: 'Langkah 3: Menghitung Sisa Padang Rumput',
        explanation: 'Pertanyaan menanyakan bagian padang rumput yang TERSISA:',
        math: 'W_{\\text{sisa}} = 1 - W_{\\text{termakan}} = 1 - \\frac{13}{36} = \\frac{36 - 13}{36} = \\frac{23}{36} \\text{ bagian}',
      },
    ],
    finalAnswerKey: 'BBBBB',
    finalAnswerLabel: '23/36 bagian',
  },
  {
    id: 12,
    text: 'Pak Burhan menjual kerbaunya dan menggantinya dengan satu ekor kambing. Kecepatan makan kambing baru sama dengan kambing sebelumnya. Jika seluruh ternak dilepas bersamaan, rumput akan habis dalam waktu ....',
    options: [
      { key: 'GGGGG', label: '30 menit', isCorrect: false },
      { key: 'HHHHH', label: '45 menit', isCorrect: false },
      { key: 'IIIII', label: '1 jam', isCorrect: true },
      { key: 'JJJJJ', label: '1 jam 15 menit', isCorrect: false },
      { key: 'KKKKK', label: '1 jam 30 menit', isCorrect: false },
    ],
    steps: [
      {
        title: 'Langkah 1: Menentukan Komposisi Ternak Baru',
        explanation: 'Ternak yang ada sekarang terdiri dari 1 ekor sapi dan 2 ekor kambing identik:',
        math: 'v_{\\text{sapi}} = \\frac{1}{2}, \\quad v_{\\text{kambing}_1} = \\frac{1}{4}, \\quad v_{\\text{kambing}_2} = \\frac{1}{4}',
      },
      {
        title: 'Langkah 2: Menghitung Laju Gabungan Baru',
        explanation: 'Jumlahkan seluruh laju makan:',
        math: 'v_{\\text{baru}} = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2} + \\frac{2}{4} = \\frac{1}{2} + \\frac{1}{2} = 1 \\text{ bagian/jam}',
      },
      {
        title: 'Langkah 3: Menghitung Waktu Penyelesaian',
        explanation: 'Waktu yang diperlukan untuk menghabiskan 1 padang rumput penuh:',
        math: 't = \\frac{1}{v_{\\text{baru}}} = \\frac{1}{1} = 1 \\text{ jam}',
      },
    ],
    finalAnswerKey: 'IIIII',
    finalAnswerLabel: '1 jam',
  },
];

interface PracticeSectionProps {
  forceShowSolutions?: boolean;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ forceShowSolutions = false }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const handleSelectAnswer = (qId: number, key: string, isCorrect: boolean) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: key }));
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const toggleSolution = (qId: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setRevealedSolutions({});
  };

  // Skor
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = practiceQuestions.filter((q) => {
    const chosen = userAnswers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return chosen === correctOpt?.key;
  }).length;

  return (
    <section id="latihan" className="space-y-6">
      {/* Header & Stimulus Padang Rumput */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
              <Award className="w-3.5 h-3.5" /> Latihan Mandiri Interaktif
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latihan Soal Nomor 9–12: Padang Rumput Pak Burhan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Kerjakan soal-soal berikut untuk menguji pemahaman konsep perbandingan berbalik nilai dan laju kerja gabungan (*work rate*).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Skor Anda</div>
              <div className="text-xl font-bold font-mono text-emerald-600">
                {correctCount} / {practiceQuestions.length}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Reset Semua Jawaban"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Kotak Stimulus Soal */}
        <div className="mt-6 bg-amber-50/60 rounded-xl border border-amber-200/80 p-5">
          <div className="font-bold text-amber-950 text-base mb-2">
            🌾 Stimulus Bacaan (Dasar untuk Soal Nomor 9–12)
          </div>
          <p className="text-slate-800 text-sm leading-relaxed mb-4">
            Pak Burhan memiliki tiga ekor hewan ternak, yaitu seekor <strong>sapi</strong>, seekor <strong>kerbau</strong>, dan seekor <strong>kambing</strong>. Sapi mampu menghabiskan seluruh rumput di padang tersebut dalam <strong>2 jam</strong>. Kerbau dan kambing masing-masing membutuhkan <strong>3 jam</strong> dan <strong>4 jam</strong> untuk menghabiskan sendiri seluruh rumput.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/90 p-3 rounded-lg border border-amber-200 shadow-2xs">
              <span className="font-bold text-slate-700 block">Sapi 🐮</span>
              <span className="text-slate-500">Durasi mandiri: <strong>2 jam</strong></span>
              <div className="font-mono text-indigo-600 mt-1">Laju: 1/2 bagian/jam</div>
            </div>
            <div className="bg-white/90 p-3 rounded-lg border border-amber-200 shadow-2xs">
              <span className="font-bold text-slate-700 block">Kerbau 🐃</span>
              <span className="text-slate-500">Durasi mandiri: <strong>3 jam</strong></span>
              <div className="font-mono text-indigo-600 mt-1">Laju: 1/3 bagian/jam</div>
            </div>
            <div className="bg-white/90 p-3 rounded-lg border border-amber-200 shadow-2xs">
              <span className="font-bold text-slate-700 block">Kambing 🐐</span>
              <span className="text-slate-500">Durasi mandiri: <strong>4 jam</strong></span>
              <div className="font-mono text-indigo-600 mt-1">Laju: 1/4 bagian/jam</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Soal 9 - 12 */}
      <div className="space-y-6">
        {practiceQuestions.map((q, index) => {
          const selectedKey = userAnswers[q.id];
          const hasAnswered = !!selectedKey;
          const isShowSolution = forceShowSolutions || revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm">
                    {q.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Soal Latihan #{index + 1}
                  </span>
                </div>

                {hasAnswered && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    {selectedKey === q.finalAnswerKey ? (
                      <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" /> Benar
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Belum Tepat
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-4 text-slate-800 font-semibold text-base leading-relaxed">
                {q.text}
              </p>

              {/* Opsi Pilihan Ganda */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {q.options.map((opt) => {
                  const isChecked = selectedKey === opt.key;
                  let style = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';

                  if (isChecked) {
                    style = opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500'
                      : 'bg-rose-50 border-rose-400 text-rose-900 font-semibold ring-1 ring-rose-400';
                  } else if (isShowSolution && opt.isCorrect) {
                    style = 'bg-emerald-50/50 border-emerald-300 text-emerald-800 font-semibold';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectAnswer(q.id, opt.key, opt.isCorrect)}
                      className={`p-3 rounded-xl border text-sm text-left transition-all flex items-center justify-between ${style}`}
                    >
                      <span>
                        <strong className="text-indigo-600 mr-1.5">({opt.key})</strong>
                        {opt.label}
                      </span>
                      {isChecked && opt.isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isChecked && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tombol Toggle Pembahasan */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isShowSolution ? 'Sembunyikan Pembahasan Formal' : 'Lihat Pembahasan Langkah Demi Langkah'}</span>
                  {isShowSolution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {hasAnswered && (
                  <span className="text-xs text-slate-400">
                    Kunci: <strong>({q.finalAnswerKey})</strong> {q.finalAnswerLabel}
                  </span>
                )}
              </div>

              {/* Pembahasan Lengkap Terstruktur */}
              {isShowSolution && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-slate-50/80 p-5 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Langkah Penyelesaian Matematis Soal {q.id}
                  </div>
                  <div className="space-y-3">
                    {q.steps.map((st, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-900 mb-1">{st.title}</div>
                        <p className="text-slate-600 mb-2">{st.explanation}</p>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100 font-mono text-indigo-700">
                          <MathView math={st.math} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                    <span>Jawaban yang Benar: ({q.finalAnswerKey}) {q.finalAnswerLabel}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ringkasan Skor jika sudah selesai semua */}
      {answeredCount === practiceQuestions.length && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">Latihan Mandiri Selesai!</h3>
          <p className="text-slate-300 text-sm mt-1">
            Anda berhasil menjawab dengan skor <strong>{correctCount} dari {practiceQuestions.length}</strong> ({((correctCount / practiceQuestions.length) * 100).toFixed(0)}%).
          </p>
          <button
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Ulangi Latihan
          </button>
        </div>
      )}
    </section>
  );
};

export default PracticeSection;
