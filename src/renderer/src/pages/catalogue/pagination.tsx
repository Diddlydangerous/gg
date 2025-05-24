import { useState } from "react"; // <-- Add this
import { Button } from "@renderer/components/button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";
import { useFormat } from "@renderer/hooks/use-format";
import "./pagination.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { formatNumber } = useFormat();
  const [jumpPage, setJumpPage] = useState(""); // <-- Add this

  if (totalPages <= 1) return null;

  const visiblePages = 3;

  let startPage = Math.max(1, page - 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="pagination">
      <Button
        theme="outline"
        onClick={() => onPageChange(page - 1)}
        className="pagination__button"
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </Button>

      {page > 2 && (
        <>
          <Button
            theme="outline"
            onClick={() => onPageChange(1)}
            className="pagination__button"
            disabled={page === 1}
          >
            {1}
          </Button>

          <div className="pagination__ellipsis">
            <span className="pagination__ellipsis-text">...</span>
          </div>
        </>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((pageNumber) => (
        <Button
          theme={page === pageNumber ? "primary" : "outline"}
          key={pageNumber}
          className="pagination__button"
          onClick={() => onPageChange(pageNumber)}
        >
          {formatNumber(pageNumber)}
        </Button>
      ))}

      {page < totalPages - 1 && (
        <>
          <div className="pagination__ellipsis">
            <span className="pagination__ellipsis-text">...</span>
          </div>

          <Button
            theme="outline"
            onClick={() => onPageChange(totalPages)}
            className="pagination__button"
            disabled={page === totalPages}
          >
            {formatNumber(totalPages)}
          </Button>
        </>
      )}

      <Button
        theme="outline"
        onClick={() => onPageChange(page + 1)}
        className="pagination__button"
        disabled={page === totalPages}
      >
        <ChevronRightIcon />
      </Button>

      {/* 👇 ADD THIS: Jump to Page Input */}
      <div className="pagination__jump">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="Jump to..."
          className="pagination__jump-input"
        />
        <Button
          theme="outline"
          className="pagination__button"
          onClick={() => {
            const parsed = parseInt(jumpPage, 10);
            if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
              onPageChange(parsed);
              setJumpPage(""); // optional: reset input
            }
          }}
        >
          Go
        </Button>
      </div>
    </div>
  );
}
