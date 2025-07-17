import { Component, type ChangeEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}
interface SearchBarState {
  searchQuery: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchQuery: '',
  };

  componentDidMount(): void {
    let savedQuery = localStorage.getItem('searchQuery');
    savedQuery = savedQuery === null ? '' : savedQuery;
    this.setState({ searchQuery: savedQuery });
    this.props.onSearch(savedQuery);
  }

  handleSearch = () => {
    const trimmed = this.state.searchQuery.trim();
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };
  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') this.handleSearch();
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleChange}
          className="search-bar-input"
          placeholder="Enter character name"
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleSearch} className="search-bar-button">
          <img
            src="/search-svgrepo-com.svg"
            alt="Search icon"
            className="button-icon"
            aria-label='Search'
          />
        </button>
      </div>
    );
  }
}
