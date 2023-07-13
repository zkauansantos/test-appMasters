import Head from "next/head";
import type { AppProps } from "next/app";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "@/contexts/AuthContext";

import Header from "@/components/Header";

import { GlobalStyles } from "@/styles/global";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainerStyled } from "@/styles/shared/ToastContainerStyled";

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
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <ToastContainerStyled
              position="bottom-center"
              limit={3}
              autoClose={1500}
            />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
