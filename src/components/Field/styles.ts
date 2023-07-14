import styled from "styled-components";

export const FieldContainer = styled.label<{ error: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

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
