'use client';

import { useState } from 'react';
import Image from 'next/image';
import SideBySideViewer from '@/components/PoliceReport/SideBySideViewer';
import TabbedSectionViewer from '@/components/PoliceReport/TabbedSectionViewer';
import AccordionSectionViewer from '@/components/PoliceReport/AccordionSectionViewer';
import SummaryView from '@/components/PoliceReport/SummaryView';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

export default function Home() {
  const [currentView, setCurrentView] = useState<
    'side-by-side' | 'tabbed' | 'accordion' | 'summary'
  >('side-by-side');
  const [reportData, setReportData] =
    useState<PoliceReportData>(emptyPoliceReport);

  // Track if a form has been submitted
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleDataChange = (data: PoliceReportData) => {
    setReportData(data);
  };

  const handleSubmit = (
    data: PoliceReportData,
    showConfirmation: boolean = false
  ) => {
    console.log('Form submitted:', data);
    // In a real application, you would send this data to your backend

    // Update report data
    setReportData(data);

    // Mark as submitted
    setHasSubmitted(true);

    // Only switch to summary view if explicitly requested AND we're not in accordion view
    if (showConfirmation && currentView !== 'accordion') {
      setCurrentView('summary');
    }
  };

  // Function to safely change the view
  const changeView = (
    view: 'side-by-side' | 'tabbed' | 'accordion' | 'summary',
    e: React.MouseEvent
  ) => {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();

    // Set the current view
    setCurrentView(view);
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
              priority
            />
            <h1 className='text-xl md:text-2xl font-bold'>
              Document Upload & Extraction
            </h1>
          </div>

          <div className='flex flex-wrap justify-center gap-2'>
            <button
              onClick={(e) => changeView('side-by-side', e)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'side-by-side'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={(e) => changeView('tabbed', e)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'tabbed'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Tabbed Sections
            </button>
            <button
              onClick={(e) => changeView('accordion', e)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'accordion'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Accordion Sections
            </button>
            <button
              onClick={(e) => changeView('summary', e)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'summary'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Report Summary
            </button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        {currentView === 'side-by-side' && (
          <div id='side-by-side-container'>
            <SideBySideViewer
              imageSrc='/assets/Dummy Police Report.png'
              initialData={reportData}
              onSubmit={(data) => handleSubmit(data, true)}
            />
          </div>
        )}

        {currentView === 'tabbed' && (
          <div id='tabbed-container'>
            <TabbedSectionViewer
              imageSrc='/assets/Dummy Police Report.png'
              initialData={reportData}
              onDataChange={handleDataChange}
              onSubmit={(data) => handleSubmit(data, true)}
            />
          </div>
        )}

        {currentView === 'accordion' && (
          <div id='accordion-container' onClick={(e) => e.stopPropagation()}>
            <AccordionSectionViewer
              imageSrc='/assets/Dummy Police Report.png'
              initialData={reportData}
              onDataChange={handleDataChange}
              onSubmit={(data) => {
                // Just log the data but don't navigate to summary
                console.log('Accordion data saved:', data);
                setReportData(data);
              }}
            />
          </div>
        )}

        {currentView === 'summary' && (
          <div id='summary-container'>
            <SummaryView reportData={reportData} />
          </div>
        )}
      </div>
    </main>
  );
}
