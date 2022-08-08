import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './boiler-plate/ColorModeSwitcher';
import { Link, Routes, Route } from 'react-router-dom';

import { Logo } from './boiler-plate/Logo';
import HomePage from './views/HomePage';
// import QuestionsListingPage from './views/QuestionsListingPage';
import SurveyPage from './views/SurveyPage';
import AdminPage from './views/Admin/index';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid> */}
      </Box>
      <Box p={5}>
        <div className="App">
          {/* <h1>Welcome to React Router!</h1>
          <Link to="/survey">
            <Button colorScheme="blue">Survey</Button>
          </Link>
          <Link to="/questions">
            <Button colorScheme="blue">Questions</Button>
          </Link>
          <Link to="/">
            <Button colorScheme="blue">Home</Button>
          </Link> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="survey" element={<SurveyPage />} />
            {/* <Route path="questions" element={<QuestionsListingPage />} /> */}
            <Route path="admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Box>
    </ChakraProvider>
  );
}
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">
          <Button colorScheme="blue">About</Button>
        </Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">
          <Button colorScheme="blue">Home</Button>
        </Link>
      </nav>
    </>
  );
}
export default App;
