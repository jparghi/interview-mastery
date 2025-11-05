import { motion } from 'framer-motion';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  topics = [],
  selectedTopic,
  onTopicChange,
  interviewMode,
  onInterviewModeToggle,
}) {
  return (
    <motion.section
      layout
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">Java Interview Explorer</h2>
        <button
          type="button"
          onClick={onInterviewModeToggle}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            interviewMode
              ? 'bg-blue-500 text-white shadow'
              : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300/70 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {interviewMode ? 'Interview Mode: On' : 'Interview Mode: Off'}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.5fr,1fr]">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Search</span>
          <input
            type="search"
            placeholder="Search by keyword, question, or answer"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-2xl border border-transparent bg-slate-100/70 px-4 py-3 text-base shadow-inner transition focus:border-blue-400 focus:bg-white focus:outline-none dark:bg-slate-800/70 dark:text-slate-100"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Topic</span>
          <select
            value={selectedTopic}
            onChange={(event) => onTopicChange(event.target.value)}
            className="w-full rounded-2xl border border-transparent bg-slate-100/70 px-4 py-3 text-base shadow-inner transition focus:border-blue-400 focus:bg-white focus:outline-none dark:bg-slate-800/70 dark:text-slate-100"
          >
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>
    </motion.section>
  );
}
