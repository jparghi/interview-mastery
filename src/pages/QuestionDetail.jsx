import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard.jsx';
import questions from '../data/questions.json';

export default function QuestionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const question = useMemo(() => questions.find((item) => item.id === id), [id]);

  if (!question) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-red-200 bg-red-50/80 p-10 text-center text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-100"
      >
        <p className="text-lg font-semibold">We couldn't find that question.</p>
        <button
          type="button"
          onClick={() => navigate('/questions')}
          className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Back to all questions
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-300/80 dark:bg-slate-800/70 dark:text-slate-200"
      >
        ← Back
      </button>
      <QuestionCard key={question.id} question={question} interviewMode={false} defaultExpanded />
    </div>
  );
}
