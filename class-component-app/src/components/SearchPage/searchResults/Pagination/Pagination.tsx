'use client'
import { usePagination } from 'context/PaginationContext';
import './Pagination.css';

interface PaginationProps {
  isLoading: boolean;
  error: string | null;
}

export default function Pagination({ isLoading, error }: PaginationProps) {
  if (isLoading || error) {
    return null;
  }

  const { currentPage, totalPage, setCurrentPage } = usePagination();
  if (totalPage <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-left">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          <img src="/icons/paginationFirst.svg" alt="First icon" className="first-icon" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <img
            src="/icons/paginationArrow.svg"
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
          <img src="/icons/paginationArrow.svg" alt="Next icon" className="next-icon" />
        </button>
      </div>
    </div>
  );
}
