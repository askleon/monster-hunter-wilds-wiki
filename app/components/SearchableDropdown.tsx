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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      e.preventDefault();
      const selectedOption = filteredOptions[highlightedIndex];
      onChange(selectedOption.value);
      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

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
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
              placeholder="Search..."
              autoFocus
            />
            <ul role="listbox" ref={listRef}>
              {filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`${styles.dropdownItem} ${index === highlightedIndex ? styles.highlighted : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                    setHighlightedIndex(-1);
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
