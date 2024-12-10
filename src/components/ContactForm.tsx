import React from 'react';
import { useForm } from 'react-hook-form';
import type { ContactInfo } from '../types';

interface Props {
  onSubmit: (data: ContactInfo) => void;
}

export function ContactForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactInfo>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
              message: 'Invalid phone number format'
            }
          })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500"
          placeholder="(123) 456-7890"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2"
      >
        View My Results
      </button>
    </form>
  );
}