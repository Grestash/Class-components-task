'use client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useAppDispatch } from 'store/hooks';
import { clear } from 'features/selection/selectionSlice';
import './SelectionInfo.css';

export default function SelectionInfo() {
  const selectedIds = useSelector((state: RootState) => state.selection);
  const selectedItemsCount = selectedIds.length;
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clear());
  };

  const handleDownload = async () => {
    if (selectedIds.length === 0) return;

    try {
      const response = await fetch('/api/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) throw new Error('Failed to generate CSV');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedIds.length}_characters.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return selectedItemsCount ? (
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
  ) : null;
}
