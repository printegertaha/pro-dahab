"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Loader2,
  XCircle,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const LOADING_MESSAGES = [
  "الذكاء الاصطناعي بيقرأ عن الموضوع بعمق...",
  "بنجهزلك أسئلة فيها تريكات تفك العقد...",
  "بنصيغ الاختيارات عشان نقيس مستواك بجد...",
  "لمسات أخيرة والـ Quiz هيولع...",
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [questionCount, setQuestionCount] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const [elapsedTime, setElapsedTime] = useState(0);
  const [extraLoops, setExtraLoops] = useState(0);

  const abortControllerRef = useRef(null);

  const getExpectedDuration = (count) => {
    switch (count) {
      case 5:
        return 12;
      case 10:
        return 25;
      case 15:
        return 38;
      case 20:
        return 50;
      default:
        return count * 2.5;
    }
  };

  const totalDuration = getExpectedDuration(questionCount);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    } else {
      setLoadingMsgIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    let timer;
    if (loading) {
      setElapsedTime(0);
      setExtraLoops(0);

      timer = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev + 1 >= totalDuration) {
            setExtraLoops((loops) => loops + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [loading, totalDuration]);

  async function generateQuiz() {
    if (!topic.trim()) {
      setError("اكتب موضوع الأول يا هندسة!");
      return;
    }

    setLoading(true);
    setError("");
    setFinished(false);
    setAnswers({});
    setQuestions([]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          topic,
          difficulty,
          questionCount,
          previousQuestions: questions.map((q) => q.question),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setQuestions(data.questions);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      if (error.name === "AbortError") {
        setError("تم إلغاء توليد الأسئلة بنجاح.");
      } else {
        setError(error.message || "حصل خطأ غير متوقع!");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }

  function cancelGeneration() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
  }

  function resetToSettings() {
    setQuestions([]);
    setFinished(false);
    setAnswers({});
    setError("");
  }

  function selectAnswer(questionIndex, optionIndex) {
    if (finished) return;
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
  }

  function calculateScore() {
    return questions.reduce((score, question, index) => {
      return answers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  }

  function finishQuiz() {
    setFinished(true);

    const score = calculateScore();
    const percentage = score / questions.length;

    if (percentage > 0.5) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#8b5cf6", "#10b981"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#8b5cf6", "#10b981"],
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } else {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  const progressPercent = Math.max(
    0,
    ((totalDuration - elapsedTime) / totalDuration) * 100,
  );

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-50 font-sans selection:bg-violet-500/30">
      <div className="mx-auto max-w-4xl">
        <header
          className="text-center mb-10"
          onClick={() => (window.location.href = "/quiz")}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-600/25 cursor-pointer"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>

          <h1 className="text-4xl font-black md:text-6xl tracking-tight">
            AI Quiz{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Generator
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            اكتب أي موضوع، اختار مستواك، والذكاء الاصطناعي هيصمم لك تحدي مخصوص
            في ثواني.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {questions.length === 0 ? (
            <motion.section
              key="settings-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-6 md:p-8 backdrop-blur-sm shadow-xl"
            >
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                الموضوع
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
                placeholder="مثال: إختبرني في أساسيات البرمجة..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/50 p-4 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-50"
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-300">
                    مستوى الصعوبة
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["beginner", "intermediate", "advanced"].map((level) => (
                      <button
                        key={level}
                        disabled={loading}
                        onClick={() => setDifficulty(level)}
                        className={`rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                          difficulty === level
                            ? "border-violet-500 bg-violet-600/20 text-violet-300 shadow-inner"
                            : "border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800 disabled:opacity-50"
                        }`}
                      >
                        {level === "beginner"
                          ? "مبتدئ"
                          : level === "intermediate"
                            ? "متوسط"
                            : "متقدم"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-300">
                    عدد الأسئلة
                  </label>
                  <select
                    value={questionCount}
                    disabled={loading}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 outline-none transition-all focus:border-violet-500 disabled:opacity-50 appearance-none"
                  >
                    {[5, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} أسئلة
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-5 flex items-center gap-3 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-red-400"
                  >
                    <XCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-violet-300/80">
                      <span>جاري معالجة الطلب بالذكاء الاصطناعي...</span>
                      <span className="flex items-center gap-1 font-mono">
                        {Math.max(0, totalDuration - elapsedTime)} ثانية تقريباً
                        {extraLoops > 0 && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-fuchsia-400 font-bold ml-1"
                          >
                            +{extraLoops}
                          </motion.span>
                        )}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-violet-500/20 shadow-inner">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-1000 ease-linear"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-7 flex gap-3">
                <button
                  onClick={generateQuiz}
                  disabled={loading || !topic.trim()}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-violet-600 py-4 font-bold transition-all hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 shadow-lg shadow-violet-600/20"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-violet-300" />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={loadingMsgIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm font-medium text-violet-200"
                        >
                          {LOADING_MESSAGES[loadingMsgIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>توليد الأسئلة</span>
                    </>
                  )}
                </button>

                {loading && (
                  <motion.button
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={cancelGeneration}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-red-900/50 bg-red-950/30 px-6 py-4 font-bold text-red-400 transition-colors hover:bg-red-900/50 shrink-0"
                  >
                    <X className="h-5 w-5" />
                    <span>إلغاء</span>
                  </motion.button>
                )}
              </div>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-8 space-y-4 pt-6 border-t border-slate-800/60"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>جاري بناء التحدي خصيصاً لك...</span>
                    <span className="animate-pulse text-violet-400">
                      AI Thinking...
                    </span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-800/40 bg-slate-950/30 p-4 animate-pulse"
                    >
                      <div className="h-4 bg-slate-800 rounded w-3/4 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-10 bg-slate-900/60 rounded-xl"></div>
                        <div className="h-10 bg-slate-900/60 rounded-xl"></div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.section>
          ) : (
            <motion.section
              key="quiz-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 font-bold border border-violet-500/30">
                    💡
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">الموضوع الحالي:</p>
                    <p className="font-bold text-slate-200 capitalize">
                      {topic?.slice(0, 100)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetToSettings}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>تغيير الموضوع أو المستوى</span>
                </button>
              </div>

              <div className="space-y-6">
                {questions.map((question, questionIndex) => (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: questionIndex * 0.08 }}
                    key={questionIndex}
                    className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-6 backdrop-blur-sm md:p-8 shadow-xl"
                  >
                    <div className="mb-5 flex items-center gap-3 border-b border-slate-800/60 pb-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 font-black ring-1 ring-violet-500/30">
                        {questionIndex + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        سؤال {questionIndex + 1} من {questions.length}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold leading-relaxed text-slate-100">
                      {question.question}
                    </h2>

                    <div className="mt-6 grid gap-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = answers[questionIndex] === optionIndex;
                        const correct = question.correctAnswer === optionIndex;

                        let style =
                          "border-slate-800 bg-slate-950/50 hover:border-slate-600 hover:bg-slate-800/80 text-slate-300";
                        let indicator = (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-slate-400">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                        );

                        if (!finished && selected) {
                          style =
                            "border-violet-500 bg-violet-600/10 text-violet-200 ring-1 ring-violet-500";
                          indicator = (
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                          );
                        }

                        if (finished) {
                          if (correct) {
                            style =
                              "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
                            indicator = (
                              <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-500" />
                            );
                          } else if (selected && !correct) {
                            style =
                              "border-red-500/50 bg-red-950/20 text-red-200 opacity-60";
                            indicator = (
                              <XCircle className="h-8 w-8 shrink-0 text-red-500" />
                            );
                          } else {
                            style += " opacity-40";
                          }
                        }

                        return (
                          <button
                            key={optionIndex}
                            disabled={finished}
                            onClick={() =>
                              selectAnswer(questionIndex, optionIndex)
                            }
                            className={`flex items-center gap-4 rounded-2xl border p-4 text-right transition-all duration-200 ${style}`}
                          >
                            {indicator}
                            <span className="flex-1 leading-relaxed">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {finished && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 overflow-hidden rounded-2xl bg-slate-950/50 border border-slate-800/60"
                        >
                          <div className="p-5">
                            <div className="flex items-center gap-2 font-bold text-emerald-400">
                              <Sparkles className="h-4 w-4" />
                              <p>الإجابة الصحيحة:</p>
                            </div>
                            <p className="mt-2 text-slate-200 font-medium">
                              {question.options[question.correctAnswer]}
                            </p>
                            {question.explanation && (
                              <p className="mt-3 text-sm leading-relaxed text-slate-400 border-t border-slate-800/60 pt-3">
                                {question.explanation}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                ))}
              </div>

              <div className="mt-8 mb-20">
                {!finished ? (
                  <button
                    onClick={finishQuiz}
                    disabled={Object.keys(answers).length < questions.length}
                    className="w-full rounded-2xl bg-emerald-600 py-4.5 font-bold text-lg shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {Object.keys(answers).length < questions.length
                      ? `جاوب باقي الأسئلة (${questions.length - Object.keys(answers).length} متبقي)`
                      : "إنهاء الاختبار واعرض النتيجة"}
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-3xl border border-violet-500/30 bg-violet-950/20 p-8 text-center backdrop-blur-md shadow-2xl"
                  >
                    <p className="text-violet-300 font-medium">
                      النتيجة النهائية
                    </p>
                    <p className="mt-2 text-6xl font-black text-white">
                      {calculateScore()}
                      <span className="text-3xl text-violet-500/50 mx-1">
                        /
                      </span>
                      <span className="text-4xl text-slate-400">
                        {questions.length}
                      </span>
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                      <button
                        onClick={resetToSettings}
                        className="rounded-xl bg-slate-800 px-6 py-3 font-bold transition hover:bg-slate-700 flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>تعديل الإعدادات والموضوع</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      {/* --- الفوتر الاحترافي العظمة --- */}

          {/* تطوير وبرمجة */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 bg-slate-950/60 px-4 py-2 rounded-2xl border border-slate-800/80 shadow-inner">
            <span>بمساعدة</span>
            <a
              href="https://instagram.com/t2tae"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 group"
            >
              <span>ChatGPT - Gemini</span>
              <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
    </main>
  );
}
