import { useState, type ChangeEvent, useEffect } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from 'assets/icons/search-svgrepo-com.svg'
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
        className={styles.searchBarInput}
        placeholder="Enter character name"
        onKeyDown={handleKeyDown}
        style={{
          border: theme === 'light' ? '2px solid black' : '',
        }}
      />
      <button onClick={handleSearch} className={styles.searchBarButton}>
        <img
          src={searchIcon}
          alt="Search icon"
          className={styles.buttonIcon}
          aria-label="Search"
        />
      </button>
    </div>
  );
}
