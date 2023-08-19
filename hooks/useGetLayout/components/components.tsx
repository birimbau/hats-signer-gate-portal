import { VStack, Text } from '@chakra-ui/react';
import HatsSignerGateAndSafeForm from '../../../components/Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import MultiHatsSignerGateAndSafeForm from '../../../components/Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import MultiHatsSignerGateForm from '../../../components/Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import Deploy from '../../../components/MainContent/components/ContentOne/components/Deploy/Deploy';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import { HEADER_ACTIONS } from '../../../context/SelectedActionContext';
import { ComponentsP } from '../types';

export const components: ComponentsP = {
  [HEADER_ACTIONS.DEPLOY]: {
    headerOne: () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Hats Signer Gate Factory</Text>
        <Text>Select the function to call</Text>
      </VStack>
    ),
    contentOne: () => <Deploy />,
    [DEPLOY_ACTIONS.DEPLOY_HSG]: {
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
      contentTwo: () => <HatsSignerGateForm />,
    },
    [DEPLOY_ACTIONS.DEPLOY_HSG_W_S]: {
      headerOnde: () => (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      ),
      contentOne: () => <Deploy />,
      contentTwo: () => <HatsSignerGateAndSafeForm />,
    },
    [DEPLOY_ACTIONS.DEPLOY_MHSG]: {
      headerOne: () => (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      ),
      contentOne: () => <Deploy />,
      contentTwo: () => <MultiHatsSignerGateForm />,
    },
    [DEPLOY_ACTIONS.DEPLOY_MHSG_W_S]: {
      headerOne: () => (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      ),
      contentOne: () => <Deploy />,
      contentTwo: () => <MultiHatsSignerGateAndSafeForm />,
    },
  },
  [HEADER_ACTIONS.MODIFY]: {},
  [HEADER_ACTIONS.VIEW]: {},
  [HEADER_ACTIONS.CLAIM]: {},
  [HEADER_ACTIONS.RENOUNCE]: {},
  [HEADER_ACTIONS.REMOVE]: {},
};
