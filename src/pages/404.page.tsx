import Button from "@/components/Button"
import { styled } from "styled-components"

const ContainerNotFound = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;

  h1 {
    color: ${({ theme }) => theme.colors.indigo["600"]};
    font-size: clamp(2.6rem, 3.4vw, 4rem);
    text-align: center;
  }
`

export default function NotFoundPage() {
  return (
    <ContainerNotFound>
      <h1>Desculpe essa rota não existe.</h1>

      <Button linkTo="/">
        Voltar pra lista de jogos
      </Button>
    </ContainerNotFound>
  )
}
