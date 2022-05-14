import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, movieDB } from "../config";
import ReactPaginate from "react-paginate";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

const itemsPerPage = 20;

function MoviesPage() {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [url, setUrl] = useState(movieDB.getMoviesPage());

  const [query, setQuery] = useState("");
  const [buttonSearch, setButtonSearch] = useState("");
  const [page, setPage] = useState(1);
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
        `https://api.themoviedb.org/3/movie/popular?api_key=b8cc1f2a76c54c51545b0078bdde8a3c&page=${page}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=b8cc1f2a76c54c51545b0078bdde8a3c&query=${query}&page=${page}`
      );
    }
  }, [buttonSearch, page]);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

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
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </Fragment>
  );
}

export default MoviesPage;
