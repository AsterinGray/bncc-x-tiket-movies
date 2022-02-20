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
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Text fontSize="4xl" color="white" fontWeight="bold" paddingX={4}>
                {data.username}
              </Text>
              <Text
                fontSize="xl"
                color="white"
                fontStyle="italic"
                paddingTop={5}
                opacity="0.6"
              >
                Member since June 2018
              </Text>
            </Box>
            <Box>
              <StatGroup>
                <Stat paddingLeft={5}>
                  <StatLabel color="white" fontSize="xl">
                    Your Activity
                  </StatLabel>
                  <Box display="flex" flexDirection="row">
                    <StatNumber color="white">100</StatNumber>
                    <Text
                      fontSize="xl"
                      color="white"
                      paddingTop={1}
                      paddingLeft={2}
                    >
                      Movie
                    </Text>
                  </Box>
                  <StatHelpText>
                    <Box display="flex" flexDirection="row">
                      <StatArrow type="increase" />
                      <Text color="white" opacity="0.8">
                        23.36%
                      </Text>
                    </Box>
                    <Text color="white" opacity="0.6">
                      than last week
                    </Text>
                  </StatHelpText>
                </Stat>
                <Center paddingTop={5} height="16">
                  <Divider orientation="vertical" />
                </Center>
                <Stat paddingLeft={"16"}>
                  <StatLabel color="white" fontSize="xl">
                    Average Movie
                  </StatLabel>
                  <StatLabel paddingLeft={8} color="white" fontSize="xl">
                    Rating
                  </StatLabel>
                  <CircularProgress
                    paddingTop={2}
                    paddingLeft={9}
                    value={80}
                    color="green.300"
                  >
                    <CircularProgressLabel
                      paddingTop={2}
                      paddingLeft={9}
                      color="white"
                    >
                      80%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Stat>
              </StatGroup>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfileBlock;
