import PaginationItem from "./PaginationItem";
import generatePagesArray from "@/utils/generatePagesArray";
import { BoxItems, PaginationContainer } from "./styles";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const siblingsCount = 1;
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const startPositionOfPage =
    currentPage * registerPerPage - registerPerPage + 1;

  const endPositionOfPage =
    currentPage === lastPage
      ? totalCountOfRegisters
      : registerPerPage * currentPage - 1;

  return (
    <PaginationContainer>
      <div>
        <strong>{startPositionOfPage}</strong> -{" "}
        <strong>{endPositionOfPage}</strong> de{" "}
        <strong>{totalCountOfRegisters}</strong>
      </div>

      <BoxItems>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && <span>...</span>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <span>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </BoxItems>
    </PaginationContainer>
  );
}
