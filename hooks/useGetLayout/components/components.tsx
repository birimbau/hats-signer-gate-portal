import { VStack, Text } from '@chakra-ui/react';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import Deploy from '../../../components/MainContent/components/ContentOne/components/Deploy/Deploy';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';

export const components = {
  deploy: {
    headerOne: () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Hats Signer Gate Factory</Text>
        <Text>Select the function to call</Text>
      </VStack>
    ),
    contentOne: () => <Deploy />,
    hsg: {
      headerOne: () => () =>
        (
          <VStack
            justifyContent='flex-end'
            height='100%'
            alignItems='flex-start'
          >
            <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
            <Text>
              You can leverage the capabilities of this dashboard for the
              following functions:
            </Text>
          </VStack>
        ),
      contentOne: () => <Deploy />,
      contetnTwo: () => <HatsSignerGateForm />,
    },
    hsgwf: {},
    mhsg: {},
    mhsgwf: {},
  },

  modify: {},
  view: {},
  claim: {},
  renounce: {},
  remove: {},
};
