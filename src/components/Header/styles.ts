import styled, { css, keyframes } from "styled-components";

const fadeInNavDesktop = keyframes`
  0%{
    transform: translateY(-10rem);
  }
  100%{
    transform: translateY(0);
  }
`;

const fadeInNavMobile = keyframes`
  0%{
    transform: translateX(10rem);
  }
  100%{
    transform: translateX(0);
  }
`;

const fadeInLogo = keyframes`
  0%{
    transform: translateX(-100rem);
  }
  100%{
    transform: translateX(0);
  }
`;

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8.4rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 124rem;
  padding-top: 2rem;
  height: 8.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2.4rem;

  img {
    transition: 0.4s ease;
    animation: ${fadeInLogo} 2s ease;

    :hover {
      filter: grayscale(70%);
    }
  }
`;

export const ListNavigations = styled.ul<{ menuOpen: boolean; width: number }>`
  ${({ menuOpen, width }) =>
    !menuOpen && width > 1000
      ? css`
          animation: ${fadeInNavDesktop} 2s ease;
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2.4rem;
        `
      : css`
          position: fixed;
          height: 100vh;
          width: 100%;
          background-color: ${({ theme }) => theme.colors.zinc["950"]};
          z-index: 5;
          right: 0;
          top: 0;
          display: ${menuOpen ? "flex" : "none"};
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          padding: 7.6rem 2.4rem 0;
          border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
          animation: ${fadeInNavMobile} 1s ease;
          transition: 0.5s ease-in;

          .logout {
            margin-top: 1.6rem;
            padding-left: 2.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}

  a {
    font-size: 1.8rem;
    padding: 1rem 3rem;
    color: #fff;
    border-radius: 4px;
    transition: all 0.7s ease;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    text-decoration: none;

    :hover {
      border: 1px solid ${({ theme }) => theme.colors.indigo["600"]};
      color: ${({ theme }) => theme.colors.indigo["500"]};
    }
  }

  button {
    border: none;
    background-color: transparent;
    display: grid;
    place-items: center;
    transition: all 0.3s ease;
    cursor: pointer;

    :active {
      transform: rotate(-90deg);
    }

    :hover {
      transform: rotate(-90deg);

      * {
        color: ${({ theme }) => theme.colors.indigo["500"]};
      }
    }
  }
`;

export const HamburguerContainer = styled.div`
  position: relative;
  height: clamp(5rem, 10vw, 6.5rem);
  width: clamp(5rem, 10vw, 7rem);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`;

export const Hamburguer = styled.span<{ menuOpen: boolean }>`
  position: absolute;
  width: 3rem;
  height: 0.4rem;
  background: ${({ theme }) => theme.colors.indigo["900"]};

  ::after,
  ::before {
    content: "";
    width: 3rem;
    height: 0.2rem;
    position: absolute;
    transition: 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.indigo["600"]};
  }

  ${({ menuOpen }) =>
    menuOpen
      ? css`
          height: 0;

          ::after {
            transform: rotate(45deg);
          }

          ::before {
            transform: rotate(-45deg);
          }
        `
      : css`
          height: 0.3rem;

          ::after {
            top: -0.8rem;
          }

          ::before {
            top: 0.8rem;
          }
        `}
`;
