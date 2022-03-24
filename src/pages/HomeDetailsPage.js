import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, keyApi } from "../config";

function HomeDetailsPage() {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${keyApi}`,
    fetcher
  );

  return <Fragment></Fragment>;
}

export default HomeDetailsPage;
