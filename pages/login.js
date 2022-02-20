import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";

import api from "../src/api";
import { setRequestToken, setSessionId } from "../src/store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { request_token } = useSelector((state) => state.user);
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRequestToken = async () => {
      const { data } = await api.get("/authentication/token/new");
      dispatch(setRequestToken(data.request_token));
    };

    getRequestToken();
  }, [dispatch]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post(
        "/authentication/token/validate_with_login",
        { username, password, request_token }
      );
      const { data: sessionData } = await api.post(
        "/authentication/session/new",
        { request_token }
      );

      dispatch(setRequestToken(data.request_token));
      dispatch(setSessionId(sessionData.session_id));
      toast({
        title: `Login Sukses`,
        status: "success",
        isClosable: true,
      });

      router.push("/profile");
    } catch (error) {
      toast({
        title: `Login Error`,
        description: `Username atau password salah`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      width={"100vw"}
      minHeight={"100vh"}
    >
      <Container
        maxW="container.xl"
        margin={0}
        backgroundColor="#2B6CB0"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <VStack
          display={"flex"}
          flexDirection={"column"}
          alignItems={"baseline"}
        >
          <Text color={"white"} fontSize={"26px"}>
            Login ke akun
          </Text>
          <Text color={"white"} fontWeight={"bold"} fontSize={"26px"}>
            BNCC x tiket Movies
          </Text>
        </VStack>
        <Text position={"absolute"} left={"64px"} top={"64px"} color={"white"}>
          <Link href="/">
            <a>
              <ChevronLeftIcon /> Kembali ke beranda
            </a>
          </Link>
        </Text>
      </Container>
      <Container
        maxW="container.xl"
        margin={0}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <VStack
          width={"50%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"initial"}
        >
          <form onSubmit={(e) => onFormSubmit(e)}>
            <FormControl mt={4}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              backgroundColor={"#2B6CB0"}
              color={"white"}
              mt={4}
              type="submit"
              isLoading={isLoading}
              width={"100%"}
            >
              Login
            </Button>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default Login;
