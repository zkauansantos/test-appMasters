import styled from "styled-components";

export const Container = styled.main`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerForm = styled.form`
  min-width: 45rem;
  min-height: 40rem;
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  border-radius: 4px;

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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.neutral["50"]};
    gap: 8px;

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
