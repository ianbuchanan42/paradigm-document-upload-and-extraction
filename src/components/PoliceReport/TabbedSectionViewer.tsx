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

interface TabbedSectionViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
}

const TabbedSectionViewer: React.FC<TabbedSectionViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
}) => {
  // Statically define default active tab
  const activeTab = 'internal-affairs';

  // Define sections and their corresponding fields
  const sections: Section[] = [
    {
      id: 'internal-affairs',
      title: 'Internal Affairs',
      fields: ['departmentNo', 'internalAffairsCaseNo'],
      imageRegion: { top: 150, height: 400, zoom: 1 },
    },
    {
      id: 'personal-info',
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
      id: 'demographics',
      title: 'Demographics',
      fields: ['race', 'gender', 'dob', 'age', 'sex', 'phoneSecondary'],
      imageRegion: { top: 700, height: 200, zoom: 1 },
    },
    {
      id: 'incident-basic',
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
      id: 'incident-details',
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

  // Get active section fields - for the initial static render
  const activeSection =
    sections.find((section) => section.id === activeTab) || sections[0];

  // Helper to render appropriate input field based on field name
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

  // Render each section's tab panel
  const renderTabPanel = (section: Section, isActive: boolean) => {
    return (
      <div
        key={section.id}
        role='tabpanel'
        id={`panel-${section.id}`}
        aria-labelledby={`tab-${section.id}`}
        className={isActive ? 'block' : 'hidden'}
        data-section-id={section.id}
      >
        {/* Document section */}
        <div className='mb-6'>
          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='relative border border-gray-200 rounded h-80 overflow-hidden'>
              <div
                className='absolute w-full'
                style={{
                  top: `-${section.imageRegion.top}px`,
                  left:
                    section.imageRegion.left !== undefined
                      ? `-${section.imageRegion.left}px`
                      : 0,
                  transform: `scale(${section.imageRegion.zoom || 1})`,
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
        <div>
          <h2 className='text-xl font-semibold mb-4 text-gray-900'>
            {section.title}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
          Police Report Form - Tabbed View
        </h1>
      </div>

      <div className='bg-white rounded-lg shadow-md'>
        {/* Tab Navigation */}
        <div
          className='flex overflow-x-auto border-b border-gray-200'
          role='tablist'
        >
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-4 py-2 font-medium text-sm transition-colors tab-button ${
                section.id === activeTab
                  ? 'text-white bg-[#C98F65] rounded-t-md border-b-0 shadow-sm font-bold active-tab'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              {...{
                'aria-selected': section.id === activeTab ? 'true' : 'false',
              }}
              role='tab'
              id={`tab-${section.id}`}
              aria-controls={`panel-${section.id}`}
              data-tab-id={section.id}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='p-4'>
          <div className='flex justify-end mb-4'>
            <button
              id='toggle-document-view-btn'
              className='px-3 py-1 rounded-md text-sm font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300'
            >
              Show Full Document
            </button>
          </div>

          <div id='tab-content-container'>
            {/* Initial view - Section specific */}
            <div id='section-view' className='block'>
              <form id='report-form' className='space-y-4'>
                {sections.map((section) =>
                  renderTabPanel(section, section.id === activeTab)
                )}

                <div className='mt-6 flex justify-end'>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Full document view - initially hidden */}
            <div id='full-document-view' className='hidden'>
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

                {/* Form section */}
                <form id='full-document-form' className='space-y-4'>
                  <div>
                    <h2 className='text-xl font-semibold mb-4 text-gray-900'>
                      {activeSection.title}
                    </h2>
                    <div className='space-y-4'>
                      {activeSection.fields.map((field) =>
                        renderField(field as keyof PoliceReportData)
                      )}
                    </div>
                  </div>

                  <div className='mt-6 flex justify-end'>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vanilla JS for tab functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Tab switching
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabPanels = document.querySelectorAll('[role="tabpanel"]');
            
            tabButtons.forEach(button => {
              button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab-id');
                
                // Update active tab
                tabButtons.forEach(btn => {
                  if(btn.getAttribute('data-tab-id') === tabId) {
                    btn.classList.add('text-white', 'bg-[#C98F65]', 'rounded-t-md', 'border-b-0', 'shadow-sm', 'font-bold', 'active-tab');
                    btn.classList.remove('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
                    btn.setAttribute('aria-selected', 'true');
                  } else {
                    btn.classList.remove('text-white', 'bg-[#C98F65]', 'rounded-t-md', 'border-b-0', 'shadow-sm', 'font-bold', 'active-tab');
                    btn.classList.add('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
                    btn.setAttribute('aria-selected', 'false');
                  }
                });
                
                // Update visible panel
                tabPanels.forEach(panel => {
                  if(panel.getAttribute('data-section-id') === tabId) {
                    panel.classList.remove('hidden');
                    panel.classList.add('block');
                  } else {
                    panel.classList.add('hidden');
                    panel.classList.remove('block');
                  }
                });
              });
            });
            
            // Toggle document view
            const viewToggleBtn = document.getElementById('toggle-document-view-btn');
            const sectionView = document.getElementById('section-view');
            const fullDocumentView = document.getElementById('full-document-view');
            
            if(viewToggleBtn && sectionView && fullDocumentView) {
              viewToggleBtn.addEventListener('click', function() {
                const isShowingFullDoc = this.textContent.trim() === 'Show Full Document';
                
                if(isShowingFullDoc) {
                  sectionView.classList.add('hidden');
                  sectionView.classList.remove('block');
                  fullDocumentView.classList.add('block');
                  fullDocumentView.classList.remove('hidden');
                  this.textContent = 'Show Section View';
                  this.classList.add('bg-[#C98F65]', 'text-white');
                  this.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
                } else {
                  sectionView.classList.add('block');
                  sectionView.classList.remove('hidden');
                  fullDocumentView.classList.add('hidden');
                  fullDocumentView.classList.remove('block');
                  this.textContent = 'Show Full Document';
                  this.classList.remove('bg-[#C98F65]', 'text-white');
                  this.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
                }
              });
            }
            
            // Form submission
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Changes saved successfully!');
                
                // In a real app, you would process the form data here
                const formData = new FormData(form);
                const data = {};
                for(let [key, value] of formData.entries()) {
                  data[key] = value;
                }
                console.log('Form data:', data);
              });
            });
          });
          `,
        }}
      />
    </div>
  );
};

export default TabbedSectionViewer;
