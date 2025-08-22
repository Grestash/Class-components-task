import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useAppDispatch } from 'app/hooks';
import { clear } from 'features/selection/selectionSlice';
import './SelectionInfo.css';

export default function SelectionInfo() {
  const selectedIds = useSelector((state: RootState) => state.selection);
  const selectedItemsCount = selectedIds.length;

  const dispatch = useAppDispatch();
  const handleClear = () => {
    dispatch(clear());
  };

  const fetchCharacterDetails = async (id: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch details for character ${id}`);
    return response.json();
  };

  const handleDownload = async () => {
    if (selectedIds.length === 0) return;
    try {
      const detailsArray = await Promise.all(
        selectedIds.map((id) => fetchCharacterDetails(id))
      );

      const header = [
        'Name',
        'Status',
        'Species',
        'Gender',
        'Origin',
        'Location',
        'Image',
      ];
      const rows = detailsArray.map((item) => [
        item.name,
        item.status,
        item.species,
        item.gender,
        item.origin?.name,
        item.location?.name,
        item.image,
      ]);

      const csvString = [header, ...rows]
        .map((row) =>
          row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(',')
        )
        .join('\n');

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `${selectedIds.length}_characters.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download character details:', error);
    }
  };

  if (selectedItemsCount) {
    return (
      <div className="selection-info">
        <p className="selection-info-text">
          <span className="count">{selectedItemsCount}</span> characters are
          selected
        </p>
        <div className="selection-info-btns-wrapper">
          {' '}
          <button onClick={handleClear} className="selection-info-btn clear">
            Unselect all
          </button>
          <button
            className="selection-info-btn download"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    );
  }
}
