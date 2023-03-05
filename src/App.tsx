import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimeDetailsPage from "./pages/anime-details";
import AnimesPage from "./pages/animes";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/animes" element={<AnimesPage />} />
      <Route path="/animes/:id" element={<AnimeDetailsPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
