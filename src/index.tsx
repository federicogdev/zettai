import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import CustomFonts from "./theme/fonts";
import Navbar from "./components/navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
