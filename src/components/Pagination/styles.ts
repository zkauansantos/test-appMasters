import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div:first-child {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    color: #fff;
  }
`;

export const BoxItems = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
  max-width: 23rem;

  span {
    font-size: 1.8rem;
    color: #fff;
  }
`;
