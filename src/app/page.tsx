import Image from 'next/image';
import Link from 'next/link';
import SideBySideViewer from '@/components/PoliceReport/SideBySideViewer';
import TabbedSectionViewer from '@/components/PoliceReport/TabbedSectionViewer';
import AccordionSectionViewer from '@/components/PoliceReport/AccordionSectionViewer';
import SummaryView from '@/components/PoliceReport/SummaryView';
import { emptyPoliceReport } from '@/types/PoliceReport';

export default function Home() {
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

          {/* Navigation buttons - using plain HTML */}
          <div className='flex flex-wrap justify-center gap-1 sm:gap-2 w-full md:w-auto'>
            <button
              id='view-button-side-by-side'
              data-view='side-by-side'
              className='px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors bg-[#C98F65] text-white cursor-pointer view-button'
            >
              Side by Side
            </button>
            <button
              id='view-button-tabbed'
              data-view='tabbed'
              className='px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors bg-gray-700 text-white hover:bg-gray-600 cursor-pointer view-button'
            >
              Tabbed Sections
            </button>
            <button
              id='view-button-accordion'
              data-view='accordion'
              className='px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors bg-gray-700 text-white hover:bg-gray-600 cursor-pointer view-button'
            >
              Accordion Sections
            </button>
            <button
              id='view-button-summary'
              data-view='summary'
              className='px-2 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors bg-gray-700 text-white hover:bg-gray-600 cursor-pointer view-button'
            >
              Report Summary
            </button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8' id='view-container'>
        {/* All views pre-rendered, shown/hidden with CSS */}
        <div id='side-by-side-container' className='block view-container'>
          <SideBySideViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={emptyPoliceReport}
          />
        </div>

        <div id='tabbed-container' className='hidden view-container'>
          <TabbedSectionViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={emptyPoliceReport}
          />
        </div>

        <div id='accordion-container' className='hidden view-container'>
          <AccordionSectionViewer
            imageSrc='/assets/Dummy Police Report.png'
            initialData={emptyPoliceReport}
          />
        </div>

        <div id='summary-container' className='hidden view-container'>
          <SummaryView reportData={emptyPoliceReport} />
        </div>

        {/* Pure vanilla JavaScript for interactivity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              console.log('Document loaded, initializing view switcher');
              
              // Get elements
              const viewButtons = document.querySelectorAll('.view-button');
              const containers = document.querySelectorAll('.view-container');
              
              // Set initial state (side-by-side active)
              document.getElementById('side-by-side-container').classList.remove('hidden');
              document.getElementById('side-by-side-container').classList.add('block');
              document.getElementById('view-button-side-by-side').classList.add('bg-[#C98F65]');
              document.getElementById('view-button-side-by-side').classList.remove('bg-gray-700');
              
              // Handle view switching
              viewButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                  e.preventDefault();
                  const view = this.getAttribute('data-view');
                  
                  // Hide all containers
                  containers.forEach(container => {
                    container.classList.add('hidden');
                    container.classList.remove('block');
                  });
                  
                  // Show selected container
                  const activeContainer = document.getElementById(view + '-container');
                  if (activeContainer) {
                    activeContainer.classList.remove('hidden');
                    activeContainer.classList.add('block');
                  }
                  
                  // Update active button styling
                  viewButtons.forEach(btn => {
                    btn.classList.remove('bg-[#C98F65]');
                    btn.classList.add('bg-gray-700');
                  });
                  this.classList.remove('bg-gray-700');
                  this.classList.add('bg-[#C98F65]');
                });
              });
              
              // Add form submission handlers
              document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                  e.preventDefault();
                  console.log('Form submitted (using vanilla JS handler)');
                  const formData = new FormData(form);
                  const data = {};
                  for (let [key, value] of formData.entries()) {
                    data[key] = value;
                  }
                  console.log('Form data:', data);
                  // In a real app, would send this to your backend
                  alert('Form submitted successfully!');
                });
              });
            });
          `,
          }}
        />
      </div>
    </main>
  );
}
