import styled from "styled-components";


export const GameCardContainer = styled.div`
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral["50"]};
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.indigo["900"]};
  min-height: 55rem;
  padding: 2.4rem 1.6rem 3.2rem;
  text-align: center;
  position: relative;
  transition: 0.3s ease;
  background-color: ${({ theme }) => theme.colors.zinc["950"]};

  &:hover {
    transform: scale(1.01);
    -webkit-box-shadow: 0px 0px 20px 1px rgba(79, 70, 229, 0.275);
    -moz-box-shadow: 0px 0px 20px 1px rgba(79, 70, 229, 0.275);
    box-shadow: 0px 0px 20px 1px rgba(79, 70, 229, 0.275);
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.6rem;

    strong {
      color: ${({ theme }) => theme.colors.indigo["600"]};
      font-size: 2rem;
    }
  }

  img {
    margin-bottom: 1.2rem;
  }

  .interactions {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 0 2.4rem;
    margin-bottom: 1.2rem;
  }

  a {
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  p {
    padding-bottom: 10rem;
    max-width: 90%;
    word-break: break-word;
    font-style: italic;
  }

  @media screen and (max-width: 685px) {
    max-width: 50rem;
  }

  @media screen and (max-width: 350px) {
    max-width: 30.1rem;
    img {
      max-width: 95%;
      height: auto;
    }
  }
`;