/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import magnifierQuestion from "@/assets/icons/magnifier-question.svg";

import { EmptyContainer } from "./styles";

interface EmptySearchProps {
  searchTerm: string;
}

export default function EmptySearch({ searchTerm }: EmptySearchProps) {
  return (
    <EmptyContainer>
      <Image
        src={magnifierQuestion}
        width={100}
        height={100}
        alt="magnifier-question"
        priority
      />
      <p>
        Nenhum resultado de jogo foi encontrado para <span>"{searchTerm}"</span>
      </p>
    </EmptyContainer>
  );
}
