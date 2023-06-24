import Link from "next/link";

import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onRetry?: () => void;
  linkTo?: string;
}

export default function Button({ children, onRetry, linkTo }: ButtonProps) {
  if (linkTo) {
    return (
      <Link href={linkTo} passHref target="_blank">
        <ButtonStyled>{children}</ButtonStyled>
      </Link>
    );
  }

  return <ButtonStyled onClick={onRetry}>{children}</ButtonStyled>;
}
