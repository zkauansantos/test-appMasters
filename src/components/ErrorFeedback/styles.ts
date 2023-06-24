import { styled } from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;
  flex-direction: column;
  width: 100%;
  margin-top: 2.4rem;

  p {
    font-size: clamp(1.6rem, 2vw, 1.8rem);
    color: #fc5050;
    text-align: center;
  }

  @media screen and (max-width: 575px) {
    img {
      max-width: 40%;
      height: 100%;
    }
  }
`;
