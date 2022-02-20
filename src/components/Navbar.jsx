import { Box, Container, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import { setSessionId, setUserData } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { session_id, data } = useSelector((state) => state.user);
  const toast = useToast();

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

  const logout = async () => {
    await api.delete("/authentication/session", { data: { session_id } });
    dispatch(setSessionId(""));
    toast({
      title: "Logout Sukses",
      status: "success",
    });
  };

  return (
    <Container
      maxW="container.lg"
      paddingY={6}
      display="flex"
      justifyContent="space-between"
    >
      <Text color="#2B6CB0" fontWeight="bold">
        <Link href={"/"}>BNCC x tiket Movies</Link>
      </Text>
      {session_id ? (
        <Box display={"flex"}>
          <Text
            fontSize="14px"
            fontWeight="bold"
            color={"gray.700"}
            marginRight={"18px"}
          >
            <Link href={"/profile"}>{data.username}</Link>
          </Text>
          <Text
            fontSize="14px"
            fontWeight="bold"
            color={"red.600"}
            onClick={logout}
            cursor={"pointer"}
          >
            Logout
          </Text>
        </Box>
      ) : (
        <Text fontSize="14px" fontWeight="bold" color={"gray.700"}>
          <Link href={"/login"}>Login</Link>
        </Text>
      )}
    </Container>
  );
};

export default Navbar;
