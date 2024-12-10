export const questions = [
  {
    id: 'market_drop',
    text: 'How would you react if your investment portfolio dropped 20% in value?',
    type: 'choice',
    options: [
      'Sell everything immediately',
      'Sell some investments',
      'Hold and wait it out',
      'Buy more while prices are low'
    ],
    weight: 1.5
  },
  {
    id: 'investment_horizon',
    text: 'When do you expect to need the majority of your investment money?',
    type: 'choice',
    options: [
      'Within 2 years',
      '2-5 years',
      '5-10 years',
      'More than 10 years'
    ],
    weight: 1.2
  },
  {
    id: 'emergency_fund',
    text: 'How many months of expenses do you have saved in an emergency fund?',
    type: 'choice',
    options: [
      'No emergency fund',
      '1-3 months',
      '3-6 months',
      '6+ months'
    ],
    weight: 1.3
  },
  {
    id: 'risk_comfort',
    text: 'On a scale of 1-10, how comfortable are you with financial risk?',
    type: 'scale',
    weight: 1.4
  },
  {
    id: 'income_stability',
    text: 'How stable is your current income source?',
    type: 'choice',
    options: [
      'Very unstable',
      'Somewhat unstable',
      'Stable',
      'Very stable'
    ],
    weight: 1.1
  }
] as const;