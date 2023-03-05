import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimeDetailsPage from "./pages/anime-details";
import HomePage from "./pages/home";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/animes/:id" element={<AnimeDetailsPage />} />
    </Routes>
  );
};

export default App;
