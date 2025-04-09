'use client';

import React, { useState } from 'react';
import { PoliceReportData } from '@/types/PoliceReport';

interface PoliceReportFormProps {
  data: PoliceReportData;
  onChange: (data: PoliceReportData) => void;
  onSubmit: (data: PoliceReportData) => void;
}

export const PoliceReportForm: React.FC<PoliceReportFormProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };

    // Perform validation
    validateField(name, value);

    // Update parent component
    onChange(newData);
  };

  const validateField = (name: string, value: string) => {
    let fieldErrors = { ...errors };

    // Clear existing error for this field
    delete fieldErrors[name];

    // Validate based on field name
    switch (name) {
      case 'phone':
      case 'phoneSecondary':
        if (value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          fieldErrors[name] = 'Phone must be in format (XXX) XXX-XXXX';
        }
        break;
      case 'zip':
        if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
          fieldErrors[name] = 'ZIP code must be in format XXXXX or XXXXX-XXXX';
        }
        break;
      case 'dob':
        if (value) {
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            fieldErrors[name] = 'Please enter a valid date';
          }
        }
        break;
      case 'age':
        if (
          value &&
          (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 120)
        ) {
          fieldErrors[name] = 'Please enter a valid age (0-120)';
        }
        break;
      default:
        // For required fields
        if (value.trim() === '') {
          fieldErrors[name] = 'This field is required';
        }
    }

    setErrors(fieldErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const allErrors: Record<string, string> = {};
    Object.entries(data).forEach(([key, value]) => {
      // Only validate string values
      if (typeof value === 'string') {
        validateField(key, value);

        // Collect errors for all required fields
        if (value.trim() === '') {
          allErrors[key] = 'This field is required';
        }
      }
    });

    // Update errors state
    setErrors(allErrors);

    // Only submit if no errors
    if (Object.keys(allErrors).length === 0) {
      onSubmit(data);
    }
  };

  const renderField = (
    label: string,
    name: keyof PoliceReportData,
    type: string = 'text',
    options?: string[]
  ) => {
    const value = data[name] || '';
    const error = errors[name];

    return (
      <div className='mb-4'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-800 mb-1'
        >
          {label}
        </label>

        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#C98F65] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
          />
        ) : type === 'select' && options ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#C98F65] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value=''>Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#C98F65] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}

        {error && (
          <p id={`${name}-error`} className='mt-1 text-sm text-red-600'>
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6' noValidate>
      {/* Internal Affairs Section */}
      <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-gray-900'>
          Internal Affairs Section
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {renderField('Department No.', 'departmentNo')}
          {renderField('Internal Affairs Case No.', 'internalAffairsCaseNo')}
        </div>
      </div>

      {/* Person Making Report Section */}
      <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-gray-900'>
          Person Making Report
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {renderField('Name', 'name')}
          {renderField('Alias', 'alias')}
          {renderField('Address', 'address')}
          {renderField('City', 'city')}
          {renderField('State', 'state', 'select', [
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
          ])}
          {renderField('ZIP', 'zip')}
          {renderField('Phone', 'phone')}
          {renderField('Employer/School', 'employerSchool')}
          {renderField('Race', 'race')}
          {renderField('Gender', 'gender', 'select', [
            'Male',
            'Female',
            'Non-binary',
            'Other',
            'Prefer not to say',
          ])}
          {renderField('Date of Birth', 'dob', 'date')}
          {renderField('Age', 'age', 'number')}
          {renderField('Sex', 'sex', 'select', ['Male', 'Female', 'Other'])}
          {renderField('Phone (Secondary)', 'phoneSecondary')}
        </div>
      </div>

      {/* Incident Details Section */}
      <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-gray-900'>
          Incident Details
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {renderField('Nature of Complaint', 'natureOfComplaint')}
          {renderField('Complaint Against (Name[s])', 'complaintAgainst')}
          {renderField('Badge No(s)', 'badgeNos')}
          {renderField('Date', 'incidentDate', 'date')}
          {renderField('Time', 'incidentTime', 'time')}
          {renderField(
            'Date/Time Reported',
            'reportedDateTime',
            'datetime-local'
          )}
          {renderField('How Reported', 'howReported', 'select', [
            'In Person',
            'Phone',
            'Email',
            'Mail',
            'Online',
            'Other',
          ])}
          {renderField('Incident Location', 'incidentLocation')}
          {renderField('Dist/Area', 'distArea')}
          {renderField('Beat', 'beat')}
        </div>
        <div className='mt-4'>
          {renderField(
            'Description of Incident',
            'incidentDescription',
            'textarea'
          )}
        </div>
      </div>

      <div className='mt-6 flex justify-end'>
        <button
          type='submit'
          className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
        >
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default PoliceReportForm;
