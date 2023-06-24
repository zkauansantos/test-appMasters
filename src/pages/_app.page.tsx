import type { AppProps } from "next/app";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/global";
import { theme } from "@/styles/theme";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
