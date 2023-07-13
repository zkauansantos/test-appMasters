import styled from "styled-components";

export const FieldContainer = styled.label<{ error: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  input {
    padding: 1rem;
    margin-top: 1.6rem;
    font-size: 1.6rem;
    width: 100%;
    border-radius: 4px;
    outline: none;
    font-style: italic;
    border: 3px solid transparent;
    border: ${({ error }) =>
      error ? "3px solid #FC5050" : "1px solid rgba(0,0,0,0.5)"};
    appearance: none;

    &:focus {
      border: 3px solid ${({ theme }) => theme.colors.indigo["600"]};
    }
  }

  .show-password {
    position: absolute;
    border: none;
    right: 5%;
    top: ${({ error }) => (error ? "38%" : "50%")};
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
