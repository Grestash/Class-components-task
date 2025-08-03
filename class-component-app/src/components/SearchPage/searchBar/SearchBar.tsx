import { useState, type ChangeEvent, useEffect, useRef } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onSearch: (searchQuery: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [searchBarState, setSearchBarState] = useState(value);

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setSearchBarState(value);
      prevValueRef.current = value;
    }
  }, [value]);

  const handleSearch = () => {
    const trimmed = searchBarState.trim();
    onSearch(trimmed);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarState(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchBarState}
        onChange={handleChange}
        className="search-bar-input"
        placeholder="Enter character name"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className="search-bar-button">
        <img
          src="/Class-components-task//search-svgrepo-com.svg"
          alt="Search icon"
          className="button-icon"
          aria-label="Search"
        />
      </button>
    </div>
  );
}
