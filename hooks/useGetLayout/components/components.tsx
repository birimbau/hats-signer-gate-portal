import { VStack, Text } from '@chakra-ui/react';
import HatsSignerGateAndSafeForm from '../../../components/Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import MultiHatsSignerGateAndSafeForm from '../../../components/Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import MultiHatsSignerGateForm from '../../../components/Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import Deploy from '../../../components/MainContent/components/ContentOne/components/Deploy/Deploy';

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
      contentTwo: () => <HatsSignerGateForm />,
    },
    hsgws: {
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
    mhsg: {
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
    mhsgws: {
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
  modify: {},
  view: {},
  claim: {},
  renounce: {},
  remove: {},
};
