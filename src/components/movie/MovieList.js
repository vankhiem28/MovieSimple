import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, movieDB } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=b8cc1f2a76c54c51545b0078bdde8a3c

function MovieList({ type }) {
  const [movies, setMoives] = useState([]);
  const { data, error } = useSWR(movieDB.getMovieList(type), fetcher);

  useEffect(() => {
    if (data && data.results) setMoives(data.results);
  }, [data]);

  return (
    <div className="movie_list mt-5">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard data={movie}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default MovieList;
