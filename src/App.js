import React from "react";

import MovieCard from "./components/movie/MovieCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <HomePage />
    </React.Fragment>
  );
}

export default App;
