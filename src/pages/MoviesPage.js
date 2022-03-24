import React, { Fragment } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";

function MoviesPage() {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=b8cc1f2a76c54c51545b0078bdde8a3c`,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <Fragment>
      <div className="flex page_container mt-5">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 p-4 outline-none bg-slate-800 text-primary rounded-lg"
        />
        <button className="p-4 bg-primary text-white rounded-lg">Search</button>
      </div>
      <div className="grid grid-cols-4 gap-10 page_container mt-5">
        {movies.map((item, index) => (
          <MovieCard key={index} data={item}></MovieCard>
        ))}
      </div>
    </Fragment>
  );
}

export default MoviesPage;
