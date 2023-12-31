import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const ToastContainerStyled = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: 100%;
    max-width: 32rem;
    text-align: center;
    margin-bottom: 6.4rem;

    @media screen and (max-width: 600px) {
      max-width: initial;
      padding: 0 2.4rem;
    }
  }

  .Toastify__toast {
    background-color: ${({ theme }) => theme.colors.zinc["950"]};
  }

  .Toastify__toast--error {
    border: 1px solid #fc5050;
  }

  .Toastify__toast--success {
    border: 1px solid #4cd964;
  }

  .Toastify__toast-body {
    color: ${({ theme }) => theme.colors.neutral["50"]};
    font-size: 1.4rem;
  }

  button[aria-label="close"] {
    color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;
