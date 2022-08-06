import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
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
      <Tabs isFitted isLazy={true}>
        <TabList mb="1em">
          <Tab>Questions</Tab>
          <Tab>Clients</Tab>
          <Tab>Client Answers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel isLazy>
            <p>tab one!</p>
          </TabPanel>
          <TabPanel isLazy>
            <p> tab two!</p>
          </TabPanel>
          <TabPanel isLazy>
            <p> tab three</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
