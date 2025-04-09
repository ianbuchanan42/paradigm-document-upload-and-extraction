'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

interface SimpleSideBySideProps {
  imageSrc: string;
  initialData?: PoliceReportData;
  onDataChange?: (data: PoliceReportData) => void;
  onSubmit?: (data: PoliceReportData) => void;
}

const SimpleSideBySide: React.FC<SimpleSideBySideProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
  onDataChange = () => {},
  onSubmit = () => {},
}) => {
  const [reportData, setReportData] = useState<PoliceReportData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newData = { ...reportData, [name]: value } as PoliceReportData;
    setReportData(newData);
    onDataChange(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reportData);
  };

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Image Panel */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Original Document</h2>
          <div className='relative h-[800px] w-full border border-gray-200 rounded overflow-auto'>
            <Image
              src={imageSrc}
              alt='Police Report'
              width={800}
              height={1100}
              className='object-contain'
              priority
            />
          </div>
        </div>

        {/* Form Panel */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Edit Form Data</h2>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 overflow-auto max-h-[800px] pr-2'
          >
            {/* Internal Affairs Section */}
            <div className='bg-gray-50 p-4 rounded-md'>
              <h3 className='font-medium mb-3 text-gray-800'>
                Internal Affairs
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='departmentNo'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Department No.
                  </label>
                  <input
                    type='text'
                    id='departmentNo'
                    name='departmentNo'
                    value={reportData.departmentNo || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='internalAffairsCaseNo'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Internal Affairs Case No.
                  </label>
                  <input
                    type='text'
                    id='internalAffairsCaseNo'
                    name='internalAffairsCaseNo'
                    value={reportData.internalAffairsCaseNo || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>

            {/* Person Making Report Section */}
            <div className='bg-gray-50 p-4 rounded-md'>
              <h3 className='font-medium mb-3 text-gray-800'>
                Person Making Report
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={reportData.name || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='alias'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Alias
                  </label>
                  <input
                    type='text'
                    id='alias'
                    name='alias'
                    value={reportData.alias || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={reportData.address || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    City
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={reportData.city || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>

            {/* Incident Information Section */}
            <div className='bg-gray-50 p-4 rounded-md'>
              <h3 className='font-medium mb-3 text-gray-800'>
                Incident Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='natureOfComplaint'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Nature of Complaint
                  </label>
                  <input
                    type='text'
                    id='natureOfComplaint'
                    name='natureOfComplaint'
                    value={reportData.natureOfComplaint || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='complaintAgainst'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Complaint Against
                  </label>
                  <input
                    type='text'
                    id='complaintAgainst'
                    name='complaintAgainst'
                    value={reportData.complaintAgainst || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='incidentDate'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Incident Date
                  </label>
                  <input
                    type='date'
                    id='incidentDate'
                    name='incidentDate'
                    value={reportData.incidentDate || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='incidentTime'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Incident Time
                  </label>
                  <input
                    type='time'
                    id='incidentTime'
                    name='incidentTime'
                    value={reportData.incidentTime || ''}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='incidentDescription'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Description of Incident
                </label>
                <textarea
                  id='incidentDescription'
                  name='incidentDescription'
                  value={reportData.incidentDescription || ''}
                  onChange={handleChange}
                  rows={4}
                  className='w-full p-2 border border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
      </div>
    </div>
  );
};

export default SimpleSideBySide;
