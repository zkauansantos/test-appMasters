import React from "react";
import { LoaderStyled, Overlay } from "./styles";

interface LoaderProps {
  size: string;
}

export default function Loader({ size }: LoaderProps) {
  return (
    <Overlay>
      <LoaderStyled size={size} />
    </Overlay>
  );
}
