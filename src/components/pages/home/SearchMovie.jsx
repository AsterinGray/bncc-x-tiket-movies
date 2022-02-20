import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import api from "../../../api";
import { renderMovies } from "../../../utils";

const SearchMovie = () => {
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
  );
};

export default SearchMovie;
