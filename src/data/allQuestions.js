import curatedQuestions from './questions.json';
import interviewMastery from './interview_mastery.json';

function normalizeInterviewMasteryQuestions(data) {
  if (!data) {
    return [];
  }

  const sections = Array.isArray(data) ? data : [data];

  return sections.flatMap((section, sectionIndex) => {
    const categoryName = section?.category?.trim() || 'Interview Mastery';

    if (!Array.isArray(section?.questions)) {
      return [];
    }

    return section.questions.map((question, questionIndex) => ({
      ...question,
      id:
        question?.id?.trim() ||
        `${categoryName.replace(/[^a-z0-9]+/gi, '_').toUpperCase()}_${sectionIndex + 1}_${
          questionIndex + 1
        }`,
      topic: question?.topic?.trim() || categoryName,
      difficulty: question?.difficulty?.trim() || question?.level?.trim() || undefined,
      references: Array.isArray(question?.references) ? question.references : [],
    }));
  });
}

const interviewQuestions = normalizeInterviewMasteryQuestions(interviewMastery);

const allQuestions = [...curatedQuestions, ...interviewQuestions];

export default allQuestions;
