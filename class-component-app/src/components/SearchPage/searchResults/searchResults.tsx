import { SearchItem } from './SearchItem';
import './SearchResults.css';
import type { Item } from 'types';
import Loader from 'components/Loader/Loader';

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export function SearchResults({ items, isLoading, error }: SearchResultsProps) {
  if (isLoading) {
     return <Loader />;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
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
