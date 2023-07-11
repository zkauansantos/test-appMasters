import useAnimatedUnmount from "@/hooks/useAnimatedUnmount";
import Button from "../Button";
import { ModalContent, Overlay } from "./styles";
import { useRouter } from "next/router";

interface ModalProps {
  isVisible: boolean;
  onToggleVisible: (visible: boolean) => void;
}

export default function Modal({ isVisible, onToggleVisible }: ModalProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isVisible);
  const router = useRouter();

  if (!shouldRender) {
    return null;
  }

  return (
    <Overlay isLeaving={!isVisible} ref={animatedElementRef}>
      <ModalContent isLeaving={!isVisible}>
        <header>
          <strong>Opss! Parece que você não está autenticado.</strong>
        </header>

        <div>
          <p>
            Que tal se cadastrar ou fazer login pra adicionar uns games na lista
            de favoritos ?
          </p>
        </div>

        <footer>
          <Button background="#333" onClick={() => onToggleVisible(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onToggleVisible(false);
              router.push("/auth");
            }}
          >
            Login
          </Button>
        </footer>
      </ModalContent>
    </Overlay>
  );
}
