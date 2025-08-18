import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import { Routes, Route } from 'react-router-dom';
import NoMatchPage from './pages/NoMatchPage';
import { ThemeProvider } from 'context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </ThemeProvider>
  );
}
