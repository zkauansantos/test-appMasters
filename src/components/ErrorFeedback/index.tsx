import Image from "next/image";

import sad from "@/assets/icons/sad.svg";

import Button from "../Button";
import Loader from "../Loader";

import { ErrorContainer } from "./styles";
interface ErrorFeedbackProps {
  error: {
    message: string;
    code?: string;
  };
  onRetry: () => void;
  isRefetching: boolean;
}

export default function ErrorFeedback({
  error,
  onRetry,
  isRefetching,
}: ErrorFeedbackProps) {
  if (!error) {
    return null;
  }

  const isServerError = error.code === "serverError";

  return (
    <ErrorContainer>
      <Image src={sad} width={250} height={250} alt="sad" priority />

      <p>{error.message}</p>

      {isServerError && <Button onClick={onRetry}>Tentar novamente</Button>}
      {isRefetching && <Loader size="4rem" />}
    </ErrorContainer>
  );
}
