'use client';

import { useState } from 'react';
import Image from 'next/image';
import SideBySideViewer from '@/components/PoliceReport/SideBySideViewer';
import TabbedSectionViewer from '@/components/PoliceReport/TabbedSectionViewer';
import AccordionSectionViewer from '@/components/PoliceReport/AccordionSectionViewer';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

export default function Home() {
  const [currentView, setCurrentView] = useState<
    'side-by-side' | 'tabbed' | 'accordion'
  >('side-by-side');
  const [reportData, setReportData] =
    useState<PoliceReportData>(emptyPoliceReport);

  const handleDataChange = (data: PoliceReportData) => {
    setReportData(data);
  };

  const handleSubmit = (data: PoliceReportData) => {
    console.log('Form submitted:', data);
    // In a real application, you would send this data to your backend
    // No notification or alert
  };

  return (
    <main className='min-h-screen bg-gray-100'>
      <header className='w-full py-4 px-6 bg-[#1D182A] text-white shadow-md sticky top-0 z-10'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
          <div className='flex items-center mb-4 md:mb-0'>
            <Image
              src='/assets/Paradigm-Logo.png'
              alt='Paradigm Logo'
              width={200}
              height={75}
              className='mr-4'
            />
            <h1 className='text-xl md:text-2xl font-bold'>
              Document Upload & Extraction
            </h1>
          </div>

          <div className='flex flex-wrap justify-center gap-2'>
            <button
              onClick={() => setCurrentView('side-by-side')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'side-by-side'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setCurrentView('tabbed')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'tabbed'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Tabbed Sections
            </button>
            <button
              onClick={() => setCurrentView('accordion')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'accordion'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Accordion Sections
            </button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        {currentView === 'side-by-side' && (
          <SideBySideViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={reportData}
            onSubmit={handleSubmit}
          />
        )}

        {currentView === 'tabbed' && (
          <TabbedSectionViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={reportData}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
          />
        )}

        {currentView === 'accordion' && (
          <AccordionSectionViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={reportData}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}
