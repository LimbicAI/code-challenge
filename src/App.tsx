import React from 'react'
import { Box, Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'


function App() {
  return (
    <Flex>
      <Box w="55%" h="100vh" backgroundColor="#F98BA4"></Box>
      <Flex w="45%" h="100vh" alignItems="center" justifyContent="center">
        <Flex
          shadow="2xl"
          p="12"
          width='65%'
          direction="column"
          alignItems="center"
          justifyContent="center"
          rounded={5}
        >
          <Heading mb={5}>Log in</Heading>
          <Text mb={3} textAlign="center">Please Select An Account.</Text>
            <Button colorScheme="gray" w="100%">Client</Button>
          <Stack direction='row' p={3}>
            <Divider />
            <Text>Or</Text>
            <Divider />
          </Stack>
            <Button colorScheme="gray" w="100%">Admin</Button>
        </Flex>
      </Flex>
      </Flex>
  )
}

export default App
