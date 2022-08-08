import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  Button,
} from '@chakra-ui/react';
import Questions from './Questions';
import ClientsAnswers from './ClientsAnswers';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <Box
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'gray.800'}
      rounded={'lg'}
      minHeight={'500px'}
      p={5}
    >
      <Flex justify="end">
        <Link to="/">
          <Button colorScheme="blue">Go Back</Button>
        </Link>
      </Flex>
      <Tabs isFitted isLazy>
        <TabList mb="1em">
          <Tab>Questions</Tab>
          <Tab>Client Answers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Questions />
          </TabPanel>
          <TabPanel>
            <ClientsAnswers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
