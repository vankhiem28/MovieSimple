import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ data }) {
  // console.log(data);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/movies/${data.id}`);
  };

  return (
    <div className="movie-card p-3 bg-slate-700 rounded-lg text-white">
      <img
        className="w-full h-[200px] object-cover rounded-lg"
        src={
          data.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
            : ""
        }
        alt=""
      />
      <h3 className="font-bold mt-2 text_height-dot">{data.title}</h3>
      <div className="flex justify-between opacity-50 mt-2">
        <span>{new Date(data.release_date).getFullYear()}</span>
        <span>{data.vote_average}</span>
      </div>
      <button
        onClick={handleClickNavigate}
        className="w-full py-3 bg-primary rounded-lg mt-2"
      >
        Watch Now
      </button>
    </div>
  );
}

export default MovieCard;
