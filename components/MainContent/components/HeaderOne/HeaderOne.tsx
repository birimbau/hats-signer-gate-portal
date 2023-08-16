import { VStack, Text } from '@chakra-ui/react';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';

const HeaderOne = () => {
  const { selected } = useSelectedActionContext();

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Hats Signer Gate Factory</Text>
          <Text>Select the function to call</Text>
        </VStack>
      );
    case HEADER_ACTIONS.CLAIM:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Claim Signing Authority</Text>
          <Text>Connect wallet with relevant hat, click {`'Fetch'`}</Text>
        </VStack>
      );
    case HEADER_ACTIONS.RENOUNCE:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Renounce Hat, and Signer Authority on Hats App</Text>
          <Text>
            Click {`'Go to Hats'`} to be redirected, and to connect your wallet
          </Text>
        </VStack>
      );
    case HEADER_ACTIONS.REMOVE:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Remove Signer</Text>
          <Text>Connect any wallet, Click {`'Fetch'`}</Text>
        </VStack>
      );
    case HEADER_ACTIONS.REVISE:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Revise Hats Signer Gate Contract</Text>
          <Text>Connect owner wallet, click {`'Fetch'`}</Text>
        </VStack>
      );
    case HEADER_ACTIONS.VIEW:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>View Configuration for Hats Signer Gate Contract</Text>
          <Text>Connect any wallet, click {`'Read'`}</Text>
        </VStack>
      );
    case undefined:
    default:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      );
  }
};

export default HeaderOne;
