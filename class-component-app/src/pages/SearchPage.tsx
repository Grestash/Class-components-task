import './SearchPage.css';
import { SearchBar } from '../components/SearchPage/searchBar/SearchBar';
import { SearchResults } from '../components/SearchPage/searchResults/searchResults';
import { ErrorTest } from '../components/errorBoundary/ErrorTest';
import { useEffect, useState } from 'react';
import type { Item } from '../types.ts';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
export const API_URL = 'https://rickandmortyapi.com/api/character';
import { PaginationContext } from '../context/PaginationContext';
import Pagination from 'components/SearchPage/searchResults/Pagination/Pagination';

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
  totalPages: number;
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
    totalPages: 0,
  });

  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (searchQuery: string, page = 1) => {
    setAppState({ ...appState, isLoading: true, error: null });

    try {
      const url = searchQuery
        ? `${API_URL}/?name=${encodeURIComponent(searchQuery)}&page=${page}`
        : `${API_URL}/?page=${page}`;
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

      setAppState({
        ...appState,
        items: items,
        isLoading: false,
        totalPages: data.info.pages,
      });
      console.log(data.info.pages);
      setSearchQuery(searchQuery);
      setCurrentPage(page);
      console.log(page);
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
    handleSearch(searchQuery, currentPage);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const { items, isLoading, error } = appState;

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPage: appState.totalPages,
        setCurrentPage,
      }}
    >
      <ErrorBoundary>
        <header>
          <p className="header-title">Rick and Morty Character Search</p>
        </header>
        <main>
          <div className="search-bar-wrapper">
            <div className="container">
              <SearchBar
                value={searchQuery}
                onSearch={handleSearch}
              ></SearchBar>
            </div>
          </div>

          <div className="results-wrapper">
            <div className="container">
              <SearchResults
                items={items}
                isLoading={isLoading}
                error={error}
              ></SearchResults>
              <Pagination></Pagination>
              <ErrorTest></ErrorTest>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    </PaginationContext.Provider>
  );
}
