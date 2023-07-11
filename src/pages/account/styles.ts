import styled from "styled-components";

export const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

export const AccountWrapper = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4.8rem;
`;

export const FormUserEdit = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  width: 100%;
  min-height: 400px;
  padding: 2.4rem;

  strong {
    color: ${({ theme }) => theme.colors.neutral["50"]};
    align-self: flex-start;
    font-size: 2rem;
  }
`;
