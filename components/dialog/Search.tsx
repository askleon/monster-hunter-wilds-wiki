/**
 * A modal dialog as alternative to the search bar.
 *
 */

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";
import { search, SearchResult } from "@/lib/search";
import { ResultItem } from "@/components/search/ResultItem"

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
      dialogRef.current?.addEventListener('keydown', handleEscapeKey);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
      dialogRef.current?.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      dialogRef.current?.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = search(query);
    setSearchResults(results);
  };

  return (
    <dialog
      ref={dialogRef}
      className={`w-full max-w-2xl rounded-lg shadow-lg p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} z-50`}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      style={{
        position: 'fixed',
        margin: 'auto'
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-1xl font-bold">Search</h2>
          <a href="#" onClick={onClose}>Close</a>
        </div>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search... /help for commands"
          className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
          autoFocus
        />

        {/* Search Results */}
        <div className={`mt-2 max-h-80 overflow-y-auto ${searchResults.length > 0 ? 'border rounded p-2' : ''} ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
          {searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {searchResults.map((result, index) => (
                <ResultItem key={index} item={result} />
              ))}
            </ul>
          ) : searchQuery ? (
            <p className="text-center py-4 text-gray-500">No results found</p>
          ) : null}
        </div>
      </div>

      {/* Add global styling for dialog backdrop */}
      <style jsx global>{`
        dialog::backdrop {
          background-color: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
          backdrop-filter: blur(1px);
        }
      `}</style>
    </dialog>
  );
}

