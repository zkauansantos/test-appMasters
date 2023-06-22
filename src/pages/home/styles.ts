import { styled } from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 6.4rem 0;
`

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  height: 80%;
  width: 100%;
  max-width: 124rem;

  h1 {
    color: ${({theme}) => theme.colors.neutral['50']};
    font-size: 4rem;
    margin-bottom: 2.4rem;
  }

  .box-search{
    width: 40%;
    margin-bottom: 4.8rem;

    input {
      border: none;
      width: 100%;
      padding: 0.8rem;
      border-radius: 0.4rem;
      outline: none;
      border: 3px solid transparent;
      transition: 0.2s ease;

      &:focus {
        border: 3px solid ${({theme }) => theme.colors.indigo['500']};
      }
    }
  }
`

export const GridCards = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  position: relative;
  min-height: 45vh;
`


export const GameCard = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${({theme}) => theme.colors.neutral['50']};
  font-size: 1.6rem;
  border: 1px solid ${({theme}) => theme.colors.indigo['900']};
  min-height: 50rem;
  padding: 1.6rem;

  &:hover {
    transform: scale(1.025);
  }

  strong {
    color: ${({theme}) => theme.colors.indigo['600']};
    font-size: 2rem;
  }

  p {
    max-width: 90%;
    text-align: center;
    word-break: break-word;
    font-style: italic;
  }

  button {
    border: none;
    font-weight: bold;
    background-color: ${({theme}) => theme.colors.indigo['600']};
    color: ${({theme}) => theme.colors.neutral['50']};
    padding: 1rem 2rem;
    font-size: 1.8rem;
    border-radius: 0.8rem 0.2rem 0.8rem 0.2rem;
    transition: 0.2s;
    text-transform: uppercase;
    margin-top: 1.6;

    &:hover {
      background-color: ${({theme}) => theme.colors.indigo['950']};
      color: ${({theme}) => theme.colors.neutral['50']};
    }
  }

`