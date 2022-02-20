import { Container, Text, Box, Grid } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import { renderMovies } from "/src/utils/index";

const WatchList = () => {
  const { session_id, data } = useSelector((state) => state.user);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (session_id) {
      api
        .get(`/account/${data.id}/favorite/movies`, {
          params: {
            session_id,
          },
        })
        .then((res) => setWatchList(res.data.results));
    }
  }, [session_id, data]);

  return (
    <Box backgroundColor="white" paddingY={10} paddingTop={9}>
      <Container maxW="container.lg">
        <Text fontSize="4xl" color="black" fontWeight="bold">
          My Favorite Movies
        </Text>
        {watchList && renderMovies(watchList)}
      </Container>
    </Box>
  );
};

export default WatchList;
