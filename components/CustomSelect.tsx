import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = '' }) => {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      // pre-highlight the currently selected option
      const idx = options.findIndex(o => o.value === value);
      setHighlightIndex(idx >= 0 ? idx : 0);
    } else {
      setHighlightIndex(-1);
    }
  }, [open, options, value]);

  const toggleOpen = () => setOpen(o => !o);

  const handleOptionSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && highlightIndex >= 0) {
        handleOptionSelect(options[highlightIndex].value);
      } else {
        setOpen(true);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex(i => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex(i => Math.max(0, i - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="custom-select-container w-full relative"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={toggleOpen}
    >
      <div className="custom-select-display flex items-center justify-between px-3 py-2 border rounded-lg bg-white text-gray-900 cursor-pointer">
        <span className={`${selectedOption ? '' : 'text-gray-400'}`}>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`w-4 h-4 text-orange-600 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <ul
          className="custom-select-options absolute z-20 mt-1 w-full bg-white border border-orange-300 shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              className={`px-3 py-2 cursor-pointer text-sm ${
                idx === highlightIndex ? 'bg-orange-100' : ''
              } ${opt.value === value ? 'font-semibold' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onMouseEnter={() => setHighlightIndex(idx)}
              onClick={e => {
                e.stopPropagation();
                handleOptionSelect(opt.value);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;