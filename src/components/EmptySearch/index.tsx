/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { EmptyContainer } from "./styles";

import magnifierQuestion from '@/assets/icons/magnifier-question.svg'

interface EmptySearchProps {
  searchTerm: string;
}

export default function EmptySearch({searchTerm}: EmptySearchProps) {
  return (
    <EmptyContainer>
      <Image src={magnifierQuestion} width={100} height={100} alt="magnifier-question"/>
      <p>Nenhum resultado de jogo foi encontrado para <span>"{searchTerm}"</span></p>
    </EmptyContainer>
  )
}
