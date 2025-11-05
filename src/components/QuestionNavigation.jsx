import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

function truncate(text, length = 70) {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length - 1)}…`;
}

export default function QuestionNavigation({ groupedQuestions, selectedTopic, onTopicSelect }) {
  const [expandedTopics, setExpandedTopics] = useState(() => {
    if (!selectedTopic) {
      return new Set();
    }
    return new Set([selectedTopic]);
  });

  const items = useMemo(
    () =>
      groupedQuestions.map((group) => ({
        ...group,
        count: group.questions.length,
      })),
    [groupedQuestions],
  );

  useEffect(() => {
    if (!selectedTopic) {
      return;
    }
    setExpandedTopics((current) => {
      const next = new Set(current);
      next.add(selectedTopic);
      return next;
    });
  }, [selectedTopic]);

  const toggleTopic = (topic) => {
    setExpandedTopics((current) => {
      const next = new Set(current);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  };

  return (
    <nav className="sticky top-32 hidden space-y-4 md:block">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50">Question Library</h2>
          <button
            type="button"
            onClick={() => {
              onTopicSelect('');
              setExpandedTopics(new Set());
            }}
            className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline dark:text-blue-300"
          >
            Clear
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Browse by topic and jump straight to any question.</p>
      </div>
      <ul className="space-y-3">
        {items.map((group) => {
          const isSelected = group.topic === selectedTopic;
          const isExpanded = expandedTopics.has(group.topic) || isSelected;
          return (
            <li key={group.topic} className="rounded-3xl border border-slate-200 bg-white/80 shadow dark:border-slate-800 dark:bg-slate-900/80">
              <button
                type="button"
                onClick={() => {
                  onTopicSelect(group.topic);
                  toggleTopic(group.topic);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-3xl px-4 py-3 text-left transition ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800/70'
                }`}
              >
                <span className="font-medium">{group.topic}</span>
                <span className={`rounded-full px-2 text-xs font-semibold ${isSelected ? 'bg-blue-400/60' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {group.count}
                </span>
              </button>
              {isExpanded ? (
                <ul className="space-y-1 px-4 pb-4 pt-3">
                  {group.questions.map((question) => (
                    <li key={question.id}>
                      <NavLink
                        to={`/questions/${encodeURIComponent(question.id)}`}
                        className={({ isActive }) =>
                          `block rounded-2xl px-3 py-2 text-sm transition ${
                            isActive
                              ? 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200'
                              : 'text-slate-600 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:bg-slate-800/60'
                          }`
                        }
                      >
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                          {question.id}
                        </span>
                        <span className="mt-1 block text-sm font-medium leading-snug text-slate-700 dark:text-slate-200">
                          {truncate(question.question, 72)}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
