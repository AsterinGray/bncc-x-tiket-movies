import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import api from "../../../api";
import { setRequestToken, setSessionId } from "../../../store/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { request_token } = useSelector((state) => state.user);
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      toast({
        title: `Login Sukses`,
        status: "success",
        isClosable: true,
      });

      dispatch(setRequestToken(data.request_token));
      dispatch(setSessionId(sessionData.session_id));

      router.push("/profile");
    } catch (error) {
      toast({
        title: `Login Error`,
        description: `Username atau password salah`,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxW="container.xl"
      margin={0}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack
        width={{
          base: "80%",
          md: "50%",
        }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"initial"}
      >
        <VStack
          display={{
            base: "flex",
            md: "none",
          }}
          flexDirection={"column"}
          alignItems={"baseline"}
        >
          <Text color={"#2B6CB0"} fontSize={"26px"}>
            Login ke akun
          </Text>
          <Text color={"#2B6CB0"} fontWeight={"bold"} fontSize={"26px"}>
            BNCC x tiket Movies
          </Text>
        </VStack>
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
  );
};

export default LoginForm;
