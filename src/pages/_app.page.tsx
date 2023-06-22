import { queryClient } from "@/lib/queryClient";
import { GlobalStyles } from "@/styles/global";
import { theme } from "@/styles/theme";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

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
