import React from 'react';
// import Head from 'next/head';

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Box
        as="h2"
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Survey App
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Box
          px={{ base: 4, md: 8 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
          textAlign={'center'}
        >
          <Box fontSize={'2xl'} fontWeight={'medium'} mb="2">
            Go to Survey
          </Box>
          <Link to="/survey">
            <Button colorScheme="blue">Survey</Button>
          </Link>
        </Box>
        <Box
          px={{ base: 4, md: 8 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
          textAlign={'center'}
        >
          <Box fontSize={'2xl'} fontWeight={'medium'} mb="2">
            Go To Admin Page
          </Box>
          <Link to="/admin">
            <Button colorScheme="blue">Admin</Button>
          </Link>
        </Box>
        <Box
          px={{ base: 4, md: 8 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
          textAlign={'center'}
        >
          <Box fontSize={'2xl'} fontWeight={'medium'} mb="2">
            Go Back Home
          </Box>
          <Link to="/">
            <Button colorScheme="blue">Home</Button>
          </Link>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
