import { Box, Container, Heading } from "@chakra-ui/react";
import { renderMovies } from "../../../utils";

const SimilarMovie = ({ similarMovie }) => (
  <Box marginTop="80px">
    <Container maxW="container.lg" paddingY={8}>
      <Heading as="h1" marginBottom={8} color="#2D3748">
        Similar Movie
      </Heading>
      {renderMovies(similarMovie, true)}
    </Container>
  </Box>
);

export default SimilarMovie;
