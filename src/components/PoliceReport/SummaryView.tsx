'use client';

import React, { useState } from 'react';
import { PoliceReportData } from '@/types/PoliceReport';

// Define highlight category type
interface HighlightCategory {
  color: string;
  label: string;
  textColor?: string;
}

// Define highlight categories and their colors
const highlightCategories: Record<string, HighlightCategory> = {
  weapon: { color: '#FFD166', label: 'Weapon' },
  witness: { color: '#06D6A0', label: 'Witness' },
  injury: { color: '#EF476F', label: 'Injury' },
  evidence: { color: '#118AB2', label: 'Evidence' },
  vehicle: { color: '#073B4C', label: 'Vehicle', textColor: 'white' },
  suspect: { color: '#7F4CA5', label: 'Suspect', textColor: 'white' },
};

type HighlightType = keyof typeof highlightCategories;

// Base interface for highlighted items
interface HighlightableRecord {
  highlight?: HighlightType;
  [key: string]: string | undefined;
}

interface HighlightedText {
  text: string;
  type?: HighlightType;
}

interface SummaryViewProps {
  reportData: PoliceReportData;
}

const SummaryView: React.FC<SummaryViewProps> = ({ reportData }) => {
  // Demo narrative with highlighted sections
  const demoNarrative: HighlightedText[] = [
    { text: 'On ' },
    { text: reportData.incidentDate || 'June 15, 2023' },
    { text: ' at approximately ' },
    { text: reportData.incidentTime || '22:30' },
    { text: ', officers responded to a disturbance call at ' },
    { text: reportData.incidentLocation || '1234 Main Street' },
    { text: '. Upon arrival, officers observed ' },
    { text: 'three individuals fleeing the scene', type: 'suspect' },
    { text: '. ' },
    { text: 'A witness', type: 'witness' },
    { text: ' identified as ' },
    { text: reportData.name || 'Jane Doe' },
    { text: ' reported hearing ' },
    { text: 'gunshots', type: 'weapon' },
    { text: ' and observing a ' },
    { text: 'silver sedan', type: 'vehicle' },
    { text: ' with license plate ' },
    { text: 'ABC-123', type: 'vehicle' },
    { text: ' leaving the scene at high speed. ' },
    { text: 'The witness', type: 'witness' },
    { text: ' stated that a ' },
    { text: 'handgun', type: 'weapon' },
    {
      text: ' was dropped by one of the fleeing individuals. Officers recovered a ',
    },
    { text: '9mm Smith & Wesson handgun', type: 'weapon' },
    { text: ' at the scene. Serial number appears to be ' },
    { text: 'partially damaged', type: 'evidence' },
    { text: ' but was recorded as ' },
    { text: 'SW9238-B', type: 'evidence' },
    { text: '. ' },
    { text: 'Two victims', type: 'injury' },
    { text: ' were located inside the premises with ' },
    { text: 'non-life-threatening injuries', type: 'injury' },
    {
      text: '. They were transported to County General Hospital for treatment. The victims reported that a ',
    },
    { text: 'firearm was missing', type: 'evidence' },
    { text: ' from the residence, described as a ' },
    { text: 'Glock 17', type: 'weapon' },
    { text: '. The investigation is ongoing.' },
  ];

  // Create a mock summary for demonstration purposes
  const createMockSummary = () => {
    // Use form data where available, otherwise use mock data
    return {
      incidentDetails: {
        date: reportData.incidentDate || 'June 15, 2023',
        time: reportData.incidentTime || '22:30',
        location: reportData.incidentLocation || '1234 Main Street',
        natureOfComplaint:
          reportData.natureOfComplaint || 'Disturbance with shots fired',
        reportedDateTime: reportData.reportedDateTime || '2023-06-15T23:15',
        reportedBy: reportData.name || 'Jane Doe',
        howReported: reportData.howReported || 'Phone',
      },
      evidenceRecovered: [
        {
          item: '9mm Smith & Wesson handgun',
          serialNumber: 'SW9238-B (partially damaged)',
          location: 'Sidewalk outside main entrance',
          condition: 'Loaded, safety off',
          highlight: 'weapon',
        },
        {
          item: 'Shell casings (5)',
          serialNumber: 'N/A',
          location: 'Living room floor',
          condition: '9mm caliber',
          highlight: 'evidence',
        },
        {
          item: 'Surveillance video',
          serialNumber: 'N/A',
          location: 'Building security system',
          condition: 'Retrieved, under review',
          highlight: 'evidence',
        },
      ],
      missingItems: [
        {
          item: 'Glock 17 pistol',
          serialNumber: 'GK7721',
          description: 'Black, registered to homeowner',
          highlight: 'weapon',
        },
        {
          item: 'Laptop computer',
          serialNumber: 'Unknown',
          description: 'MacBook Pro, silver',
          highlight: 'evidence',
        },
      ],
      witnesses: [
        {
          name: reportData.name || 'Jane Doe',
          contact: reportData.phone || '(555) 123-4567',
          statement: 'Heard gunshots and observed silver sedan leaving scene',
          credibility: 'Reliable - provided consistent account',
          highlight: 'witness',
        },
        {
          name: 'John Smith',
          contact: '(555) 987-6543',
          statement: 'Observed three males running from the building',
          credibility: 'Partial view only - limited description provided',
          highlight: 'witness',
        },
      ],
      injuries: [
        {
          victim: 'Robert Johnson',
          injuries: 'Gunshot wound to right leg',
          treatment: 'Transported to County General Hospital',
          condition: 'Stable',
          highlight: 'injury',
        },
        {
          victim: 'Maria Garcia',
          injuries: 'Laceration to forehead, bruising',
          treatment: 'Transported to County General Hospital',
          condition: 'Treated and released',
          highlight: 'injury',
        },
      ],
      vehicles: [
        {
          make: 'Toyota',
          model: 'Camry',
          color: 'Silver',
          year: '2019',
          license: 'ABC-123',
          state: 'CA',
          involvement: 'Possible suspect vehicle',
          highlight: 'vehicle',
        },
      ],
      suspects: [
        {
          description:
            'Male, approx. 20-25 years old, 5\'10", thin build, wearing dark hoodie',
          actions: 'Fled scene on foot, potentially dropped recovered weapon',
          status: 'At large',
          highlight: 'suspect',
        },
        {
          description: 'Two additional males, no clear description available',
          actions: 'Fled scene on foot',
          status: 'At large',
          highlight: 'suspect',
        },
      ],
    };
  };

  const mockSummary = createMockSummary();

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'narrative',
    'incident',
    'evidence',
    'witnesses',
    'injuries',
    'vehicles',
    'suspects',
  ]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // State for active highlight filters
  const [activeFilters, setActiveFilters] = useState<HighlightType[]>(
    Object.keys(highlightCategories) as HighlightType[]
  );

  // Toggle highlight filter
  const toggleFilter = (filterType: HighlightType) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((type) => type !== filterType)
        : [...prev, filterType]
    );
  };

  // Check if a section has highlighted items of a certain type
  const sectionHasHighlight = (
    items: HighlightableRecord[],
    highlightType: HighlightType
  ) => {
    return items.some((item) => item.highlight === highlightType);
  };

  // Render narrative with highlights
  const renderNarrative = () => {
    return demoNarrative.map((segment, index) => {
      if (!segment.type || activeFilters.includes(segment.type)) {
        const highlightStyle = segment.type
          ? {
              backgroundColor: highlightCategories[segment.type].color,
              color: highlightCategories[segment.type].textColor || 'black',
              padding: '0 2px',
              borderRadius: '2px',
              fontWeight: 'bold',
            }
          : { color: 'black' };

        return (
          <span key={index} style={highlightStyle}>
            {segment.text}
          </span>
        );
      }
      return null;
    });
  };

  // Styled expandable section
  const ExpandableSection = ({
    id,
    title,
    children,
    hasHighlightedItems = false,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
    hasHighlightedItems?: boolean;
  }) => {
    const isExpanded = expandedSections.includes(id);

    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSection(id);
    };

    return (
      <div className='border border-gray-200 rounded-md mb-4 overflow-hidden'>
        <button
          type='button'
          onClick={handleToggle}
          className='w-full p-3 text-left bg-gray-50 flex justify-between items-center border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C98F65]'
        >
          <h2 className='text-lg font-semibold text-gray-900'>
            {title}
            {hasHighlightedItems && (
              <span className='ml-2 px-2 py-0.5 text-xs bg-[#C98F65] text-white rounded-full'>
                Has highlights
              </span>
            )}
          </h2>
          <svg
            className={`h-5 w-5 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            } text-gray-700`}
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
        {isExpanded && <div className='p-4 bg-white'>{children}</div>}
      </div>
    );
  };

  // Item with optional highlight
  const HighlightableItem = ({
    item,
    highlightField = 'highlight',
  }: {
    item: HighlightableRecord;
    highlightField?: string;
  }) => {
    const highlightType = item[highlightField] as HighlightType;

    if (highlightType && !activeFilters.includes(highlightType)) {
      return null;
    }

    const highlightStyle = highlightType
      ? {
          borderLeft: `4px solid ${highlightCategories[highlightType].color}`,
          paddingLeft: '12px',
        }
      : {};

    return (
      <div
        className='p-3 border border-gray-200 rounded mb-2 bg-white text-gray-900'
        style={highlightStyle}
      >
        {Object.entries(item).map(([key, value]) => {
          if (key === highlightField) return null;
          return (
            <div key={key} className='mb-1'>
              <span className='font-semibold'>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
              </span>
              <span>{value as string}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6 text-gray-900'>
        Police Report Summary
      </h1>

      {/* Highlight filters */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2 text-gray-900'>
          Highlight Filters
        </h2>
        <div className='flex flex-wrap gap-2'>
          {Object.entries(highlightCategories).map(([type, config]) => (
            <button
              key={type}
              onClick={() => toggleFilter(type as HighlightType)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
                activeFilters.includes(type as HighlightType)
                  ? 'ring-2 ring-gray-400'
                  : 'opacity-50'
              }`}
              style={{
                backgroundColor: config.color,
                color: config.textColor || 'black',
              }}
            >
              {config.label}
              {activeFilters.includes(type as HighlightType) ? (
                <svg
                  className='ml-1 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Section */}
      <ExpandableSection
        id='narrative'
        title='Incident Narrative'
        hasHighlightedItems={true}
      >
        <div className='prose max-w-none'>
          <p className='text-lg leading-relaxed text-gray-900'>
            {renderNarrative()}
          </p>
        </div>
      </ExpandableSection>

      {/* Incident Details */}
      <ExpandableSection id='incident' title='Incident Details'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900'>
          {Object.entries(mockSummary.incidentDetails).map(([key, value]) => (
            <div key={key} className='border-b border-gray-200 pb-2'>
              <span className='font-semibold'>
                {key.replace(/([A-Z])/g, ' $1').trim()}:{' '}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Evidence Section */}
      <ExpandableSection
        id='evidence'
        title='Evidence'
        hasHighlightedItems={
          sectionHasHighlight(mockSummary.evidenceRecovered, 'weapon') ||
          sectionHasHighlight(mockSummary.evidenceRecovered, 'evidence') ||
          sectionHasHighlight(mockSummary.missingItems, 'weapon') ||
          sectionHasHighlight(mockSummary.missingItems, 'evidence')
        }
      >
        <div className='text-gray-900'>
          <h3 className='text-md font-semibold mb-3'>Recovered Items</h3>
          {mockSummary.evidenceRecovered.map((item, idx) => (
            <HighlightableItem key={idx} item={item} />
          ))}

          <h3 className='text-md font-semibold mt-4 mb-3'>Missing Items</h3>
          {mockSummary.missingItems.map((item, idx) => (
            <HighlightableItem key={idx} item={item} />
          ))}
        </div>
      </ExpandableSection>

      {/* Witnesses Section */}
      <ExpandableSection
        id='witnesses'
        title='Witnesses'
        hasHighlightedItems={sectionHasHighlight(
          mockSummary.witnesses,
          'witness'
        )}
      >
        <div className='text-gray-900'>
          {mockSummary.witnesses.map((witness, idx) => (
            <HighlightableItem key={idx} item={witness} />
          ))}
        </div>
      </ExpandableSection>

      {/* Injuries Section */}
      <ExpandableSection
        id='injuries'
        title='Injuries'
        hasHighlightedItems={sectionHasHighlight(
          mockSummary.injuries,
          'injury'
        )}
      >
        <div className='text-gray-900'>
          {mockSummary.injuries.map((injury, idx) => (
            <HighlightableItem key={idx} item={injury} />
          ))}
        </div>
      </ExpandableSection>

      {/* Vehicles Section */}
      <ExpandableSection
        id='vehicles'
        title='Vehicles'
        hasHighlightedItems={sectionHasHighlight(
          mockSummary.vehicles,
          'vehicle'
        )}
      >
        <div className='text-gray-900'>
          {mockSummary.vehicles.map((vehicle, idx) => (
            <HighlightableItem key={idx} item={vehicle} />
          ))}
        </div>
      </ExpandableSection>

      {/* Suspects Section */}
      <ExpandableSection
        id='suspects'
        title='Suspects'
        hasHighlightedItems={sectionHasHighlight(
          mockSummary.suspects,
          'suspect'
        )}
      >
        <div className='text-gray-900'>
          {mockSummary.suspects.map((suspect, idx) => (
            <HighlightableItem key={idx} item={suspect} />
          ))}
        </div>
      </ExpandableSection>

      {/* Case Actions */}
      <div className='mt-6 flex justify-end'>
        <button className='mr-2 px-4 py-2 border border-[#C98F65] text-[#C98F65] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'>
          Print Summary
        </button>
        <button className='px-4 py-2 bg-[#C98F65] text-white rounded-md hover:bg-[#b57a50] focus:outline-none focus:ring-2 focus:ring-[#C98F65] focus:ring-offset-2 transition-colors'>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default SummaryView;
