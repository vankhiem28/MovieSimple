import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";

import { fetcher, keyApi } from "../config";

function HomeDetailsPage() {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${keyApi}`,
    fetcher
  );

  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

  if (!data) return null;
  // console.log(data);

  return (
    <Fragment>
      <div className="page_container-l h-[600px] relative mt-5">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full max-w-[600px] mx-auto h-[400px] -my-[200px] relative z-10 mb-5 ">
        <img
          className="w-full h-full object-cover rounded-lg object-center "
          src={`https:image.tmdb.org/t/p/original/${data.poster_path}`}
          alt=""
        />
      </div>
      <h1 className=" text-center text-white font-bold text-4xl mb-5">
        {data.title}
      </h1>
      {data.genres && (
        <div className="flex justify-center gap-x-5 mb-5 mt-10">
          {data.genres.map((item, index) => (
            <span className="text-primary border border-primary p-2 rounded-xl">
              {item.name}
            </span>
          ))}
        </div>
      )}
      <h2 className="mb-5 max-w-[600px] mx-auto text-center text-white">
        {data.overview}
      </h2>
      <Casts></Casts>
      <Trailer />
      <MovieSimilar />
    </Fragment>
  );
}

function Casts() {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieID}?api_key=${keyApi}`,
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${keyApi}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length < 0) return null;

  return (
    <Fragment>
      <h2 className="text-center text-white text-4xl font-bold mt-10 mb-5">
        Casts
      </h2>
      <div className="page_container-l grid grid-cols-4 gap-5 mb-5">
        {cast.slice(0, 4).map((item, index) => (
          <div key={index} className="casts_item">
            <img
              className="rounded-lg w-full h-[400px] object-cover"
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
            />
            <h3 className="text-white text-lg font-bold text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

function Trailer() {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieID}?api_key=${keyApi}`,
    // `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${keyApi}`,
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${keyApi}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  console.log(data);
  return (
    <Fragment>
      <h2 className="text-center text-white font-bold text-4xl mb-5">
        Trailer
      </h2>
      <div className="w-full flex justify-center mb-5">
        {results.slice(0, 1).map((item, index) => (
          <iframe
            key={index}
            width="942"
            height="530"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            // className="w-full h-full object-cover"
          ></iframe>
        ))}
      </div>
    </Fragment>
  );
}

function MovieSimilar() {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieID}?api_key=${keyApi}`,
    // `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${keyApi}`,
    `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${keyApi}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;

  return (
    <Fragment>
      <h2 className="text-center text-white text-4xl font-bold mt-10 mb-5">
        Similar Movie
      </h2>
      <div className="movie_list page_container-l">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard data={movie}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Fragment>
  );
}

export default HomeDetailsPage;

// <iframe width="942" height="530" src="https://www.youtube.com/embed/qZUqTnac2zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
