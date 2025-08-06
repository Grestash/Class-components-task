import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchPage />}/>
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
