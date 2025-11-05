'use client';

import styles from '../../pages/SearchPage.module.css';
import { SearchBar } from '../../components/SearchPage/searchBar/SearchBar';
import { SearchResults } from '../../components/SearchPage/searchResults/searchResults';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetCharactersQuery } from '../../services/api';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import { PaginationContext } from '../../context/PaginationContext';
import Pagination from 'components/SearchPage/searchResults/Pagination/Pagination';
import CharacterDetails from 'components/SearchPage/CharacterDetails/CharacterDetails';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import SelectionInfo from 'components/SearchPage/SelectionInfo/SelectionInfo';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../components/SearchPage/searchResults/searchResults';
import { useTranslations } from 'next-intl';

function useLocalStorageState(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const detailsId = searchParams.get('details');
  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const t = useTranslations('Header');

  const { data, error, isFetching } = useGetCharactersQuery(
    { name: searchQuery, page: currentPage },
    { refetchOnMountOrArgChange: true }
  );

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) params.set('query', searchQuery);
    params.set('page', String(currentPage));
    if (detailsId) params.set('details', detailsId);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  }, [searchQuery, currentPage, detailsId, searchParams]);

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
        <p className={styles.headerTitle}>{t('title')}</p>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            value={searchQuery}
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
          ></SearchBar>
        </div>

        <main>
          <div
            className={`${styles.splitContainer} ${detailsId ? styles.withDetails : styles.noDetails}`}
          >
            <div className={styles.leftColumn}>
              <div className={styles.resultsWrapper}>
                <div className={styles.container}>
                  <div
                    className={`results-container ${detailsId ? 'withDetails' : ''}`}
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
            <div
              className={`${styles.rightColumn} ${detailsId ? '' : styles.noDetails}`}
            >
              {detailsId ? <CharacterDetails characterId={detailsId} /> : null}
            </div>
          </div>
          <Footer pageType="search" />
        </main>
      </ErrorBoundary>
    </PaginationContext.Provider>
  );
}
