import React from 'react';
import Image from 'next/image';
import { PoliceReportData, emptyPoliceReport } from '@/types/PoliceReport';

interface SideBySideViewerProps {
  imageSrc: string;
  initialData?: PoliceReportData;
}

const SideBySideViewer: React.FC<SideBySideViewerProps> = ({
  imageSrc,
  initialData = emptyPoliceReport,
}) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-center mb-4 text-gray-900'>
          Police Report Form - Side by Side View
        </h1>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left side - Document Image */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <div
              className='border border-gray-200 rounded overflow-y-auto'
              style={{ height: '80vh' }}
            >
              <Image
                src={imageSrc}
                alt='Police Report'
                width={800}
                height={1100}
                className='object-contain w-full'
                priority
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className='overflow-y-auto' style={{ maxHeight: '80vh' }}>
            <h2 className='text-xl font-semibold mb-4 text-gray-900'>
              Report Information
            </h2>
            <form id='police-report-form' className='space-y-4'>
              {/* Department Details */}
              <div className='border-b pb-4 mb-4'>
                <h3 className='text-lg font-medium mb-3 text-gray-800'>
                  Department Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='departmentNo'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Department No.
                    </label>
                    <input
                      type='text'
                      id='departmentNo'
                      name='departmentNo'
                      defaultValue={initialData.departmentNo || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='internalAffairsCaseNo'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Internal Affairs Case No.
                    </label>
                    <input
                      type='text'
                      id='internalAffairsCaseNo'
                      name='internalAffairsCaseNo'
                      defaultValue={initialData.internalAffairsCaseNo || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className='border-b pb-4 mb-4'>
                <h3 className='text-lg font-medium mb-3 text-gray-800'>
                  Personal Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Full Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      defaultValue={initialData.name || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='alias'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Alias/Nickname
                    </label>
                    <input
                      type='text'
                      id='alias'
                      name='alias'
                      defaultValue={initialData.alias || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Address
                    </label>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      defaultValue={initialData.address || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      defaultValue={initialData.city || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='state'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      State
                    </label>
                    <select
                      id='state'
                      name='state'
                      defaultValue={initialData.state || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    >
                      <option value=''>Select State</option>
                      {[
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
                      ].map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='zip'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      ZIP Code
                    </label>
                    <input
                      type='text'
                      id='zip'
                      name='zip'
                      defaultValue={initialData.zip || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Phone
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      defaultValue={initialData.phone || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className='border-b pb-4 mb-4'>
                <h3 className='text-lg font-medium mb-3 text-gray-800'>
                  Demographics
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='race'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Race
                    </label>
                    <input
                      type='text'
                      id='race'
                      name='race'
                      defaultValue={initialData.race || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='gender'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Gender
                    </label>
                    <select
                      id='gender'
                      name='gender'
                      defaultValue={initialData.gender || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    >
                      <option value=''>Select Gender</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Non-binary'>Non-binary</option>
                      <option value='Other'>Other</option>
                      <option value='Prefer not to say'>
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='dob'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Date of Birth
                    </label>
                    <input
                      type='date'
                      id='dob'
                      name='dob'
                      defaultValue={initialData.dob || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='age'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Age
                    </label>
                    <input
                      type='number'
                      id='age'
                      name='age'
                      defaultValue={initialData.age || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                </div>
              </div>

              {/* Incident Information */}
              <div className='border-b pb-4 mb-4'>
                <h3 className='text-lg font-medium mb-3 text-gray-800'>
                  Incident Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='natureOfComplaint'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Nature of Complaint
                    </label>
                    <input
                      type='text'
                      id='natureOfComplaint'
                      name='natureOfComplaint'
                      defaultValue={initialData.natureOfComplaint || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='complaintAgainst'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Complaint Against
                    </label>
                    <input
                      type='text'
                      id='complaintAgainst'
                      name='complaintAgainst'
                      defaultValue={initialData.complaintAgainst || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='incidentDate'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Incident Date
                    </label>
                    <input
                      type='date'
                      id='incidentDate'
                      name='incidentDate'
                      defaultValue={initialData.incidentDate || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='incidentTime'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Incident Time
                    </label>
                    <input
                      type='time'
                      id='incidentTime'
                      name='incidentTime'
                      defaultValue={initialData.incidentTime || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='incidentLocation'
                      className='block text-sm font-medium text-gray-800 mb-1'
                    >
                      Incident Location
                    </label>
                    <input
                      type='text'
                      id='incidentLocation'
                      name='incidentLocation'
                      defaultValue={initialData.incidentLocation || ''}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                    />
                  </div>
                </div>
              </div>

              {/* Incident Description */}
              <div>
                <h3 className='text-lg font-medium mb-3 text-gray-800'>
                  Incident Description
                </h3>
                <div>
                  <label
                    htmlFor='incidentDescription'
                    className='block text-sm font-medium text-gray-800 mb-1'
                  >
                    Description
                  </label>
                  <textarea
                    id='incidentDescription'
                    name='incidentDescription'
                    defaultValue={initialData.incidentDescription || ''}
                    rows={4}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C98F65]'
                  />
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
          </div>
        </div>
      </div>

      {/* Vanilla JS for form submission */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('police-report-form');
            
            if(form) {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate the form (simple example)
                let isValid = true;
                const requiredFields = ['name', 'phone', 'incidentDate', 'incidentDescription'];
                
                requiredFields.forEach(fieldName => {
                  const field = document.getElementById(fieldName);
                  if(field && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if(!errorMsg) {
                      errorMsg = document.createElement('p');
                      errorMsg.className = 'text-red-500 text-xs mt-1 error-message';
                      errorMsg.textContent = 'This field is required';
                      field.parentNode.appendChild(errorMsg);
                    }
                  } else if(field) {
                    field.classList.remove('border-red-500');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if(errorMsg) errorMsg.remove();
                  }
                });
                
                if(isValid) {
                  // In a real app, you would process the form data here
                  const formData = new FormData(form);
                  const data = {};
                  for(let [key, value] of formData.entries()) {
                    data[key] = value;
                  }
                  console.log('Form data:', data);
                  
                  alert('Report submitted successfully!');
                } else {
                  // Scroll to first error
                  const firstError = document.querySelector('.border-red-500');
                  if(firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }
              });
              
              // Clear validation errors when user starts typing
              form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('input', function() {
                  this.classList.remove('border-red-500');
                  const errorMsg = this.parentNode.querySelector('.error-message');
                  if(errorMsg) errorMsg.remove();
                });
              });
            }
          });
          `,
        }}
      />
    </div>
  );
};

export default SideBySideViewer;
