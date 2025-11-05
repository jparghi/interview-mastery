import { NavLink, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home.jsx';
import QuestionList from './pages/QuestionList.jsx';
import QuestionDetail from './pages/QuestionDetail.jsx';
import { useDarkMode } from './hooks/useDarkMode.js';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-500 text-white shadow'
      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
  }`;

export default function App() {
  const [isDark, setIsDark] = useDarkMode(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">IM</span>
            Interview Mastery
          </NavLink>
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/questions" className={navLinkClass}>
              Questions
            </NavLink>
            <a
              href="https://mermaid.js.org/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
            >
              Mermaid Docs
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDark((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-50 shadow dark:bg-slate-100 dark:text-slate-900"
              aria-label="Toggle theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-50 shadow md:hidden dark:bg-slate-100 dark:text-slate-900"
              onClick={() => setIsNavOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isNavOpen ? (
            <motion.nav
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="space-y-2 px-6 pb-4">
                <NavLink to="/" className={navLinkClass} end onClick={() => setIsNavOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/questions" className={navLinkClass} onClick={() => setIsNavOpen(false)}>
                  Questions
                </NavLink>
                <a
                  href="https://mermaid.js.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                >
                  Mermaid Docs
                </a>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h1 className="text-3xl font-semibold">Page Not Found</h1>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  The page you are looking for might have been removed or is temporarily unavailable.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
        Crafted for immersive Java interview preparation. Add your own questions in <code>src/data/questions.json</code>.
      </footer>
    </div>
  );
}
