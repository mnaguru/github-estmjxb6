import type { Answer, Assessment } from '../types';
import { questions } from '../data/questions';

export function calculateScore(answers: Answer[]): Assessment {
  const totalWeight = questions.reduce((acc, q) => acc + q.weight, 0);
  const weightedScore = answers.reduce((acc, answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return acc;
    return acc + (answer.value * question.weight);
  }, 0);

  const maxPossibleScore = 4 * totalWeight; // 4 is max value for any question
  const normalizedScore = Math.round((weightedScore / maxPossibleScore) * 100);

  let riskLevel: Assessment['riskLevel'];
  if (normalizedScore < 40) riskLevel = 'Conservative';
  else if (normalizedScore < 70) riskLevel = 'Moderate';
  else riskLevel = 'Aggressive';

  const recommendations = generateRecommendations(normalizedScore, answers);

  return {
    score: normalizedScore,
    riskLevel,
    recommendations
  };
}

function generateRecommendations(score: number, answers: Answer[]): string[] {
  const recommendations: string[] = [];

  if (score < 40) {
    recommendations.push(
      'Consider a portfolio focused on bonds and stable dividend stocks',
      'Maintain a larger emergency fund for security',
      'Look into Principal Protection Accounts for guaranteed safety of principal'
    );
  } else if (score < 70) {
    recommendations.push(
      'Balance your portfolio between growth stocks and fixed-income investments',
      'Diversify across multiple asset classes and consider a Principal Protection Account to reduce market risk',
      'Consider index funds for steady market exposure'
    );
  } else {
    recommendations.push(
      'Focus on growth stocks and emerging markets',
      'Consider small-cap investments for higher potential returns',
      'Look into alternative investments like Principal Protection Accounts to offset downside risk'
    );
  }

  return recommendations;
}