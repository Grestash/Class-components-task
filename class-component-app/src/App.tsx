import './App.css';
import { SearchBar } from './components/searchBar/SearchBar';
import { SearchResults } from './components/searchResults/SearchResults';
import { Component } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/tv';

interface Item {
  id: number;
  name: string;
  overview: string;
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
    if (!searchQuery) return;
    this.setState({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${API_URL}?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const items: Item[] = data.results.map((item: Item) => ({
        id: item.id,
        name: item.name,
        overview: item.overview,
      }));

      this.setState({ items, isLoading: false });
    } catch (error) {
      console.error('Fetch error');
      this.setState({
        error: 'Something went wrong',
        isLoading: false,
      });
    }
  };

  render() {
    const { items, isLoading, error } = this.state;

    return (
      <>
        <SearchBar onSearch={this.handleSearch}></SearchBar>
        <SearchResults
          items={items}
          isLoading={isLoading}
          error={error}
        ></SearchResults>
      </>
    );
  }
}

export default App;
