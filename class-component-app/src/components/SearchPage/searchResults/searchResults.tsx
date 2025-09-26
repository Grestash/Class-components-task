'use client'
import { SearchItem } from './SearchItem';
import './SearchResults.css';
import type { Item } from 'types';
import Loader from 'components/Loader/Loader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
  error: FetchBaseQueryError | null;
}

 export function getErrorMessage(error: FetchBaseQueryError | null): string {
  if(!error) return ''
  if (error.status === 'FETCH_ERROR') {
    return 'No internet connection.';
  }
  if (typeof error.data === 'object' && error.data !== null) {
    if ('error' in error.data) {
      return (error.data as { error?: string }).error || 'Server error';
    }
  }
  return 'An unexpected error occurred.';
}

export function SearchResults({ items, isLoading, error }: SearchResultsProps) {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-text">{getErrorMessage(error)}</div>;
  }
  return (
    <div className="result-list">
      {items.map((item) => (
        <SearchItem
          id={item.id}
          name={item.name}
          overview={item.overview}
          image={item.image}
        />
      ))}
    </div>
  );
}
