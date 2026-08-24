import { allPlaces, emirates } from '@/data/emirates';
import { values } from '@/data/values';

const getQuizHash = (id) => [...id].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) % 100, 7);

const reorderChallengeQuiz = (quiz, id) => {
  if (quiz.correct !== 1) return quiz;
  const hash = getQuizHash(id);
  const target = hash < 28 ? 0 : hash < 42 ? 2 : hash < 70 ? 3 : 1;
  if (target === quiz.correct) return quiz;
  const options = [...quiz.options];
  [options[quiz.correct], options[target]] = [options[target], options[quiz.correct]];
  return { ...quiz, options, correct: target };
};

const emirateTopics = emirates.map(emirate => ({
  id: emirate.id,
  name: emirate.name,
  description: `Explore landmarks, heritage, and stories from ${emirate.name}.`,
  questions: allPlaces
    .filter(place => place.emirate === emirate.id)
    .map(place => {
      const quiz = reorderChallengeQuiz(place.quiz, place.id);
      return { id: place.id, topic: emirate.id, question: quiz.question, options: quiz.options, correct: quiz.correct, explanation: quiz.explanation, source: place.name };
    }),
}));

const valuesTopic = {
  id: 'values-citizenship',
  name: 'Values & Citizenship',
  description: 'Explore the principles and responsibilities that shape life in the UAE.',
  questions: values.map(value => {
    const id = `value-${value.name}`;
    const quiz = reorderChallengeQuiz(value.scenario, id);
    return { id, topic: 'values-citizenship', question: quiz.question, options: quiz.options, correct: quiz.correct, explanation: quiz.explanation, source: value.name };
  }),
};

export const challengeTopics = [...emirateTopics, valuesTopic];
export const challengeQuestionCount = challengeTopics.reduce((count, topic) => count + topic.questions.length, 0);