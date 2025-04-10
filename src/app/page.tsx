'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      <header className='w-full py-4 px-3 sm:px-6 bg-[#1D182A] text-white shadow-md sticky top-0 z-10'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
          <div className='flex flex-wrap items-center justify-center md:justify-start mb-4 md:mb-0 w-full md:w-auto'>
            <Image
              src='/assets/Paradigm-Logo.png'
              alt='Paradigm Logo'
              width={150}
              height={56}
              className='mr-2 sm:mr-4 w-[120px] sm:w-[150px] h-auto'
              priority
            />
            <h1
              style={{ color: 'white' }}
              className='text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md bg-[#1D182A] px-2 py-1 rounded'
            >
              Document Upload & Extraction
            </h1>
            <Link
              href='https://github.com/ianbuchanan42/paradigm-document-upload-and-extraction'
              target='_blank'
              rel='noopener noreferrer'
              className='ml-2 sm:ml-4 flex items-center text-white hover:text-[#C98F65] transition-colors mt-2 md:mt-0'
              aria-label='View source code on GitHub'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='mr-1 sm:mr-2'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              <span className='hidden sm:inline'>Demo Repo on GitHub</span>
            </Link>
          </div>

          <div className='flex flex-wrap justify-center gap-1 sm:gap-2 w-full md:w-auto'>
            <button
              onClick={(e) => changeView('side-by-side', e)}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                currentView === 'side-by-side'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={(e) => changeView('tabbed', e)}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                currentView === 'tabbed'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Tabbed Sections
            </button>
            <button
              onClick={(e) => changeView('accordion', e)}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                currentView === 'accordion'
                  ? 'bg-[#C98F65] text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Accordion Sections
            </button>
            <button
              onClick={(e) => changeView('summary', e)}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
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
              onDataChange={(data) => {
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
