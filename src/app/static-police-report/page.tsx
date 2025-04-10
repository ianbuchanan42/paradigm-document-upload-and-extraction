'use client';

import React from 'react';
import Link from 'next/link';
import TabbedSectionViewer from '@/components/PoliceReport/TabbedSectionViewer';
import SideBySideViewer from '@/components/PoliceReport/SideBySideViewer';

const StaticPoliceReportPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Police Report System
            </h1>
            <Link href='/' className='text-[#C98F65] hover:underline'>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Choose View Mode</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Link
              href='#tabbed-view'
              className='block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('tabbed-view')
                  ?.scrollIntoView({ behavior: 'smooth' });
                // Hide side-by-side view and show tabbed view
                const sideByView = document.getElementById('side-by-side-view');
                const tabbedView = document.getElementById('tabbed-view');
                if (sideByView && tabbedView) {
                  sideByView.style.display = 'none';
                  tabbedView.style.display = 'block';
                }
              }}
            >
              <div className='flex items-center mb-4'>
                <div className='bg-[#C98F65] p-3 rounded-md text-white mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h7'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-medium text-gray-900'>
                  Tabbed Section View
                </h3>
              </div>
              <p className='text-gray-600'>
                View the police report in organized, tabbed sections for easier
                verification and editing.
              </p>
            </Link>

            <Link
              href='#side-by-side-view'
              className='block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('side-by-side-view')
                  ?.scrollIntoView({ behavior: 'smooth' });
                // Hide tabbed view and show side-by-side view
                const sideByView = document.getElementById('side-by-side-view');
                const tabbedView = document.getElementById('tabbed-view');
                if (sideByView && tabbedView) {
                  tabbedView.style.display = 'none';
                  sideByView.style.display = 'block';
                }
              }}
            >
              <div className='flex items-center mb-4'>
                <div className='bg-[#C98F65] p-3 rounded-md text-white mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-medium text-gray-900'>
                  Side by Side View
                </h3>
              </div>
              <p className='text-gray-600'>
                View the original document side-by-side with the form fields for
                quick reference and verification.
              </p>
            </Link>
          </div>
        </div>

        <div
          id='tabbed-view'
          className='mt-12 mb-16 pb-8'
          style={{ display: 'none' }}
        >
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Tabbed Section View
          </h2>
          <TabbedSectionViewer imageSrc='/sample-police-report.jpg' />
        </div>

        <div id='side-by-side-view' className='mt-12 mb-16 pb-8'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Side by Side View
          </h2>
          <SideBySideViewer imageSrc='/sample-police-report.jpg' />
        </div>
      </main>

      <footer className='bg-gray-800 text-white py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
              <h2 className='text-xl font-bold'>Police Report System</h2>
              <p className='text-gray-300 mt-2'>
                Efficient document processing and data extraction
              </p>
            </div>
            <div>
              <p>&copy; 2023 Law Enforcement Agency. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Vanilla JavaScript for view switching */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Pre-select the side-by-side view by default
            const sideByView = document.getElementById('side-by-side-view');
            const tabbedView = document.getElementById('tabbed-view');
            if (sideByView && tabbedView) {
              tabbedView.style.display = 'none';
              sideByView.style.display = 'block';
            }
          });
          `,
        }}
      />
    </div>
  );
};

export default StaticPoliceReportPage;
