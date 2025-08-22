import { useTheme } from 'context/ThemeContext';
import moonIcon from 'assets/icons/moon.png';
import sunIcon from 'assets/icons/sun.png'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className='flex items-center justify-center p-2'>
      <img src={theme ==='light'?  sunIcon : moonIcon} alt="ThemeIcon" className="theme-img" />
    </button>
  );
}
