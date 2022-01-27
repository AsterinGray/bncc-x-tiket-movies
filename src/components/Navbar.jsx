import { Container, Text } from '@chakra-ui/react'
import Link from 'next/link'

const Navbar = () => (
  <Container
    maxW="container.lg"
    paddingY="24px"
    display="flex"
    justifyContent="space-between"
  >
    <Text color="#2B6CB0" fontWeight="bold">
      <Link href={'/'}>BNCC x tiket Movies</Link>
    </Text>
    <Text color={'#2D3748'} fontSize="14px" fontWeight="bold">
      <Link href={'/login'}>Login</Link>
    </Text>
  </Container>
)

export default Navbar
