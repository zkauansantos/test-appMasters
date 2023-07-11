import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translateX(10rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Heart = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  transition: 0.2s ease;
  animation: ${fadeIn} 1.4s ease;

  :hover {
    transform: scale(1.3);
  }
`;
