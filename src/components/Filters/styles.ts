import styled from "styled-components";

export const FiltersContainer = styled.div`
  margin-bottom: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2.4rem;

  > div { //loader
    width: initial !important;
  }

  input,
  select {
    width: 100%;
    max-width: 30rem;
    border: none;
    padding: 0.8rem;
    border-radius: 0.4rem;
    outline: none;
    border: 3px solid transparent;
    transition: 0.2s ease;
    background-color: ${({ theme }) => theme.colors.zinc["800"]};
    color: ${({ theme }) => theme.colors.neutral["50"]};
    appearance: none;

    &:focus {
      border: 3px solid ${({ theme }) => theme.colors.indigo["600"]};
    }
  }
`;
