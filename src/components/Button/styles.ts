import styled from "styled-components";

export const ButtonStyled = styled.button<{ background: string | undefined }>`
  border: none;
  font-weight: bold;
  background-color: ${({ theme, background }) =>
    background ? background : theme.colors.indigo["600"]};
  color: ${({ theme }) => theme.colors.neutral["50"]};
  padding: 1rem 2rem;
  font-size: 1.8rem;
  border-radius: 0.8rem 0.2rem 0.8rem 0.2rem;
  transition: 0.2s;
  text-transform: uppercase;
  margin-top: 1.6;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
`;
