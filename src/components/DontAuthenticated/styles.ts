import styled from "styled-components";

export const DontAuthenticatedContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 100%;

  @media screen and (max-width: 450px) {
    top: 5%;

    img {
      width: 45%;
    }
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: clamp(1.3rem, 2vw, 1.8rem);
    margin-bottom: 0.8rem;

    color: ${({ theme }) => theme.colors.neutral["50"]};
    text-align: center;

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
