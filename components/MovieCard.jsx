import { Box, Text } from '@chakra-ui/layout'
import Image from 'next/image'

const MovieCard = ({ title }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Image
      src={`/images/${title}.png`}
      width={250}
      height={400}
      alt={`${title} image`}
    />
    <Text textAlign="center" color="white" fontWeight="bold">
      {title}
    </Text>
  </Box>
)

export default MovieCard
