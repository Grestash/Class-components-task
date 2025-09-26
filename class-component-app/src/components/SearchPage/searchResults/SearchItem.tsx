import './SearchItem.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'context/ThemeContext';
import { AppDispatch, RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../../features/selection/selectionSlice';

interface SearchItemProps {
  id: number;
  name: string;
  overview: string;
  image: string;
}

export function SearchItem({ id, name, overview, image }: SearchItemProps) {
  const { theme } = useTheme();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set('details', String(id));


  let status: string = '';
  if (overview.includes('Alive')) {
    status = 'alive';
  } else if (overview.includes('Dead')) {
    status = 'dead';
  } else {
    status = 'unknown';
  }

  const selectedIds = useSelector((state: RootState) => state.selection);
  const isChecked = selectedIds.includes(id);

  const dispatch = useDispatch<AppDispatch>();
  const handleToggle = () => {
    dispatch(toggle(id));
  };

  return (
    <div className={`search-item ${theme === 'dark' ? 'dark' : 'light'}`} onClick={(e) => {
      const elem = e.target as HTMLElement
      if(!(elem.closest('a[href]'))) handleToggle()
    }}>
      <img src={image} alt="Character image" className="search-item-img" />

      <Link href={`/?${params.toString()}`} className="search-item-name">
        {name}
      </Link>
      <p className="search-item-overview">
        <span className={`status-icon ${status}`}></span>
        {overview}
      </p>
      <input
        type="checkbox"
        className="search-item-checkbox"
        checked={isChecked}
        readOnly
      />
    </div>
  );
}
