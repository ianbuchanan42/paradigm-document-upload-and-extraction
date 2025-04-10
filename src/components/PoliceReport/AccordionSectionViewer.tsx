import React from 'react';
import Image from 'next/image';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

// Define image section configuration type
interface ImageRegion {
  top: number; // The top position to display (in pixels)
  left?: number; // Optional left position (for horizontal scrolling)
  width?: number; // Optional width to show
  height: number; // The height of the section to display (in pixels)
  zoom?: number; // Optional zoom level
}

interface Section {
  id: string;
  title: string;
  fields: string[];
  imageRegion: ImageRegion;
}

interface AccordionSectionViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
  defaultImageRegion?: ImageRegion; // Default image region if section doesn't define one
}

const AccordionSectionViewer: React.FC<AccordionSectionViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  defaultImageRegion = { top: 0, height: 800, zoom: 1, left: 0, width: 800 }, // Default image region with all properties
}) => {
  // Static sections definition
  const sections: Section[] = [
    {
      id: 'accordion_internal-affairs',
      title: 'Internal Affairs',
      fields: ['departmentNo', 'internalAffairsCaseNo'],
      imageRegion: { top: 150, height: 400, zoom: 1 },
    },
    {
      id: 'accordion_personal-info',
      title: 'Personal Information',
      fields: [
        'name',
        'alias',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'employerSchool',
      ],
      imageRegion: { top: 400, height: 600, zoom: 0.8 },
    },
    {
      id: 'accordion_demographics',
      title: 'Demographics',
      fields: ['race', 'gender', 'dob', 'age', 'sex', 'phoneSecondary'],
      imageRegion: { top: 700, height: 200, zoom: 1 },
    },
    {
      id: 'accordion_incident-basic',
      title: 'Incident Basic Info',
      fields: [
        'natureOfComplaint',
        'complaintAgainst',
        'badgeNos',
        'incidentDate',
        'incidentTime',
      ],
      imageRegion: { top: 1000, height: 500, zoom: 1 },
    },
    {
      id: 'accordion_incident-details',
      title: 'Incident Details',
      fields: [
        'reportedDateTime',
        'howReported',
        'incidentLocation',
        'distArea',
        'beat',
        'incidentDescription',
      ],
      imageRegion: { top: 900, height: 600, zoom: 0.8 },
    },
  ];

  // Helper to render appropriate input field based on field name - static version
  const renderField = (fieldName: keyof PoliceReportData) => {
    const value = initialData[fieldName] || '';

    // Define field types and options
    const fieldConfig: Record<
      string,
      { type: string; label: string; options?: string[] }
    > = {
      departmentNo: { type: 'text', label: 'Department No.' },
      internalAffairsCaseNo: {
        type: 'text',
        label: 'Internal Affairs Case No.',
      },
      name: { type: 'text', label: 'Name' },
      alias: { type: 'text', label: 'Alias' },
      address: { type: 'text', label: 'Address' },
      city: { type: 'text', label: 'City' },
      state: {
        type: 'select',
        label: 'State',
        options: [
          'AL',
          'AK',
          'AZ',
          'AR',
          'CA',
          'CO',
          'CT',
          'DE',
          'FL',
          'GA',
          'HI',
          'ID',
          'IL',
          'IN',
          'IA',
          'KS',
          'KY',
          'LA',
          'ME',
          'MD',
          'MA',
          'MI',
          'MN',
          'MS',
          'MO',
          'MT',
          'NE',
          'NV',
          'NH',
          'NJ',
          'NM',
          'NY',
          'NC',
          'ND',
          'OH',
          'OK',
          'OR',
          'PA',
          'RI',
          'SC',
          'SD',
          'TN',
          'TX',
          'UT',
          'VT',
          'VA',
          'WA',
          'WV',
          'WI',
          'WY',
        ],
      },
      zip: { type: 'text', label: 'ZIP' },
      phone: { type: 'tel', label: 'Phone' },
      employerSchool: { type: 'text', label: 'Employer/School' },
      race: { type: 'text', label: 'Race' },
      gender: {
        type: 'select',
        label: 'Gender',
        options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'],
      },
      dob: { type: 'date', label: 'Date of Birth' },
      age: { type: 'number', label: 'Age' },
      sex: {
        type: 'select',
        label: 'Sex',
        options: ['Male', 'Female', 'Other'],
      },
      phoneSecondary: { type: 'tel', label: 'Phone (Secondary)' },
      natureOfComplaint: { type: 'text', label: 'Nature of Complaint' },
      complaintAgainst: { type: 'text', label: 'Complaint Against (Name[s])' },
      badgeNos: { type: 'text', label: 'Badge No(s)' },
      incidentDate: { type: 'date', label: 'Date' },
      incidentTime: { type: 'time', label: 'Time' },
      reportedDateTime: { type: 'datetime-local', label: 'Date/Time Reported' },
      howReported: {
        type: 'select',
        label: 'How Reported',
        options: ['In Person', 'Phone', 'Email', 'Mail', 'Online', 'Other'],
      },
      incidentLocation: { type: 'text', label: 'Incident Location' },
      distArea: { type: 'text', label: 'Dist/Area' },
      beat: { type: 'text', label: 'Beat' },
      incidentDescription: {
        type: 'textarea',
        label: 'Description of Incident',
      },
    };

    const config = fieldConfig[fieldName];
    if (!config) return null;

    return (
      <div key={fieldName} className='mb-4'>
        <label
          htmlFor={fieldName}
          className='block text-sm font-medium text-gray-800 mb-1'
        >
          {config.label}
        </label>

        {config.type === 'textarea' ? (
          <textarea
            id={fieldName}
            name={fieldName}
            defaultValue={value}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
            rows={4}
          />
        ) : config.type === 'select' && config.options ? (
          <select
            id={fieldName}
            name={fieldName}
            defaultValue={value}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
          >
            <option value=''>Select {config.label}</option>
            {config.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldName}
            name={fieldName}
            type={config.type}
            defaultValue={value}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
          />
        )}
      </div>
    );
  };

  // Render an accordion section - static version
  const renderAccordionSection = (section: Section) => {
    // Default state: first section expanded
    const isExpanded = section.id === 'accordion_internal-affairs';

    // Get the image region for this section
    const sectionImageRegion = section.imageRegion || defaultImageRegion;

    return (
      <div
        key={section.id}
        className='mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm accordion-section'
        data-section-id={section.id}
      >
        {/* Accordion Header */}
        <div className='bg-gray-50 border-b border-gray-200'>
          <button
            type='button'
            className='w-full p-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-inset accordion-toggle'
            data-target={section.id}
          >
            <h3 className='text-lg font-semibold text-gray-900'>
              {section.title}
            </h3>
            <svg
              className={`h-5 w-5 transform transition-transform text-gray-900 accordion-icon ${
                isExpanded ? 'rotate-180' : ''
              }`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {/* Accordion Content */}
        <div
          className={`accordion-content p-4 ${isExpanded ? 'block' : 'hidden'}`}
          id={`content-${section.id}`}
        >
          {/* Document section for this accordion item */}
          <div className='mb-6'>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='relative border border-gray-200 rounded h-80 overflow-hidden'>
                <div
                  className='absolute w-full'
                  style={{
                    top: `-${sectionImageRegion.top}px`,
                    left:
                      sectionImageRegion.left !== undefined
                        ? `-${sectionImageRegion.left}px`
                        : 0,
                    transform: `scale(${sectionImageRegion.zoom || 1})`,
                    transformOrigin: 'top left',
                    height: 'auto',
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt={`Police Report Section for ${section.title}`}
                    width={800}
                    height={1100}
                    className='object-contain w-full'
                    priority
                  />
                </div>
              </div>
              <p className='text-xs text-gray-700 mt-2 text-center'>
                Document section relevant to {section.title}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className='space-y-4'>
            {section.fields.map((field) =>
              renderField(field as keyof PoliceReportData)
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-center mb-4 text-gray-900'>
          Police Report Form - Accordion View
        </h1>
      </div>

      <div className='flex justify-end mb-4'>
        <button
          type='button'
          id='toggle-document-view'
          className='px-3 py-1 rounded-md text-sm font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300'
        >
          Show Full Document
        </button>
      </div>

      {/* Static initial view */}
      <div id='accordion-main-container'>
        {/* Static accordion layout with document viewers inside each section */}
        <div
          className='bg-white rounded-lg shadow-md p-6'
          id='accordion-sections-container'
        >
          {/* Accordion sections */}
          {sections.map((section) => renderAccordionSection(section))}

          {/* Save button */}
          <div className='mt-6 flex justify-end'>
            <button
              type='button'
              id='accordion-save-btn'
              className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
            >
              Save All Changes
            </button>
          </div>
        </div>

        {/* Full document view (initially hidden) */}
        <div id='full-document-container' className='hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Full document view */}
            <div className='bg-gray-50 rounded-lg p-4'>
              <div
                className='border border-gray-200 rounded overflow-y-auto'
                style={{ height: '80vh' }}
              >
                <Image
                  src={imageSrc}
                  alt='Full Police Report'
                  width={800}
                  height={1100}
                  className='object-contain w-full'
                  priority
                />
              </div>
            </div>

            {/* Form section in full document view */}
            <div
              className='bg-white rounded-lg shadow-md p-6 overflow-y-auto'
              style={{ maxHeight: '80vh' }}
            >
              {/* Accordion sections */}
              {sections.map((section) => renderAccordionSection(section))}

              {/* Save button */}
              <div className='mt-6 flex justify-end'>
                <button
                  type='button'
                  className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
                >
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add vanilla JS for accordion functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Handle accordion toggles
            const accordionToggles = document.querySelectorAll('.accordion-toggle');
            
            accordionToggles.forEach(toggle => {
              toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const content = document.getElementById('content-' + targetId);
                const icon = this.querySelector('.accordion-icon');
                
                // Toggle content visibility
                if (content) {
                  content.classList.toggle('hidden');
                  content.classList.toggle('block');
                  
                  // Toggle icon rotation
                  if (icon) {
                    icon.classList.toggle('rotate-180');
                  }
                }
              });
            });
            
            // Handle full document view toggle
            const viewToggleBtn = document.getElementById('toggle-document-view');
            const sectionsContainer = document.getElementById('accordion-sections-container');
            const fullDocContainer = document.getElementById('full-document-container');
            
            if (viewToggleBtn && sectionsContainer && fullDocContainer) {
              viewToggleBtn.addEventListener('click', function() {
                const isShowingFullDoc = this.textContent.includes('Show Full Document');
                
                if (isShowingFullDoc) {
                  sectionsContainer.classList.add('hidden');
                  fullDocContainer.classList.remove('hidden');
                  this.textContent = 'Show Section View';
                  this.classList.add('bg-[#C98F65]', 'text-white');
                  this.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
                } else {
                  sectionsContainer.classList.remove('hidden');
                  fullDocContainer.classList.add('hidden');
                  this.textContent = 'Show Full Document';
                  this.classList.remove('bg-[#C98F65]', 'text-white');
                  this.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
                }
              });
            }
            
            // Handle save button
            const saveBtn = document.getElementById('accordion-save-btn');
            if (saveBtn) {
              saveBtn.addEventListener('click', function() {
                alert('Changes saved successfully!');
              });
            }
          });
          `,
        }}
      />
    </div>
  );
};

export default AccordionSectionViewer;
