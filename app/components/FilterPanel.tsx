import React, { useState } from 'react';
import { CustomDropdown, Option } from '@/app/components/CustomDropdown';

export interface FilterOption {
  type: 'dropdown' | 'checkbox';
  label: string;
  options: Option[] | string[];
  value: string | string[]; // Add this line to track the current value
}

interface FilterPanelProps {
  filters: FilterOption[];
  onFilterChange: (filterType: string, value: string | string[]) => void;
  onClearFilters: () => void;  // Add this line
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        {showFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary-dark transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
      {showFilters && (
        <div className="mb-8 space-y-4 p-4 bg-secondary rounded-lg">
          {filters.map((filter, index) => (
            <div key={index}>
              {filter.type === 'dropdown' && (
                <CustomDropdown
                  options={filter.options as Option[]}
                  onChange={(value) => onFilterChange(filter.label, value)}
                  label={filter.label}
                  value={filter.value as string}
                  placeholder={`Select ${filter.label}`}
                />
              )}
              {filter.type === 'checkbox' && (
                <div>
                  <span className="text-secondary mr-4">{filter.label}:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {(filter.options as string[]).map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={(filter.value as string[]).includes(option)}
                          onChange={(e) => onFilterChange(filter.label, option)}
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
