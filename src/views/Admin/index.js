import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import Questions from './Questions';
import Clients from './Clients';
import ClientsAnswers from './ClientsAnswers';
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
      <Tabs isFitted isLazy>
        <TabList mb="1em">
          <Tab>Questions</Tab>
          <Tab>Clients</Tab>
          <Tab>Client Answers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Questions />
          </TabPanel>
          <TabPanel>
            <Clients />
          </TabPanel>
          <TabPanel>
            <ClientsAnswers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
