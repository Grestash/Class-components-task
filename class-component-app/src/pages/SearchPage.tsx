import styles from './SearchPage.module.css';
import { SearchBar } from '../components/SearchPage/searchBar/SearchBar';
import { SearchResults } from '../components/SearchPage/searchResults/searchResults';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../services/api';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { PaginationContext } from '../context/PaginationContext';
import Pagination from 'components/SearchPage/searchResults/Pagination/Pagination';
import CharacterDetails from 'components/SearchPage/CharacterDetails/CharacterDetails';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { useTheme } from 'context/ThemeContext';
import SelectionInfo from 'components/SearchPage/SelectionInfo/SelectionInfo';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../components/SearchPage/searchResults/searchResults';
import { createPortal } from 'react-dom';

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

function useIsModalViewport() {
  const [isModalViewport, setIsModalViewport] = useState(
    window.innerWidth <= 900
  );

  useEffect(() => {
    const handleResize = () => {
      setIsModalViewport(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isModalViewport;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const { theme } = useTheme();
  const isModalViewport = useIsModalViewport();

  const { data, error, isFetching } = useGetCharactersQuery(
    { name: searchQuery, page: currentPage },
    { refetchOnMountOrArgChange: true }
  );

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    params.set('page', String(currentPage));
    if (detailsId) params.set('details', detailsId);
    setSearchParams(params);
  }, [searchQuery, currentPage, detailsId, setSearchParams]);

  useEffect(() => {
    const element = document.querySelector(`.${styles.headerTitle}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPage: totalPages,
        setCurrentPage,
      }}
    >
      <ErrorBoundary>
        <Header />
        <p
          className={styles.headerTitle}
          style={{
            color: theme === 'light' ? 'rgb(32, 35, 41)' : 'white',
          }}
        >
          Rick and Morty Character Search
        </p>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            value={searchQuery}
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
          ></SearchBar>
        </div>

        <main
          className={`${styles.splitContainer} ${
            detailsId && !isModalViewport
              ? styles.withDetails
              : styles.noDetails
          }`}
          style={{
            backgroundColor: theme === 'dark' ? '#1a1d21' : '',
          }}
        >
          <div className={styles.leftColumn}>
            <div className={styles.resultsWrapper}>
              <div className={styles.container}>
                <div
                  className={`results-container ${
                    detailsId && !isModalViewport ? 'withDetails' : ''
                  }`}
                >
                  <SearchResults
                    items={items}
                    isLoading={isFetching}
                    error={error as FetchBaseQueryError | null}
                  ></SearchResults>
                </div>
                <SelectionInfo />
                <Pagination
                  isLoading={isFetching}
                  error={getErrorMessage(error as FetchBaseQueryError | null)}
                ></Pagination>
              </div>
            </div>
          </div>
          {!isModalViewport && (
            <div
              className={`${styles.rightColumn} ${detailsId ? '' : styles.noDetails}`}
            >
              {detailsId ? <CharacterDetails characterId={detailsId} /> : null}
            </div>
          )}
          <Footer />
        </main>

        {detailsId &&
          isModalViewport &&
          createPortal(
            <div
              className={styles.modalOverlay}
              aria-modal="true"
              role="dialog"
            >
              <div className={styles.modalContent}>
                <CharacterDetails characterId={detailsId} />
              </div>
            </div>,
            document.body
          )}
      </ErrorBoundary>
    </PaginationContext.Provider>
  );
}
