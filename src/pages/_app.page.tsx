import type { AppProps } from "next/app";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/global";
import { theme } from "@/styles/theme";
import Head from "next/head";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
