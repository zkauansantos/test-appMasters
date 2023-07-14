import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const ToastContainerStyled = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: 100%;
    max-width: 32rem;
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
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
