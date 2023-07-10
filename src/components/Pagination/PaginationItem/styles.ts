import styled from "styled-components";

export const PaginationButton = styled.button`
  width: 1px;
  height: 1px;
  outline: none;
  border: none;
  border-radius: .4rem;
  background-color: ${({theme}) => theme.colors.indigo['600']};
  color: ${({theme}) => theme.colors.neutral['50']};
  padding: 1.6rem;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: bold;
  display: flex;
  font-style: italic;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;

  &:hover {
    background-color: ${({theme}) => theme.colors.indigo['800']};
  }

  &:active {
    background-color: ${({theme}) => theme.colors.indigo['950']};
  }

  &:disabled {
    background-color: ${({theme}) => theme.colors.neutral['400']};
    cursor: not-allowed;
  }


  @media screen and (max-width: 475px) {
    padding: 1.2rem;
  }
`