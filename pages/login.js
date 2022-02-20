import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../src/api";
import AsideInfo from "../src/components/pages/login/AsideInfo";
import LoginForm from "../src/components/pages/login/LoginForm";
import { setRequestToken } from "../src/store/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getRequestToken = async () => {
      const { data } = await api.get("/authentication/token/new");
      dispatch(setRequestToken(data.request_token));
    };

    getRequestToken();
  }, [dispatch]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      width={"100vw"}
      minHeight={"100vh"}
    >
      <AsideInfo />
      <LoginForm />
    </Box>
  );
};

export default Login;
