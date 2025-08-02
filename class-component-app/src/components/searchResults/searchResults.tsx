import { SearchItem } from './SearchItem';
import './SearchResults.css';
import type { Item } from '../../types';

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export function SearchResults({items, isLoading, error}: SearchResultsProps) {

  if (isLoading) {
          return (
            <div className="loader-container">
              <div className="spinner"></div>
              <p style={{ color: 'white' }}>Loading...</p>
            </div>
          );
        }

  if (error) {
          return <div className="error-text">{error}</div>;
        }

  return (
          <div className="result-list">
            {items.map((item) => (
              <SearchItem
                key={item.id}
                name={item.name}
                overview={item.overview}
              />
            ))}
          </div>
        );
}
