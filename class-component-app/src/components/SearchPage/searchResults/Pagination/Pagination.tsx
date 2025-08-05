import { usePagination } from 'context/PaginationContext';
import paginationArrow from 'assets/icons/paginationArrow.svg';
import paginationFirst from 'assets/icons/paginationFirst.svg';
import './Pagination.css';

export default function Pagination() {
  const { currentPage, totalPage, setCurrentPage } = usePagination();
  if (totalPage <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-left">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          <img src={paginationFirst} alt="First icon" className="first-icon" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <img
            src={paginationArrow}
            alt="Previous icon"
            className="prev-icon"
          />
          <span className="pagination-button-label">Previous</span>
        </button>
      </div>

      <div className="pagination-center">
        <span className='pagination-label'>
          {currentPage} of {totalPage}
        </span>
      </div>

      <div className="pagination-right">
        <button
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <span className="pagination-button-label">Next</span>
          <img src={paginationArrow} alt="Next icon" className="next-icon" />
        </button>
      </div>
    </div>
  );
}
