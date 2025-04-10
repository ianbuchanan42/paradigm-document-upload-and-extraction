import React from 'react';
import { PoliceReportData } from '@/types/PoliceReport';

interface PoliceReportFormProps {
  data: PoliceReportData;
}

export const PoliceReportForm: React.FC<PoliceReportFormProps> = ({ data }) => {
  // Instead of useState, just pre-render without errors
  const errors: Record<string, string> = {};

  // The static form rendering with client-side behavior added via script
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
            defaultValue={value}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#C98F65] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
          />
        ) : type === 'select' && options ? (
          <select
            id={name}
            name={name}
            defaultValue={value}
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
            defaultValue={value}
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
    <form id='police-report-form' className='space-y-6' noValidate>
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
          {renderField('Phone', 'phone', 'tel')}
          {renderField('Employer/School', 'employerSchool')}
        </div>
      </div>

      {/* Demographics Section */}
      <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-gray-900'>
          Demographics
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
          {renderField('Phone (Secondary)', 'phoneSecondary', 'tel')}
        </div>
      </div>

      {/* Submit button */}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'
        >
          Save Changes
        </button>
      </div>

      {/* Add client-side JavaScript for form handling */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('police-report-form');
            
            if (form) {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submitted successfully!');
                
                // In a real app, here you would collect and submit form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form data:', data);
              });
            }
          });
          `,
        }}
      />
    </form>
  );
};

export default PoliceReportForm;
