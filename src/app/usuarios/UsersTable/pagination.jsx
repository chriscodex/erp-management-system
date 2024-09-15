'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function CustomPagination({
  totalItems,
  currentPage,
  onPageChange,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
}) {
  const totalPages = Math.ceil(totalItems / 10);

  const handleFirstPage = () => {
    onPageChange(1);
    firstPage();
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
    lastPage();
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
    nextPage();
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
    previousPage();
  };

  return (
    <div className="flex items-center justify-between px-2 mt-2">
      <div className="text-sm text-muted-foreground">
        {totalItems} resultado(s)
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {totalPages === 0 ? 1 : totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Ir a la primera página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <span className="sr-only">Ir a la página siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={handleLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <span className="sr-only">Ir a la última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
