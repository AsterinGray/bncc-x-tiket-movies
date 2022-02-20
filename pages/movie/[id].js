import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "../../src/api";
import DragScroll from "../../src/components/common/DragScroll";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import router from "next/router";
import { renderMovies } from "../../src/utils";
import Layout from "../../src/components/common/Layout";

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
  const {
    session_id,
    data: { id: account_id },
  } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getFavoriteMovies = async () => {
      const {
        data: { results },
      } = await api.get(`/account/${account_id}/favorite/movies`, {
        params: { session_id },
      });
      if (results.find((result) => result.id == movie_id)) setIsFavorite(true);
      else setIsFavorite(false);
    };

    if (session_id) getFavoriteMovies();
    else setIsFavorite(false);
  }, [account_id, session_id, isFavorite, movie_id]);

  const changeFavorite = async (favorite) => {
    if (!session_id) router.push("/login");

    try {
      await api.post(
        `/account/${account_id}/favorite`,
        { media_type: "movie", media_id: movie_id, favorite },
        { params: { session_id } }
      );
      toast({
        title: "Sukses",
        description: isFavorite
          ? `Hapus ${movieDetail.title} dari favorit`
          : `Favoritkan ${movieDetail.title}`,
        status: "success",
        isClosable: true,
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast({
        title: `Failed to add favorite`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box>
        <Container maxW="container.lg" paddingY="32px">
          <Flex justifyContent="space-between">
            <Box>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                objectFit="cover"
                alt={`image`}
                borderRadius="8px"
                maxWidth="250px"
              />
            </Box>
            <Box marginLeft="80px">
              <Flex
                mt="10px"
                alignItems="baseline"
                justifyContent="space-between"
              >
                <Flex alignItems="baseline">
                  <Flex>
                    <Heading
                      as="h1"
                      fontSize="36px"
                      color="#2D3748"
                      marginBottom="36px"
                    >
                      {movieDetail.original_title}
                    </Heading>
                  </Flex>
                  <Flex>
                    <Text
                      marginLeft="19px"
                      fontSize="24px"
                      marginBottom="36px"
                      color="#2D3748"
                    >
                      {movieDetail.release_date.slice(0, 4)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="end">
                  <Button
                    colorScheme={isFavorite ? "white" : "blue"}
                    color={isFavorite ? "#2D3748" : "white"}
                    borderColor={"#2B6CB0"}
                    onClick={() => changeFavorite(!isFavorite)}
                  >
                    {isFavorite ? "Dalam list favoritmu" : "Favoritkan"}
                  </Button>
                </Flex>
              </Flex>
              <Box>
                <Text fontSize="18px" marginBottom="36px" color="#2D3748">
                  {movieDetail.tagline}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="#2D3748">
                  {movieDetail.overview}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box>
            <Heading fontSize="30px" color="#2D3748" marginTop="80px">
              Cast
            </Heading>
          </Box>
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
        </Container>
        <Box marginTop="80px">
          <Container maxW="container.lg" paddingY={8}>
            <Heading as="h1" marginBottom={8} color="#2D3748">
              Similar Movie
            </Heading>
            {renderMovies(similarMovie, true)}
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default Detail;
