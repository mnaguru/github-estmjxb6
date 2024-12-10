import React, { useState } from 'react';
import { CheckCircle, TrendingUp, ShieldCheck, Wallet, Calendar } from 'lucide-react';
import { CalendlyModal } from './CalendlyModal';
import type { Assessment, FinancialProfile } from '../types';

interface ScoreDisplayProps {
  assessment: Assessment;
  profile?: FinancialProfile | null;
}

export function ScoreDisplay({ assessment, profile }: ScoreDisplayProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { score, riskLevel, recommendations } = assessment;

  const riskColors = {
    Conservative: 'text-green-600',
    Moderate: 'text-blue-600',
    Aggressive: 'text-purple-600'
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Your Risk Assessment Results</h2>
        <p className="text-gray-600">Based on your responses, here's your personalized analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-3xl font-bold ${riskColors[riskLevel]}`}>{score}</div>
            </div>
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className={`${riskColors[riskLevel]} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
                strokeDasharray={352}
                strokeDashoffset={352 - (352 * score) / 100}
              />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold text-center ${riskColors[riskLevel]}`}>
            {riskLevel} Risk Profile
          </h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Profile Summary</h3>
          {profile && (
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <Wallet className="w-5 h-5 text-blue-600" />
                Income: {profile.income}
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Age Range: {profile.age}
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Properties: {profile.properties.length || 'None'}
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6">Personalized Recommendations</h3>
        <ul className="space-y-4">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 animate-fadeIn" 
                style={{ animationDelay: `${index * 150}ms` }}>
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center space-y-4">
        <button
          onClick={() => setIsCalendlyOpen(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white 
                   rounded-lg hover:bg-blue-700 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-2 shadow-lg hover:shadow-xl 
                   transform hover:-translate-y-0.5 transition-all"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule a Free Consultation
        </button>
        <p className="text-sm text-gray-600">
          Discuss your results with our financial experts
        </p>
      </div>

      <CalendlyModal 
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </div>
  );
}