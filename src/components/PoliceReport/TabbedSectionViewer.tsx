'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

interface TabbedSectionViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
  onDataChange: (data: PoliceReportData) => void;
  onSubmit: (data: PoliceReportData) => void;
}

const TabbedSectionViewer: React.FC<TabbedSectionViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  onDataChange,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState('internal-affairs');
  const [reportData, setReportData] = useState<PoliceReportData>(initialData);
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

  // Define sections and their corresponding fields
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

  // Get active section fields
  const activeSection =
    sections.find((section) => section.id === activeTab) || sections[0];

  // Helper to render appropriate input field based on field name
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

      {/* Tabs navigation */}
      <div className='mb-6 border-b border-gray-200'>
        <nav className='flex -mb-px space-x-1' aria-label='Sections'>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(section.id)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area */}
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
            <div className='relative h-[600px] w-full border border-gray-200 rounded overflow-auto'>
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

        {/* Form Section (if in side-by-side or form-only mode) */}
        {(viewMode === 'side-by-side' || viewMode === 'form-only') && (
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className='border border-gray-200 rounded p-4 overflow-auto max-h-[600px]'>
              <h2 className='text-lg font-semibold mb-4'>
                {activeSection.title}
              </h2>

              <form onSubmit={handleSubmit} className='space-y-4'>
                {activeSection.fields.map((field) =>
                  renderField(field as keyof PoliceReportData)
                )}

                <div className='pt-4 flex justify-end space-x-2'>
                  <button
                    type='button'
                    className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onClick={() => {
                      // Find the current section index
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeTab
                      );
                      // Go to previous section if possible
                      if (currentIndex > 0) {
                        setActiveTab(sections[currentIndex - 1].id);
                      }
                    }}
                  >
                    Previous
                  </button>

                  {activeTab === sections[sections.length - 1].id ? (
                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      onClick={() => {
                        // Find the current section index
                        const currentIndex = sections.findIndex(
                          (s) => s.id === activeTab
                        );
                        // Go to next section if possible
                        if (currentIndex < sections.length - 1) {
                          setActiveTab(sections[currentIndex + 1].id);
                        }
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedSectionViewer;
