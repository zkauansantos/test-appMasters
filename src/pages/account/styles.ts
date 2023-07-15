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
  padding: 0 2.4rem;

  img {
    width: 100%;
    max-width: 50rem;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    margin-top: 6.4rem;
    padding-bottom: 6.4rem;
  }
`;

export const FormUserEdit = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};
  border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
  min-width: 40rem;
  width: 100%;
  min-height: 400px;
  padding: 2.4rem;

  @media screen and (max-width: 1000px) {
    min-width: initial;
    max-width: 60rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.neutral["50"]};
    align-self: flex-start;
    font-size: 2rem;
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    & > input[type="file"] {
      background-color: ${({ theme }) => theme.colors.neutral["300"]};
      color: ${({ theme }) => theme.colors.indigo["900"]};
      cursor: pointer;
    }
  }

  button {
    margin-top: 12.8rem;
    width: 100%;
  }

  progress {
    margin-top: 0.2rem;
    width: 100%;
    margin-top: 0.4rem;
    transition: width is ease-in-out;
    height: 1rem;
  }
`;
