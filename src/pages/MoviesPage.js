import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

function MoviesPage() {
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=b8cc1f2a76c54c51545b0078bdde8a3c"
  );

  const [query, setQuery] = useState("");
  const [buttonSearch, setButtonSearch] = useState("");
  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleClickSearch = () => {
    setButtonSearch(query);
  };
  const { data, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  useEffect(() => {
    if (query === "") {
      setUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=b8cc1f2a76c54c51545b0078bdde8a3c"
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=b8cc1f2a76c54c51545b0078bdde8a3c&query=${query}`
      );
    }
  }, [buttonSearch]);

  const movies = data?.results || [];
  return (
    <Fragment>
      <div className="flex page_container mt-5">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 p-4 outline-none bg-slate-800 text-primary rounded-lg"
          onChange={handleChangeSearch}
        />
        <button
          className="p-4 bg-primary text-white rounded-lg"
          onClick={handleClickSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="page_container-l w-8 h-8 mt-4 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-10 page_container mt-5">
            {movies.map((item, index) => (
              <MovieCard key={index} data={item}></MovieCard>
            ))}
          </div>
          <div className="page_container-l flex justify-center mt-5 mb-5 text-white gap-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            </span>
            <span className="px-3 leading-8 bg-primary rounded-sm bg cursor-pointer">
              1
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default MoviesPage;
