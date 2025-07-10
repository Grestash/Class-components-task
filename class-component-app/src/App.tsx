import './App.css';
import { SearchBar } from './components/searchBar/SearchBar';

function App() {

  function handleSearch (searchQuery: string) {
    console.log("Searching for: ", searchQuery)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch}></SearchBar>
    </>
  );
}

export default App;
