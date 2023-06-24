import Link from "next/link";

import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onRetry?: () => void;
  linkTo?: string;
  openBlank?: boolean
}

export default function Button({ children, onRetry, linkTo, openBlank}: ButtonProps) {
  if (linkTo) {
    return (
      <Link href={linkTo} passHref target={openBlank ? '_blank' : '_parent'}>
        <ButtonStyled>{children}</ButtonStyled>
      </Link>
    );
  }

  return <ButtonStyled onClick={onRetry}>{children}</ButtonStyled>;
}
