import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import All from '../All/All';
import Deployers from '../Deployers/Deployers';
import Owners from '../Owners/Owners';
import Signers from '../Signers/Signers';

const Content = () => {
  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>Hat Wearers / Signers</Tab>
          <Tab>Deployers</Tab>
          <Tab>Owners</Tab>
          <Tab>All</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Signers />
          </TabPanel>
          <TabPanel>
            <Deployers />
          </TabPanel>
          <TabPanel>
            <Owners />
          </TabPanel>
          <TabPanel>
            <All />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Content;
