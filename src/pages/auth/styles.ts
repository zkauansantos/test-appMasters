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
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    align-self: self-start;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.neutral["50"]};
    margin-bottom: 0.8rem;
  }

  div {
    margin-top: 3.2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      border-radius: 4px;
      padding: 1rem 0.8rem;
      font-size: 1.6rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;
    }
  }

  p {
    font-size: 1.6rem;

    a {
      margin-left: 0.4rem;
    }
  }

  .suggestions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.neutral["50"]};

    button {
      padding: 0;
      margin: 0;
      outline: none !important;
      border: none;
      width: auto;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.indigo["600"]};
    }
  }
`;

export const Field = styled.label<{ error: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  input {
    border: ${({ error }) =>
      error ? "1px solid #FC5050" : "1px solid rgba(0,0,0,0.5)"};
    padding: 1rem;
    margin-top: 1.6rem;
    font-size: 1.6rem;
    width: 100%;
    border-radius: 4px;
    outline: none;
    font-style: italic;
    border: 3px solid transparent;
    appearance: none;

    &:focus {
      border: 3px solid ${({ theme }) => theme.colors.indigo["600"]};
    }
  }

  .show-password {
    position: absolute;
    border: none;
    right: 5%;
    top: 47%;
    cursor: pointer;
    background: none;

    &:hover {
      svg {
        opacity: 0.6;
      }
    }
  }
`;

export const InputError = styled.span`
  margin-top: 0.6rem;
  color: #fc5050;
  font-size: 1.2rem;
  margin-left: 0.4rem;
`;
