import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CodeBlock from './CodeBlock.jsx';
import MermaidRenderer from './MermaidRenderer.jsx';

export default function QuestionCard({
  question,
  interviewMode = false,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [hasRevealed, setHasRevealed] = useState(!interviewMode && defaultExpanded);

  useEffect(() => {
    if (!interviewMode) {
      setHasRevealed(true);
    } else {
      setHasRevealed(false);
    }
  }, [interviewMode]);

  const chips = useMemo(() => {
    const values = [];
    if (question.topic) {
      values.push(question.topic);
    }
    if (question.difficulty) {
      values.push(question.difficulty);
    }
    return values;
  }, [question.topic, question.difficulty]);


  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
    >
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{question.id}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-slate-900 dark:text-slate-50">{question.question}</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsExpanded((value) => !value);
              setHasRevealed((value) => value || !interviewMode);
            }}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            {isExpanded ? 'Hide' : 'Show'}
          </button>
        </div>
        {chips.length ? (
          <ul className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full bg-slate-200/70 px-3 py-1 dark:bg-slate-800/70">
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              {interviewMode && !hasRevealed ? (
                <div className="rounded-2xl border border-dashed border-blue-400/60 bg-blue-50/70 p-6 text-center text-sm text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/10 dark:text-blue-200">
                  Ready to check the answer?
                  <button
                    type="button"
                    className="ml-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-blue-600"
                    onClick={() => setHasRevealed(true)}
                  >
                    Reveal Answer
                  </button>
                </div>
              ) : (
                <motion.div layout className="space-y-6">
                  <section className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Answer</h4>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-200">{question.answer}</p>
                  </section>
                  {question.code ? (
                    <section className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Example Code</h4>
                      <CodeBlock code={question.code} language={question.language ?? 'java'} />
                    </section>
                  ) : null}
                  {question.explanation ? (
                    <section className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Deep Dive</h4>
                      <p className="leading-relaxed text-slate-700 dark:text-slate-200">{question.explanation}</p>
                    </section>
                  ) : null}
                  {question.mermaidDiagram ? (
                    <section className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Diagram</h4>
                      <MermaidRenderer diagram={question.mermaidDiagram} />
                    </section>
                  ) : null}
                  {question.references?.length ? (
                    <section className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">References</h4>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-blue-600 dark:text-blue-300">
                        {question.references.map((reference) => (
                          <li key={reference.href ?? reference}>
                            {reference.href ? (
                              <a
                                className="underline-offset-2 hover:underline"
                                href={reference.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {reference.label ?? reference.href}
                              </a>
                            ) : (
                              reference
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex justify-end text-xs text-blue-600 underline-offset-2 hover:underline dark:text-blue-300">
        <Link to={`/questions/${encodeURIComponent(question.id)}`}>Open detail view →</Link>
      </div>
    </motion.article>
  );
}
