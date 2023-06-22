import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      zinc: {
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
      indigo: {
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
    };
  }
}
