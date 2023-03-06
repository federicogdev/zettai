import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimeDetailsPage from "./pages/anime-details";
import AnimeReviewsPage from "./pages/anime-reviews";
import TopAnimesPage from "./pages/top-animes";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import AnimesPage from "./pages/animes";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/top-animes" element={<TopAnimesPage />} />
      <Route path="/anime" element={<AnimesPage />} />
      <Route path="/anime/:id" element={<AnimeDetailsPage />} />
      <Route path="/anime/:id/reviews" element={<AnimeReviewsPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
