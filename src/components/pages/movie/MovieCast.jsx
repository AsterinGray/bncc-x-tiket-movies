import { Box, Heading, Image, Text } from "@chakra-ui/react";
import DragScroll from "../../common/DragScroll";

const MovieCast = ({ movieCredit }) => (
  <Box>
    <Heading fontSize="30px" color="#2D3748" marginTop="80px">
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
              height="190px"
              minWidth="140px"
              fallbackSrc="/img/cast.png"
            />
            <Box>
              <Text color="#2D3748" fontWeight="bold" fontSize="16px">
                {cast.name}
              </Text>
              <Text color="#2D3748" fontSize="14px">
                {cast.character}
              </Text>
            </Box>
          </Box>
        );
      })}
    </DragScroll>
  </Box>
);

export default MovieCast;
