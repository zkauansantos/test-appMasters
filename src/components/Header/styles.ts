import styled, { keyframes } from "styled-components";

const fadeInNav = keyframes`
  0%{
    transform: translateY(-10rem);
  }
  100%{
    transform: translateY(0);
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

  img {
    animation: ${fadeInLogo} 2s ease;
  }

  nav {
    animation: ${fadeInNav} 2s ease;

    ul {
      list-style: none;
      display: flex;
      gap: 2.4rem;

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
    }
  }
`;