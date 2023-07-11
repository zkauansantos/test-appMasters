import Link from "next/link";

import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onRetry?: () => void;
  linkTo?: string;
  openBlank?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onRetry,
  linkTo,
  openBlank,
  type,
}: ButtonProps) {
  if (linkTo) {
    return (
      <Link href={linkTo} passHref target={openBlank ? "_blank" : "_parent"}>
        <ButtonStyled>{children}</ButtonStyled>
      </Link>
    );
  }

  return (
    <ButtonStyled onClick={onRetry} type={type ? type : "button"}>
      {children}
    </ButtonStyled>
  );
}
