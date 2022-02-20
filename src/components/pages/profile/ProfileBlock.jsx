import {
  Avatar,
  Container,
  Center,
  Divider,
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

const ProfileBlock = () => {
  const { data } = useSelector((state) => state.user);

  return (
    <>
      <Box backgroundColor="#2B6CB0">
        <Container
          maxW="container.lg"
          paddingY={10}
          display="flex"
          flexDirection="row"
        >
          <Avatar
            size="2xl"
            src={`https://image.tmdb.org/t/p/original/${data.avatar}`}
          />
          <Text fontSize="4xl" color="white" fontWeight="bold" paddingX={4}>
            {data.username}
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default ProfileBlock;
