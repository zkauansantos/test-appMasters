import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: 4rem 0;
  min-height: 90vh;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1.6rem;
  gap: 2.4rem;
  max-width: 124rem;
  min-height: 50vh;

  h1 {
    color: ${({ theme }) => theme.colors.neutral["50"]};
    font-size: clamp(2.6rem, 3.4vw, 4rem);
    margin-bottom: 1.6rem;
    text-align: center;
  }

  .box-search {
    margin-bottom: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35%;
    gap: 2.4rem;

    > div {
      width: initial !important;
    }

    input {
      width: 100%;
      border: none;
      padding: 0.8rem;
      border-radius: 0.4rem;
      outline: none;
      border: 3px solid transparent;
      transition: 0.2s ease;

      &:focus {
        border: 3px solid ${({ theme }) => theme.colors.indigo["500"]};
      }
    }
  }
`;

export const GridCards = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  justify-items: center;
  align-items: stretch;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 2.4rem;
  min-height: 45vh;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 675px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`;

export const GameCard = styled.div`
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

  @media screen and (max-width: 350px) {
    max-width: 30.1rem;
    img {
      max-width: 95%;
      height: auto;
    }
  }
`;
