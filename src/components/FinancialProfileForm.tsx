import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CheckCircle } from 'lucide-react';
import type { FinancialProfile } from '../types';

const AGE_RANGES = [
  { value: '18-24', label: '18-24 years' },
  { value: '25-34', label: '25-34 years' },
  { value: '35-44', label: '35-44 years' },
  { value: '45-54', label: '45-54 years' },
  { value: '55-64', label: '55-64 years' },
  { value: '65+', label: '65 years or older' }
];

const INCOME_RANGES = [
  { value: '0-25k', label: '$0 - $25,000' },
  { value: '25-50k', label: '$25,001 - $50,000' },
  { value: '50-100k', label: '$50,001 - $100,000' },
  { value: '100k+', label: '$100,001+' }
];

const PROPERTY_TYPES = [
  { value: 'primary', label: 'Primary Residence' },
  { value: 'investment', label: 'Investment Property' },
  { value: 'vacation', label: 'Vacation Home' }
];

interface Props {
  onSubmit: (data: FinancialProfile) => void;
}

export function FinancialProfileForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<FinancialProfile>();

  const onSubmitHandler: SubmitHandler<FinancialProfile> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit(data);
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="text-center p-8 animate-fadeIn">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Profile Updated!</h3>
        <p className="text-gray-600 mb-6">Your financial profile has been successfully saved.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Another Profile
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 animate-fadeIn">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age Range
        </label>
        <select
          id="age"
          {...register('age', { required: 'Age range is required' })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select age range</option>
          {AGE_RANGES.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
          Annual Income
        </label>
        <select
          id="income"
          {...register('income', { required: 'Income range is required' })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select income range</option>
          {INCOME_RANGES.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        {errors.income && (
          <p className="mt-1 text-sm text-red-600">{errors.income.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-3">
            Assets & Investments
          </legend>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium text-gray-700">Property Ownership</p>
              {PROPERTY_TYPES.map(property => (
                <label key={property.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={property.value}
                    {...register('properties')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                             focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{property.label}</span>
                </label>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register('hasAlternativeInvestments')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                           focus:ring-blue-500 mt-1"
                />
                <div className="ml-2">
                  <span className="text-sm font-medium text-gray-700 block mb-1">
                    Alternative Investments
                  </span>
                  <span className="text-sm text-gray-500">
                    I have investments in cryptocurrency, precious metals, or other alternative assets
                  </span>
                </div>
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Start the Financial Resilience Assessment'}
      </button>
    </form>
  );
}