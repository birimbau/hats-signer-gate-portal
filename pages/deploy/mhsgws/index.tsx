import { VStack, Text } from '@chakra-ui/react';
import MultiHatsSignerGateAndSafeForm from '../../../components/Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import Deploy from '../../../components/MainContent/components/ContentOne/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';

const MHSGWS = () => {
  return (
    <MainContent
      headerOne={
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      }
      contentOne={
        <Deploy selectedDeployAction={DEPLOY_ACTIONS.DEPLOY_MHSG_W_S} />
      }
      contentTwo={<MultiHatsSignerGateAndSafeForm />}
    />
  );
};

export default MHSGWS;
