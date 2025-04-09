'use client';

import React, { useState } from 'react';
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
  onDataChange: (data: PoliceReportData) => void;
  onSubmit: (data: PoliceReportData) => void;
  defaultImageRegion?: ImageRegion; // Default image region if section doesn't define one
}

const TabbedSectionViewer: React.FC<TabbedSectionViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  onDataChange,
  onSubmit,
  defaultImageRegion = { top: 0, height: 800, zoom: 1, left: 0, width: 800 }, // Default image region with all properties
}) => {
  const [activeTab, setActiveTab] = useState('internal-affairs');
  const [reportData, setReportData] = useState<PoliceReportData>(initialData);
  const [showFullDocument, setShowFullDocument] = useState(false);

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

  // Get active section fields
  const activeSection =
    sections.find((section) => section.id === activeTab) || sections[0];

  // Get the image region for the active section, or use default if not defined
  const activeImageRegion = activeSection.imageRegion || defaultImageRegion;

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
          className='block text-sm font-medium text-gray-800 mb-1'
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
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-center mb-4 text-gray-900'>
          Police Report Form - Tabbed View
        </h1>
      </div>

      <div className='bg-white rounded-lg shadow-md'>
        {/* Tab Navigation */}
        <div className='flex overflow-x-auto border-b border-gray-200'>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='p-4'>
          <div className='flex justify-end mb-4'>
            <button
              onClick={() => setShowFullDocument(!showFullDocument)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                showFullDocument
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {showFullDocument ? 'Show Section View' : 'Show Full Document'}
            </button>
          </div>

          {showFullDocument ? (
            // Side by side (full document) layout
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
              <form onSubmit={handleSubmit}>
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
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Original section-specific layout
            <form onSubmit={handleSubmit}>
              {/* Document section - Now appears above the form fields */}
              <div className='mb-6'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='relative border border-gray-200 rounded h-80 overflow-hidden'>
                    <div
                      className='absolute w-full'
                      style={{
                        top: `-${activeImageRegion.top}px`,
                        left:
                          activeImageRegion.left !== undefined
                            ? `-${activeImageRegion.left}px`
                            : 0,
                        transform: `scale(${activeImageRegion.zoom || 1})`,
                        transformOrigin: 'top left',
                        height: 'auto',
                      }}
                    >
                      <Image
                        src={imageSrc}
                        alt='Police Report Section'
                        width={800}
                        height={1100}
                        className='object-contain w-full'
                        priority
                      />
                    </div>
                  </div>
                  <p className='text-xs text-gray-700 mt-2 text-center'>
                    Document section relevant to {activeSection.title}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <h2 className='text-xl font-semibold mb-4 text-gray-900'>
                  {activeSection.title}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {activeSection.fields.map((field) =>
                    renderField(field as keyof PoliceReportData)
                  )}
                </div>
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabbedSectionViewer;
