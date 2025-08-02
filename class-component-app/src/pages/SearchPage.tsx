import '../Main.css';
import { SearchBar } from '../components/searchBar/SearchBar.tsx';
import { SearchResults } from '../components/searchResults/searchResults.tsx';
import { ErrorTest } from '../components/errorBoundary/ErrorTest.tsx';
import { useEffect, useState } from 'react';
import type { Item } from '../types.ts';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.tsx';
export const API_URL = 'https://rickandmortyapi.com/api/character';

interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
}

interface AppState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

function useLocalStorageState(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default function SearchPage() {
  const [appState, setAppState] = useState<AppState>({
    items: [],
    isLoading: false,
    error: null,
  });

  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');

  const handleSearch = async (searchQuery: string) => {
    setAppState({ ...appState, isLoading: true, error: null });

    try {
      const url = searchQuery
        ? `${API_URL}/?name=${encodeURIComponent(searchQuery)}&page=1`
        : `${API_URL}/?page=1`;
      const response = await fetch(url);
      console.log('fetch response:', response);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No characters found.');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log(data);

      const items: Item[] = data.results.map(
        (item: ApiCharacter): Item => ({
          id: item.id,
          name: item.name,
          overview: `${item.status === 'unknown' ? 'Unknown' : item.status} - ${item.species}`,
        })
      );

      setAppState({ ...appState, items: items, isLoading: false });
      setSearchQuery(searchQuery);
    } catch (error) {
      let message: string = '';
      if (error instanceof Error) console.log(error.message);

      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          message = 'Network error. Please check your internet connection.';
        } else {
          message = error.message;
        }
        console.log(error.message);
      }

      setAppState({
        ...appState,
        error: message,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const { items, isLoading, error } = appState;

  return (
    <ErrorBoundary>
      <header>
        <p className="header-title">Rick and Morty Character Search</p>
      </header>
      <main>
        <div className="search-bar-wrapper">
          <div className="container">
            <SearchBar value={searchQuery} onSearch={handleSearch}></SearchBar>
          </div>
        </div>

        <div className="results-wrapper">
          <div className="container">
            <SearchResults
              items={items}
              isLoading={isLoading}
              error={error}
            ></SearchResults>
            <ErrorTest></ErrorTest>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}

