import './Header.css';
import { NavLink } from 'react-router-dom';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { useTheme } from 'context/ThemeContext';

export default function Header() {
  const {theme} = useTheme()
    return (
    <header>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''} ${theme}`
          }
          style={{
            color: theme === 'light' ? '#222' : 'white',
          }}

        >
          Character Search
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''} ${theme}`
          }
          style={{
            color: theme === 'light' ? '#222' : 'white',
          }}
        >
          About the App
        </NavLink>
      </nav>
      <ThemeToggle></ThemeToggle>
    </header>
  );
}
