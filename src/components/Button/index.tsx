import Link from "next/link";

import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  linkTo?: string;
  openBlank?: boolean;
  type?: "button" | "submit" | "reset";
  background?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  onClick,
  linkTo,
  openBlank,
  type,
  background,
  disabled,
}: ButtonProps) {
  if (linkTo) {
    return (
      <Link href={linkTo} passHref target={openBlank ? "_blank" : "_parent"}>
        <ButtonStyled background={background}>{children}</ButtonStyled>
      </Link>
    );
  }

  return (
    <ButtonStyled
      disabled={!!disabled}
      background={background}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {children}
    </ButtonStyled>
  );
}
