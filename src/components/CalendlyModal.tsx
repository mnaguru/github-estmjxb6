import React from 'react';
import { X } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 
                     transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="h-[600px] w-full">
            <iframe
              src="https://calendly.com/risknumber-savemyretirement/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule Appointment"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}