import { Grid } from "@chakra-ui/react";
import MovieCard from "../components/MovieCard";

export const renderMovies = (movies, altColor = false) => {
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
          link={`/movie/${String(movie.id)}`}
          image={movie.poster_path}
          altColor={altColor}
        />
      ))}
    </Grid>
  );
};
