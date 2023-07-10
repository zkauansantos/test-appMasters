import { createGlobalStyle } from "styled-components";
import homeBg from "@/assets/imgs/homeBg.png";

export const GlobalStyles = createGlobalStyle<{}>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pathway Extreme', sans-serif;
  }

  a {
    text-decoration: none;
  }

  html, body {
    font-size: 62.5%;
    background: url(${homeBg.src}) center center repeat;
    background-color: ${({ theme }) => theme.colors.zinc["950"]};

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.indigo["500"]};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.indigo["900"]};
    }
  }
`;
