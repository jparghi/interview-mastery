import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import QuestionNavigation from '../components/QuestionNavigation.jsx';
import questions from '../data/allQuestions.js';

const PAGE_SIZE = 6;

function normalize(value = '') {
  return value.toLowerCase();
}

export default function QuestionList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [page, setPage] = useState(1);
  const [interviewMode, setInterviewMode] = useState(false);

  const topics = useMemo(() => {
    const set = new Set();
    questions.forEach((item) => {
      if (item.topic) {
        set.add(item.topic);
      }
    });
    return Array.from(set).sort();
  }, [questions]);

  const groupedQuestions = useMemo(() => {
    const map = new Map();
    questions.forEach((item) => {
      const topic = item.topic ?? 'General';
      if (!map.has(topic)) {
        map.set(topic, []);
      }
      map.get(topic).push(item);
    });

    return Array.from(map.entries())
      .map(([topic, items]) => ({
        topic,
        questions: items.slice().sort((a, b) => a.id.localeCompare(b.id)),
      }))
      .sort((a, b) => a.topic.localeCompare(b.topic));
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    const term = normalize(searchTerm);
    return questions.filter((item) => {
      const matchesTopic = selectedTopic ? item.topic === selectedTopic : true;
      if (!matchesTopic) return false;

      if (!term) return true;
      return (
        normalize(item.question).includes(term) ||
        normalize(item.answer).includes(term) ||
        normalize(item.explanation ?? '').includes(term) ||
        item.keywords?.some((keyword) => normalize(keyword).includes(term))
      );
    });
  }, [questions, searchTerm, selectedTopic]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, currentPage]);

  const handlePageChange = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="md:w-80">
        <QuestionNavigation
          groupedQuestions={groupedQuestions}
          selectedTopic={selectedTopic}
          onTopicSelect={(topic) => {
            setPage(1);
            setSelectedTopic((current) => (current === topic ? '' : topic));
          }}
        />
      </aside>
      <div className="flex-1 space-y-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setPage(1);
            setSearchTerm(value);
          }}
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicChange={(value) => {
            setPage(1);
            setSelectedTopic(value);
          }}
          interviewMode={interviewMode}
          onInterviewModeToggle={() => setInterviewMode((value) => !value)}
        />

        <section className="grid gap-6 md:grid-cols-2">
          {paginatedQuestions.length ? (
            paginatedQuestions.map((item) => (
              <QuestionCard key={item.id} question={item} interviewMode={interviewMode} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full rounded-3xl border border-slate-200 bg-white/60 p-10 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
            >
              No questions found. Try adjusting your filters.
            </motion.div>
          )}
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 text-sm shadow-md sm:flex-row dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-slate-600 dark:text-slate-300">
            {filteredQuestions.length > 0 ? (
              <>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filteredQuestions.length)} of {filteredQuestions.length} questions
              </>
            ) : (
              'No questions to display'
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full bg-slate-200/70 px-4 py-2 font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800/70 dark:text-slate-200"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full bg-slate-200/70 px-4 py-2 font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800/70 dark:text-slate-200"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
