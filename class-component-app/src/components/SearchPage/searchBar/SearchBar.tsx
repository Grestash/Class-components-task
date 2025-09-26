'use client'
import { useState, type ChangeEvent, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { useTheme } from 'context/ThemeContext';

interface SearchBarProps {
  value: string;
  onSearch: (searchQuery: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [searchBarState, setSearchBarState] = useState(value);
  const {theme} = useTheme()

  useEffect(() => {
    setSearchBarState(value);
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
    <div className={styles.searchBar} >
      <input
        type="text"
        value={searchBarState}
        onChange={handleChange}
        className={`${styles.searchBarInput} ${theme === 'dark' ? styles.dark : styles.light}`}
        placeholder="Enter character name"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className={styles.searchBarButton} style={{
          backgroundColor: theme === 'dark' ? '#24292e' : '',
        }}>
        <img
          src={theme === 'light' ? "/icons/search-svgrepo-com.svg" : "/icons/search-icon-white.svg"}
          alt="Search icon"
          className={styles.buttonIcon}
          aria-label="Search"
        />
      </button>
    </div>
  );
}
