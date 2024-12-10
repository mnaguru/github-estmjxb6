import React from 'react';
import type { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (value: number) => void;
  className?: string;
}

export function Question({ question, onAnswer, className = '' }: QuestionProps) {
  if (question.type === 'scale') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-xl font-medium mb-6">{question.text}</h3>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              onClick={() => onAnswer(value)}
              className="w-10 h-10 rounded-full border-2 border-blue-600 hover:bg-blue-600 
                       hover:text-white transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index + 1)}
            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 
                     hover:border-blue-600 transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}