import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translateX(-10rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  animation: ${fadeIn} 1.4s ease;

  button {
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s ease;

    :hover {
      transform: scale(1.5);
    }
  }
`;
