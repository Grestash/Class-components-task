import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useAppDispatch } from 'app/hooks';
import { clear } from 'features/selection/selectionSlice';


export default function SelectionInfo() {
  const selectedIds = useSelector((state: RootState) => state.selection);
  const selectedItemsCount = selectedIds.length;
  const dispatch = useAppDispatch()
  const handleClear = () => {
    dispatch(clear())
  }

  return (
    <div className=''>
      <p>{selectedItemsCount} characters are selected</p>
      <button onClick={handleClear}>Unselect all</button>
      <button>Download</button>
    </div>
  );
}
