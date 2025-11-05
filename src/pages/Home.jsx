import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const highlights = [
  {
    title: 'Searchable Q&A Library',
    description: 'Instantly filter hundreds of Java interview questions by keyword, topic, or difficulty.',
  },
  {
    title: 'Practice Interview Mode',
    description: 'Hide answers by default to rehearse live interview scenarios with timed reveals.',
  },
  {
    title: 'Visual Explanations',
    description: 'Mermaid diagrams and syntax-highlighted code blocks bring complex topics to life.',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-[1px] shadow-xl dark:border-slate-800">
        <div className="relative h-full w-full rounded-3xl bg-white/95 p-10 dark:bg-slate-950/95">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
              Java Interview Toolkit
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 dark:text-white">
              Master Java interviews with interactive flashcards, diagrams, and curated notes.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Browse structured question sets, reveal answers when you are ready, and review explanations enhanced with Mermaid diagrams and syntax-highlighted code samples drawn from your curated course materials.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/questions"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
              >
                Explore Questions
              </Link>
              <a
                href="https://www.udemy.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
              >
                Udemy Source
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
          >
            <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
