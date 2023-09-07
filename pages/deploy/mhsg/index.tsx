import { VStack, Text } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm from './components/ReadForm/ReadForm';

const MHSG = () => {
  const headerOne = () => (
    <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
      <Text as='b'>Hats Signer Gate Factory</Text>
      <Text>Select the type of Hats Signer Gate to deploy</Text>
    </VStack>
  );
  const headerTwo = () => (
    <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
      <Text as='b'>Deploy Hats Signer Gate</Text>
      <Text>Input safe address, click ‘Read’</Text>
    </VStack>
  );
  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_MHSG} />;
  const contentTwo = () => <ReadForm />;
  return (
    <MainContent
      headerOne={headerOne()}
      headerTwo={headerTwo()}
      contentOne={contentOne()}
      contentTwo={contentTwo()}
    />
  );
};

export default MHSG;
