import './App.css';
import { SearchBar } from './components/searchBar/SearchBar';
import { SearchResults } from './components/searchResults/searchResults.tsx';
import { ErrorTest } from './components/errorBoundary/ErrorTest';
import { Component } from 'react';
import type { Item } from './types';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
export const API_URL = 'https://rickandmortyapi.com/api/character';

interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
}

interface AppState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    isLoading: false,
    error: null,
  };

  handleSearch = async (searchQuery: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const url = searchQuery
        ? `${API_URL}/?name=${encodeURIComponent(searchQuery)}&page=1`
        : `${API_URL}/?page=1`;
      const response = await fetch(url);
      console.log('fetch response:', response);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No characters found.');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log(data);

      const items: Item[] = data.results.map((item: ApiCharacter) => ({
        id: item.id,
        name: item.name,
        overview: `${item.status === 'unknown' ? 'Unknown' : item.status} - ${item.species}`,
      }));

      this.setState({ items, isLoading: false });
    } catch (error) {
      let message: string = '';
      if (error instanceof Error) console.log(error.message);

      console.log('Testovy')

      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          message = 'Network error. Please check your internet connection.';
        } else {
          message = error.message;
        }
        console.log(error.message);
      }

      this.setState({
        error: message,
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    document.title = 'Rick and Morty Character Search';
  }

  render() {
    const { items, isLoading, error } = this.state;

    return (
      <ErrorBoundary>
        <header>
          <p className="header-title">Rick and Morty Character Search</p>
        </header>
        <main>
          <div className="search-bar-wrapper">
            <div className="container">
              <SearchBar onSearch={this.handleSearch}></SearchBar>
            </div>
          </div>

          <div className="results-wrapper">
            <div className="container">
              <SearchResults
                items={items}
                isLoading={isLoading}
                error={error}
              ></SearchResults>
              <ErrorTest></ErrorTest>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
