import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Container, Grid, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import MovieCard from '../src/components/MovieCard'
import { SearchIcon } from '@chakra-ui/icons'
import Navbar from '../src/components/Navbar'

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  )
  const data = await res.json()
  return {
    props: { data },
  }
}

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>BNCC Movies</title>
        <meta name="description" content="BNCC Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Box backgroundColor="#2B6CB0">
          <Container maxW="container.lg" paddingY="32px">
            <Heading as="h1" fontSize="36px" color="white" marginBottom="32px">
              Popular Sekarang
            </Heading>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
              columnGap="12px"
              rowGap={`24px`}
            >
              {data.results.map((result) => (
                <MovieCard
                  key={result.id}
                  title={result.title}
                  link={String(result.id)}
                  image={result.poster_path}
                />
              ))}
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

export default Home
