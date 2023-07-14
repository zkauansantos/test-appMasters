import styled from "styled-components";

export const Input = styled.input<{ error?: boolean }>`
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
`;
