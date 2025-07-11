import { Component } from 'react';
import { SearchItem } from './SearchItem';
import './SearchResults.css';
import type { Item } from '../../types';

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export class SearchResults extends Component<SearchResultsProps> {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }

      return (
        <div className="result-list">
          {this.props.items.map((item) => (
            <SearchItem
              key={item.id}
              name={item.name}
              overview={item.overview}
            ></SearchItem>
          ))}
        </div>
      );
    }
  }

