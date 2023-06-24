import { styled } from "styled-components";

export const ButtonStyled = styled.button`
  border: none;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.indigo["600"]};
  color: ${({ theme }) => theme.colors.neutral["50"]};
  padding: 1rem 2rem;
  font-size: 1.8rem;
  border-radius: 0.8rem 0.2rem 0.8rem 0.2rem;
  transition: 0.2s;
  text-transform: uppercase;
  margin-top: 1.6;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.indigo["950"]};
    color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;
