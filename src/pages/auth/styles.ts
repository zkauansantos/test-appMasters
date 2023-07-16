import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 128px;

  @media screen and (max-width: 600px) {
    margin-top: 48px;
  }
`;

export const ContainerForm = styled.form`
  min-width: 45rem;
  min-height: 40rem;
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  border-radius: 4px;

  @media screen and (max-width: 460px) {
    min-width: 320px;
  }

  h1 {
    align-self: self-start;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.neutral["50"]};
    margin-bottom: 0.8rem;
  }

  .btn {
    margin: 3.2rem 0;

    button {
      width: 100%;
      font-size: 1.6rem;
    }
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.neutral["50"]};
    gap: 8px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    p {
      font-size: 1.6rem;
    }

    .changer {
      cursor: pointer;
      font-size: 1.6rem;
      font-weight: bold;
      border: none;
      width: auto;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.indigo["500"]};
      transition: 0.4s ease;

      :hover {
        color: ${({ theme }) => theme.colors.indigo["950"]};
      }
    }
  }
`;
