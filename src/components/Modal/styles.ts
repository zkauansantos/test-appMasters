import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0;}
  to {opacity: 1;}
`;

const fadeOut = keyframes`
  from { opacity: 1;}
  to {opacity: 0;}
`;

const scaleIn = keyframes`
  from {transform: scale(0);}
  to{transform: scale(1);}
`;

const scaleOut = keyframes`
  from {transform: scale(1);}
  to{transform: scale(0);}
`;

export const Overlay = styled.div<{ isLeaving: boolean }>`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease forwards;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.5s ease forwards;
    `}
`;

export const ModalContent = styled.div<{ isLeaving: boolean }>`
  border-radius: 4px;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  animation: ${scaleIn} 0.5s ease;
  color: ${({ theme }) => theme.colors.neutral["50"]};

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${scaleOut} 0.5s ease forwards;
    `}

  header {
    strong {
      font-size: 2.2rem;
    }
  }

  div {
    p {
      font-size: 1.8rem;
    }
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 2.4rem;

    button {
      font-size: 1.6rem;
    }
  }
`;
