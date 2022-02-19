import { useRef, useState } from "react";
import Head from "next/head";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Container, Heading } from "@chakra-ui/layout";
import { SearchIcon } from "@chakra-ui/icons";

import api from "../src/api";
import Navbar from "../src/components/Navbar";
import { renderMovies } from "../src/utils/index";

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
          <Container maxW="container.lg" paddingY={8}>
            <Heading as="h1" color="white" marginBottom={8}>
              Popular Sekarang
            </Heading>
            {renderMovies(movies)}
          </Container>
        </Box>
        <Container maxW="container.lg" paddingY={12} centerContent>
          <Heading as="h1" marginBottom={6} color={"gray.600"}>
            Cari Film
          </Heading>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <InputGroup marginBottom={12}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input name="search" placeholder="Search" ref={inputRef} />
              <Button
                backgroundColor="#2B6CB0"
                color="white"
                marginLeft={2}
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
