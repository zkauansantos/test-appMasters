import styled from "styled-components";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: 4rem 0;
  min-height: 90vh;
`;

const Content = styled.div`
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

const GridCards = styled.div`
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

export { GridCards, Container, Content };
