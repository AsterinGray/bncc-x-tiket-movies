import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Container, Grid, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import MovieCard from "../src/components/MovieCard";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../src/components/Navbar";
import { useRef } from "react";
import api from "../src/api";
import { useState } from "react";

export const getServerSideProps = async () => {
  const { data } = await api.get("/movie/popular");
  return {
    props: { movies: data.results },
  };
};

const Home = ({ movies }) => {
  const inputRef = useRef(null);
  const [searchedMovies, setSearchedMovies] = useState(null);

  const searchMovie = async (searchTerm) => {
    const { data } = await api.get(`/search/movie`, {
      params: {
        query: searchTerm,
      },
    });
    return data;
  };

  const renderMovies = (movies, altColor = false) => {
    return (
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
        }}
        columnGap="12px"
        rowGap={`48px`}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            link={String(movie.id)}
            image={movie.poster_path}
            altColor={altColor}
          />
        ))}
      </Grid>
    );
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = inputRef.current.value;
    const { results } = await searchMovie(searchTerm);
    setSearchedMovies(results);
  };

  return (
    <>
      <Head>
        <title>BNCC Movies</title>
        <meta name="description" content="BNCC Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Box backgroundColor="#2B6CB0">
          <Container maxW="container.lg" paddingY="32px">
            <Heading as="h1" fontSize="36px" color="white" marginBottom="32px">
              Popular Sekarang
            </Heading>
            {renderMovies(movies)}
          </Container>
        </Box>
        <Container maxW="container.lg" paddingY="48px" centerContent>
          <Heading as="h1" color="#4A5568" marginBottom="24px">
            Cari Film
          </Heading>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <InputGroup marginBottom={`48px`}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input name="search" placeholder="Search" ref={inputRef} />
              <Button
                backgroundColor="#2B6CB0"
                color="white"
                marginLeft="8px"
                type="submit"
              >
                Cari
              </Button>
            </InputGroup>
          </form>
          {searchedMovies && renderMovies(searchedMovies, true)}
        </Container>
      </main>
    </>
  );
};

export default Home;
