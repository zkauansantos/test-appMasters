import { PaginationButton } from "./styles";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return <PaginationButton disabled>{number}</PaginationButton>;
  }

  return <PaginationButton onClick={() => onPageChange(number)}>{number}</PaginationButton>;
}
