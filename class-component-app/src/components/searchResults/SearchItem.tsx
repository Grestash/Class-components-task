import { Component } from 'react';
import './SearchItem.css';

interface SearchItemProps {
  name: string;
  overview: string;
}

export class SearchItem extends Component<SearchItemProps> {
  render() {
    return (
      <div className="search-item">
        <h3>{this.props.name}</h3>
        <p>{this.props.overview}</p>
      </div>
    );
  }
}
