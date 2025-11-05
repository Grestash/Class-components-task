import { useEffect } from 'react';
import { usePagination } from 'context/PaginationContext';
import './Pagination.css';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  isLoading: boolean;
  error: string | null;
}

export default function Pagination({ isLoading, error }: PaginationProps) {
  const t = useTranslations('Pagination');
  const { currentPage, totalPage, setCurrentPage } = usePagination();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (isLoading || error) return null;
  if (totalPage <= 1) return null;


  const clickButton = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="pagination">
      <div className="pagination-left">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => clickButton(1)}
        >
          <img
            src="/icons/paginationFirst.svg"
            alt="First icon"
            className="first-icon"
          />
        </button>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => clickButton(currentPage - 1)}
        >
          <img
            src="/icons/paginationArrow.svg"
            alt="Previous icon"
            className="prev-icon"
          />
          <span className="pagination-button-label">{t('prev')}</span>
        </button>
      </div>

      <div className="pagination-center">
        <span className="pagination-label">
          {currentPage} of {totalPage}
        </span>
      </div>

      <div className="pagination-right">
        <button
          type="button"
          disabled={currentPage === totalPage}
          onClick={() => clickButton(currentPage + 1)}
        >
          <span className="pagination-button-label">{t('next')}</span>
          <img
            src="/icons/paginationArrow.svg"
            alt="Next icon"
            className="next-icon"
          />
        </button>
      </div>
    </div>
  );
}
