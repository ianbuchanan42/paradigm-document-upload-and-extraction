'use client';

import { useState } from 'react';
import SideBySideViewer from '@/components/PoliceReport/SideBySideViewer';
import TabbedSectionViewer from '@/components/PoliceReport/TabbedSectionViewer';
import AccordionSectionViewer from '@/components/PoliceReport/AccordionSectionViewer';
import SimpleSideBySide from '@/components/PoliceReport/SimpleSideBySide';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

export default function Home() {
  const [currentView, setCurrentView] = useState<
    'side-by-side' | 'tabbed' | 'accordion' | 'simple'
  >('side-by-side');
  const [reportData, setReportData] =
    useState<PoliceReportData>(emptyPoliceReport);
  const [showLinterNote, setShowLinterNote] = useState(true);

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
      <div className='container mx-auto px-4 py-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold text-center mb-4 text-gray-900'>
            Police Report Viewer
          </h1>
          <div className='flex justify-center flex-wrap space-x-2'>
            <button
              onClick={() => setCurrentView('side-by-side')}
              className={`px-4 py-2 rounded-md mb-2 ${
                currentView === 'side-by-side'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setCurrentView('tabbed')}
              className={`px-4 py-2 rounded-md mb-2 ${
                currentView === 'tabbed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Tabbed Sections
            </button>
            <button
              onClick={() => setCurrentView('accordion')}
              className={`px-4 py-2 rounded-md mb-2 ${
                currentView === 'accordion'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Accordion Sections
            </button>
          </div>
        </header>

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
