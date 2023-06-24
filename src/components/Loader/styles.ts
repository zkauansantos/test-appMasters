import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 2;
`;

const scaleUp = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  60%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const pulse = keyframes`
  0%, 60%, 100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
`;

export const LoaderStyled = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 0.5rem solid #fff;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: ${pulse} 1s linear infinite;

  &::after {
    content: "";
    position: absolute;
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${scaleUp} 1s linear infinite;
  }
`;
