'use client'

import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchableDropdown.module.css';

export interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string; // Add this line
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  className = ''
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          className={styles.dropdownToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={styles.dropdownToggleText}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={styles.dropdownToggleIcon}>▼</span>
        </button>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              placeholder="Search..."
              autoFocus
            />
            <ul role="listbox">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
