'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PoliceReportForm from './PoliceReportForm';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

interface SideBySideViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
  onSubmit?: (data: PoliceReportData) => void;
}

const SideBySideViewer: React.FC<SideBySideViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  onSubmit = () => {},
}) => {
  const [reportData, setReportData] = useState<PoliceReportData>(initialData);
  const [viewMode, setViewMode] = useState<
    'side-by-side' | 'form-only' | 'image-only'
  >('side-by-side');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (data: PoliceReportData) => {
    setReportData(data);
  };

  const handleSubmit = (data: PoliceReportData) => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(data);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Police Report Review
        </h1>

        <div className='flex space-x-2'>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'side-by-side'
                ? 'bg-[#C98F65] text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('form-only')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'form-only'
                ? 'bg-[#C98F65] text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Form Only
          </button>
          <button
            onClick={() => setViewMode('image-only')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'image-only'
                ? 'bg-[#C98F65] text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Image Only
          </button>
        </div>
      </div>

      <div
        className={`grid ${
          viewMode === 'side-by-side'
            ? 'grid-cols-1 lg:grid-cols-2 gap-8'
            : 'grid-cols-1'
        }`}
      >
        {(viewMode === 'side-by-side' || viewMode === 'image-only') && (
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className='relative h-[800px] w-full border border-gray-200 rounded overflow-auto'>
              <Image
                src={imageSrc}
                alt='Police Report'
                width={800}
                height={1100}
                className='object-contain'
                priority
              />
            </div>
          </div>
        )}

        {(viewMode === 'side-by-side' || viewMode === 'form-only') && (
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className='border border-gray-200 rounded p-4 overflow-auto max-h-[800px]'>
              <PoliceReportForm
                data={reportData}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>

      {isSaving && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl'>
            <p className='text-lg font-semibold text-gray-900'>
              Saving your changes...
            </p>
            <div className='mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='h-full bg-[#C98F65] animate-pulse'
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBySideViewer;
