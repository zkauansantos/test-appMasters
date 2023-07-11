import Link from "next/link";

import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  linkTo?: string;
  openBlank?: boolean;
  type?: "button" | "submit" | "reset";
  background?: string;
}

export default function Button({
  children,
  onClick,
  linkTo,
  openBlank,
  type,
  background,
}: ButtonProps) {
  if (linkTo) {
    return (
      <Link href={linkTo} passHref target={openBlank ? "_blank" : "_parent"}>
        <ButtonStyled background={background}>{children}</ButtonStyled>
      </Link>
    );
  }

  return (
    <ButtonStyled background={background} onClick={onClick} type={type ? type : "button"}>
      {children}
    </ButtonStyled>
  );
}
