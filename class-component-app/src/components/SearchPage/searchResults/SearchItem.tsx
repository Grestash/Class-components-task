import './SearchItem.css';
import { Link, useSearchParams } from 'react-router-dom';

interface SearchItemProps {
  id: string;
  name: string;
  overview: string;
}

export function SearchItem({id, name, overview }: SearchItemProps) {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  params.set('details', String(id));

  return (
    <div className="search-item">
      <Link to={`/?${params.toString()}`}>{name}</Link>
      <p className='search-item-overview'>{overview}</p>
    </div>
  );
}
