/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { DontAuthenticatedContainer } from "./styles";

import padlock from "@/assets/icons/padlock.svg";
import Button from "../Button";
import { useRouter } from "next/router";

export default function DontAuthenticated() {
  const router = useRouter();

  return (
    <DontAuthenticatedContainer>
      <Image src={padlock} width={200} height={200} alt="empty-box" priority />

      <div>
        <p>Opss! parece que você não está autenticado</p>
        <p>
          Por favor, para ver suas informações você precisa fazer login ou se
          cadastrar!
        </p>
      </div>

      <Button onClick={() => router.push("/auth")}>Login</Button>
    </DontAuthenticatedContainer>
  );
}
