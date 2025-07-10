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
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
      this.props.onSearch(savedQuery);
    }
  }

  handleSearch = () => {
    const trimmed = this.state.searchQuery.trim();
    if (trimmed === '') return;
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleChange}
          className="search-bar-input"
          placeholder='Enter search term'
        />
        <button onClick={this.handleSearch} className="search-bar-button"></button>
      </div>
    );
  }
}
