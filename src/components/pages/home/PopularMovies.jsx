import { Box, Container, Heading } from "@chakra-ui/react";

import { renderMovies } from "../../../utils";

const PopularMovies = ({ movies }) => (
  <Box backgroundColor="#2B6CB0">
    <Container maxW="container.lg" paddingY={8}>
      <Heading as="h1" color="white" marginBottom={8}>
        Popular Sekarang
      </Heading>
      {renderMovies(movies)}
    </Container>
  </Box>
);

export default PopularMovies;
