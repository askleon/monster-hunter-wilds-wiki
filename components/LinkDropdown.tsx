import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface DropdownItem {
  href: string;
  label: string;
  icon?: IconType;
}

interface LinkDropdownProps {
  label: string;
  icon: IconType;
  items: DropdownItem[];
  iconClass?: string;
}

export function LinkDropdown({ label, icon: Icon, items, iconClass }: LinkDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-colors duration-200 inline-flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className={`inline-block mr-1 ${iconClass}`} />}
        {label}
        <FaChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
