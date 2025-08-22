import { createContext, useContext } from 'react';

interface PaginationContextType {
    currentPage: number;
    totalPage: number;
    setCurrentPage: (page: number) => void;
}

export const PaginationContext = createContext<PaginationContextType | null>(null)

export const usePagination = () => {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error();
      }
    return context
}