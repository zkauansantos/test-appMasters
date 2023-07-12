import styled from "styled-components";

export const EmptyContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 100%;

  p {
    font-size: clamp(1.6rem, 2vw, 1.8rem);
    color: ${({ theme }) => theme.colors.neutral["50"]};
    text-align: center;
    max-width: 28%;
    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.indigo["600"]};
    }
  }

  @media screen and (max-width: 575px) {
    flex-direction: column;

    p {
      padding: 0 1.6rem;
    }
  }
`;
