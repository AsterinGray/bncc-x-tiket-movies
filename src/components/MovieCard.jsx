import { Box, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'

const MovieCard = ({ title, link = '/movie', image }) => (
  <Link href={link} passHref>
    <a>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          width={280}
          height={400}
          alt={`${title} image`}
        />
        <Text textAlign="center" color="white" fontWeight="bold">
          {title}
        </Text>
      </Box>
    </a>
  </Link>
)

export default MovieCard
