import './SearchItem.css';

interface SearchItemProps {
  name: string;
  overview: string;
}

export function SearchItem({ name, overview }: SearchItemProps) {
  return (
    <div className="search-item">
      <h3>{name}</h3>
      <p>{overview}</p>
    </div>
  );
}
