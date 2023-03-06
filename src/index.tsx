import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import CustomFonts from "./theme/fonts";
import Navbar from "./components/navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AnimesPaginationContextProvider } from "./context/animes-pagination-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

root.render(
  // <React.StrictMode>
  <AnimesPaginationContextProvider>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Inter, sans-serif",

          colors: {
            primary: [
              "#e3fafc",
              "#c5f6fa",
              "#99e9f2",
              "#66d9e8",
              "#3bc9db",
              "#22b8cf",
              "#15aabf",
              "#1098ad",
              "#0c8599",
              "#0c8599",
            ],
          },
          primaryColor: "primary",

          breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em",
          },

          fontSizes: {
            xs: "0.6rem",
            sm: "0.75rem",
            md: "0.9rem",
            lg: "1rem",
            xl: "1.2rem",
            xxl: "1.5rem",
            xxxl: "1.8rem",
            xxxxl: "3rem",
          },
        }}
      >
        <BrowserRouter>
          <CustomFonts />
          <Navbar />
          <Container size="md">
            <App />
          </Container>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </AnimesPaginationContextProvider>
  // </React.StrictMode>
);
