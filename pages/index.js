import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Container, Grid, Heading, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import MovieCard from '../components/MovieCard'
import { SearchIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <>
      <Head>
        <title>BNCC Movies</title>
        <meta name="description" content="BNCC Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container
          maxW="container.lg"
          paddingY="24px"
          display="flex"
          justifyContent="space-between"
        >
          <Text color="#2B6CB0" fontWeight="bold">
            BNCC x tiket Movies
          </Text>
          <Text color="#2D3748" fontSize="14px" fontWeight="bold">
            Login
          </Text>
        </Container>
        <Box backgroundColor="#2B6CB0">
          <Container maxW="container.lg" paddingY="32px">
            <Heading as="h1" fontSize="36px" color="white" marginBottom="32px">
              Popular Sekarang
            </Heading>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(5, 1fr)',
              }}
              gap="12px"
            >
              <MovieCard title="Venom Let There Be Carnage" />
              <MovieCard title="Dune" />
              <MovieCard title="Free Guy" />
              <MovieCard title="The Vault" />
              <MovieCard title="Snake Eyes G.I. Joe Origins" />
            </Grid>
          </Container>
        </Box>
        <Container maxW="container.sm" paddingY="48px" centerContent>
          <Heading as="h1" color="#4A5568" marginBottom="24px">
            Cari Film
          </Heading>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search" />
            <Button backgroundColor="#2B6CB0" color="white" marginLeft="8px">
              Cari
            </Button>
          </InputGroup>
        </Container>
      </main>
    </>
  )
}
