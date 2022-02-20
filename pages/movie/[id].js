import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../src/api";
import DragScroll from "../../src/components/common/DragScroll";
import Layout from "../../src/components/common/Layout";
import MovieCast from "../../src/components/pages/movie/MovieCast";
import MovieDetail from "../../src/components/pages/movie/MovieDetail";
import SimilarMovie from "../../src/components/pages/movie/SimilarMovie";

export const getServerSideProps = async ({ params }) => {
  const movie_id = params.id;

  const { data: movieDetail } = await api.get(`/movie/${movie_id}`);
  const { data: movieCredit } = await api.get(`/movie/${movie_id}/credits`);
  const {
    data: { results: similarMovie },
  } = await api.get(`/movie/${movie_id}/similar`);
  return {
    props: { movieDetail, similarMovie, movieCredit, movie_id },
  };
};

const Detail = ({ movieDetail, similarMovie, movieCredit, movie_id }) => {
  return (
    <Layout>
      <Container maxW="container.lg" paddingY="32px">
        <MovieDetail movieDetail={movieDetail} movie_id={movie_id} />
        <MovieCast movieCredit={movieCredit} />
      </Container>
      <SimilarMovie similarMovie={similarMovie} />
    </Layout>
  );
};

export default Detail;
