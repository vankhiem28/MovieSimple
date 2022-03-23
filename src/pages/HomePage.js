import React from "react";
import MovieList from "../components/movie/MovieList";

function HomePage() {
  return (
    <React.Fragment>
      <section className="movie_layout page_container mt-10">
        <h2 className="text-white font-bold text-3xl">Now Playing</h2>
        <MovieList type={"now_playing"}></MovieList>
      </section>
      <section className="movie_layout page_container mt-10">
        <h2 className="text-white font-bold text-3xl">Top rated</h2>
        <MovieList type={"top_rated"}></MovieList>
      </section>
      <section className="movie_layout page_container mt-10">
        <h2 className="text-white font-bold text-3xl">Popular</h2>
        <MovieList type={"popular"}></MovieList>
      </section>
    </React.Fragment>
  );
}

export default HomePage;
