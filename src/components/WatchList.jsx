import { 
    Container, 
    Text, 
    Box, 
    Grid 
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import { renderMovies } from "/src/utils/index";
import { setUserData } from "../store/userSlice";

const WatchList = () => {
    const dispatch = useDispatch();
    const { session_id, data } = useSelector((state) => state.user);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
          if (session_id) {
            const { data } = await api.get("/account", {
              params: {
                session_id,
              },
            });
            dispatch(setUserData(data));
          }
        };

        getProfile();
      }, [session_id, dispatch]);


    useEffect(() => {
        api.get(`/account/${data.id}/favorite/movies`, {
            params: {
                session_id,
              },
        }).then((res) => setWatchList(res.data.results));
    }, []);

    const renderWatchList = () => {
        return renderMovies(watchList);
    }

    return (
        <>
        <Box backgroundColor="white" paddingY={10} paddingTop={9}>
            <Container maxW="container.xl">
                <Text fontSize="4xl" color="black" fontWeight="bold">My Favorite Movies</Text>
                <Grid>
                    {watchList && renderWatchList()}
                </Grid>
            </Container>
        </Box>
        </>
    );
};

export default WatchList;