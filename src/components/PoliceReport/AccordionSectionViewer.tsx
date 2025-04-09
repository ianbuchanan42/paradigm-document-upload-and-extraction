'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

interface AccordionSectionViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
  onDataChange: (data: PoliceReportData) => void;
  onSubmit: (data: PoliceReportData) => void;
}

const AccordionSectionViewer: React.FC<AccordionSectionViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  onDataChange,
  onSubmit,
}) => {
  const [reportData, setReportData] = useState<PoliceReportData>(initialData);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'internal-affairs',
  ]);
  const [viewMode, setViewMode] = useState<
    'side-by-side' | 'form-only' | 'image-only'
  >('side-by-side');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newData = { ...reportData, [name]: value };
    setReportData(newData);
    onDataChange(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reportData);
  };

  // Define sections and their corresponding fields - same as in the tabbed view
  const sections = [
    {
      id: 'internal-affairs',
      title: 'Internal Affairs',
      fields: ['departmentNo', 'internalAffairsCaseNo'],
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
    },
    {
      id: 'demographics',
      title: 'Demographics',
      fields: ['race', 'gender', 'dob', 'age', 'sex', 'phoneSecondary'],
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
    },
  ];

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev.filter((id) => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  // Keyboard handling for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSection(sectionId);
    }
  };

  // Helper to render appropriate input field based on field name - same logic as tabbed view
  const renderField = (fieldName: keyof PoliceReportData) => {
    const value = reportData[fieldName] || '';

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
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {config.label}
        </label>

        {config.type === 'textarea' ? (
          <textarea
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            rows={4}
          />
        ) : config.type === 'select' && config.options ? (
          <select
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
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
            value={value}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        )}
      </div>
    );
  };

  // Helper to render accordion sections
  const renderAccordionSection = (
    section: (typeof sections)[0],
    index: number
  ) => {
    const isExpanded = expandedSections.includes(section.id);

    return (
      <div key={section.id} className='accordion-section'>
        <h3>
          <button
            type='button'
            className={`w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleSection(section.id)}
            onKeyDown={(e) => handleKeyDown(e, section.id)}
            aria-controls={`section-${section.id}-content`}
          >
            <span className='font-medium text-gray-900'>{section.title}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </h3>

        {isExpanded && (
          <div id={`section-${section.id}-content`} className='p-4 bg-white'>
            <div className='space-y-4'>
              {section.fields.map((field) =>
                renderField(field as keyof PoliceReportData)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Police Report Sections</h1>

        <div className='flex space-x-2'>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1 rounded-md ${
              viewMode === 'side-by-side'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('form-only')}
            className={`px-3 py-1 rounded-md ${
              viewMode === 'form-only'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Form Only
          </button>
          <button
            onClick={() => setViewMode('image-only')}
            className={`px-3 py-1 rounded-md ${
              viewMode === 'image-only'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
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
        {/* Document Image (if in side-by-side or image-only mode) */}
        {(viewMode === 'side-by-side' || viewMode === 'image-only') && (
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className='relative h-[800px] w-full border border-gray-200 rounded overflow-auto'>
              <Image
                src={imageSrc}
                alt='Police Report'
                width={800}
                height={1100}
                className='object-contain'
              />
            </div>
          </div>
        )}

        {/* Form with Accordion Sections (if in side-by-side or form-only mode) */}
        {(viewMode === 'side-by-side' || viewMode === 'form-only') && (
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <form
              onSubmit={handleSubmit}
              className='border border-gray-200 rounded overflow-auto max-h-[800px]'
            >
              <div className='divide-y divide-gray-200'>
                {sections.map((section, index) =>
                  renderAccordionSection(section, index)
                )}
              </div>

              <div className='p-4 bg-gray-50 flex justify-end space-x-2'>
                <button
                  type='button'
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionSectionViewer;
