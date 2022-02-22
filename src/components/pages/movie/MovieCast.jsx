import { Box, Heading, Container, Image, Text } from "@chakra-ui/react";
import DragScroll from "../../common/DragScroll";

const MovieCast = ({ movieCredit }) => (
  <Box backgroundColor="#2B6CB0">
    <Container maxW="container.lg" paddingY="32px">
      <Heading fontSize="30px" color="white">
        Cast
      </Heading>
      <DragScroll>
        {movieCredit.cast.map((cast) => {
          return (
            <Box key={cast.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                borderRadius="lg"
                objectFit="cover"
                height={{
                  base: "150px",
                  md: "190px",
                }}
                minWidth={{
                  base: "100px",
                  md: "140px",
                }}
                fallbackSrc="/img/cast.png"
              />
              <Box>
                <Text color="white" fontWeight="bold" fontSize="16px">
                  {cast.name}
                </Text>
                <Text color="white" fontSize="14px">
                  {cast.character}
                </Text>
              </Box>
            </Box>
          );
        })}
      </DragScroll>
    </Container>
  </Box>
);

export default MovieCast;
