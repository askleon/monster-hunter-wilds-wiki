import React from 'react';
import { CustomDropdown, Option } from './CustomDropdown';
import styles from './MaterialFilterPanel.module.css';

interface FilterOption {
  type: 'dropdown' | 'checkbox';
  label: string;
  options: Option[];
  value: string | string[];
}

interface FilterPanelProps {
  filters: FilterOption[];
  onFilterChange: (filterType: string, value: string | string[]) => void;
  onClearFilters: () => void;
}

export function MaterialFilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  return (
    <div className={styles.filterPanel}>
      {filters.map((filter) => (
        <div key={filter.label} className={styles.filterGroup}>
          <label className={styles.filterLabel}>{filter.label}</label>
          {filter.type === 'dropdown' && (
            <CustomDropdown
              options={filter.options}
              value={filter.value as string}
              onChange={(value) => onFilterChange(filter.label, value)}
              placeholder={`Select ${filter.label}`}
            />
          )}
          {filter.type === 'checkbox' && (
            <div className={styles.checkboxGroup}>
              {filter.options.map((option) => (
                <label key={option.value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={(filter.value as string[]).includes(option.value)}
                    onChange={() => onFilterChange(filter.label, option.value)}
                    className={styles.checkbox}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={onClearFilters} className={styles.clearButton}>
        Clear Filters
      </button>
    </div>
  );
}
