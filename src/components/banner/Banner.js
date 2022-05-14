import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";

function Banner() {
  const navigate = useNavigate();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=b8cc1f2a76c54c51545b0078bdde8a3c`,
    fetcher
  );

  const movies = data?.results || [];

  // console.log(movies);

  return (
    <section className="banner h-[100vh] page_container mt-10">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide>
              <BannerItem data={movie} navigate={navigate}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

function BannerItem({ data, navigate }) {
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] rounded-lg"></div>
      <img
        className="w-full h-full rounded-lg object-cover object-center"
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
            : ""
        }
        alt=""
      />
      <h3 className="absolute font-bold top-[50%] translate-y-[-50%] left-4 text-white text-3xl">
        {data.title}
      </h3>
      <div className="flex gap-x-2 absolute bottom-[150px] left-4  text-white rounded-md">
        <div className="border p-1 border-gray-400 rounded-md">
          <span>Action</span>
        </div>
        <div className="border p-1 border-gray-400 rounded-md">
          <span>Adventure</span>
        </div>
        <div className="border p-1 border-gray-400 rounded-md">
          <span>Drama</span>
        </div>
      </div>
      {/* <Button>Watch Now</Button> */}
      <button
        className="absolute left-4 bottom-[55px] px-4 py-3 bg-primary text-white rounded-lg"
        onClick={() => navigate(`/movies/${data.id}`)}
      >
        Watch Now
      </button>
    </div>
  );
}

export default Banner;
