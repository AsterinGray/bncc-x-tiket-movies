import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import Link from "next/link";

const MovieCard = ({ title, link, image, altColor = false }) => (
  <Link href={link} passHref>
    <a>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          objectFit="cover"
          alt={`${title} image`}
          borderRadius={"8px"}
          fallbackSrc={"/img/movie.png"}
        />
        <Text
          textAlign="center"
          color={altColor ? "black" : "white"}
          marginTop={`8px`}
          fontWeight="bold"
        >
          {title}
        </Text>
      </Box>
    </a>
  </Link>
);

export default MovieCard;
