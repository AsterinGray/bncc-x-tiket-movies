import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Container, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const AsideInfo = () => (
  <Container
    maxW="container.xl"
    margin={0}
    backgroundColor="#2B6CB0"
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <VStack display={"flex"} flexDirection={"column"} alignItems={"baseline"}>
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
);

export default AsideInfo;
