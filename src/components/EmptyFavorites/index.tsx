/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { EmptyContainer } from "./styles";

import emptyBox from "@/assets/icons/empty-box.svg";
import Button from "../Button";
import { useRouter } from "next/router";

export default function EmptyFavorites() {
  const router = useRouter();

  return (
    <EmptyContainer>
      <Image src={emptyBox} width={200} height={200} alt="empty-box" priority />
      <p>
        Você ainda não tem nenhum game favorito cadastrado!
        Volte para a home e adicione alguns games na sua lista!
      </p>

      <Button onClick={() => router.push("/")}>Voltar</Button>
    </EmptyContainer>
  );
}
