import { Component } from 'react';
import { SearchItem } from './SearchItem';
import './SearchResults.css';


interface Item {
  id: number;
  name: string;
  overview: string;
}

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export class SearchResults extends Component<SearchResultsProps> {
  render() {

    if(this.props.isLoading) {
        return <div>Loading...</div>
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
