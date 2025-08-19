import './SearchItem.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from 'context/ThemeContext';

interface SearchItemProps {
  id: number;
  name: string;
  overview: string;
  image: string;
}

export function SearchItem({id, name, overview, image }: SearchItemProps) {
  const [searchParams] = useSearchParams();
  const { theme} = useTheme();


  const params = new URLSearchParams(searchParams);
  params.set('details', String(id));

  let status: string = '';
  if(overview.includes('Alive')) {
    status = 'alive'
  } else if (overview.includes('Dead')) {
    status = 'dead'
  } else {
    status = 'unknown'
  }

  return (
    <div className={`search-item ${theme === 'dark' ? 'dark' : 'light'}`}>
      <img src={image} alt="Character image" className='search-item-img'/>

      <Link to={`/?${params.toString()}`} className='search-item-name'>{name}</Link>
      <p className='search-item-overview'><span className={`status-icon ${status}`}></span>{overview}</p>
    </div>
  );
}
