import { VStack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Deploy from '../../components/MainContent/components/ContentOne/components/Deploy/Deploy';
import MainContent from '../../components/MainContent/MainContent';

const DeployPage: NextPage = () => {
  return (
    <MainContent
      headerOne={
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Hats Signer Gate Factory</Text>
          <Text>Select the function to call</Text>
        </VStack>
      }
      contentOne={<Deploy />}
    ></MainContent>
  );
};

export default DeployPage;
