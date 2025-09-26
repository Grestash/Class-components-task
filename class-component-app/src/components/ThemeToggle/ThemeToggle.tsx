import { useTheme } from 'context/ThemeContext';
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className='flex items-center justify-center p-2'>
      <img src={theme ==='light'?  "/icons/sun.png" : "/icons/moon.png"} alt="ThemeIcon" className="theme-img" />
    </button>
  );
}
