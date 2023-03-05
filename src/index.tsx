import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import CustomFonts from "./theme/fonts";
import Navbar from "./components/navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TopAnimesContextProvider } from "./context/top-animes-context";

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
  <React.StrictMode>
    <TopAnimesContextProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            fontFamily: "Inter, sans-serif",
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
    </TopAnimesContextProvider>
  </React.StrictMode>
);
