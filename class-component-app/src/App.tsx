import './App.css';
import { SearchBar } from './components/searchBar/SearchBar';
import { SearchResults } from './components/searchResults/SearchResults';
import { Component } from 'react';
import type { Item } from './types';
const API_URL = 'https://rickandmortyapi.com/api/character';

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

export class App extends Component<{}, AppState> {
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
        overview: `${item.status} - ${item.species}`,
      }));

      this.setState({ items, isLoading: false });
    } catch (error) {
      let message: string = '';
      if (error instanceof Error) console.log(error.message)

      if (error instanceof Error) {
        error.message === 'Failed to fetch'
          ? (message = 'Network error. Please check your internet connection.')
          : (message = error.message);
        console.log(error.message);
      }

      this.setState({
        error: message,
        isLoading: false,
      });
    }
  };

  render() {
    const { items, isLoading, error } = this.state;

    return (
      <main className="container">
        <SearchBar onSearch={this.handleSearch}></SearchBar>
        <SearchResults
          items={items}
          isLoading={isLoading}
          error={error}
        ></SearchResults>
      </main>
    );
  }
}

export default App;
