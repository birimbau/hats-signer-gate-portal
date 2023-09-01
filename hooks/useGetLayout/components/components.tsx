import { VStack, Text } from '@chakra-ui/react';
import HatsSignerGateAndSafeForm from '../../../components/Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import MultiHatsSignerGateAndSafeForm from '../../../components/Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import MultiHatsSignerGateForm from '../../../components/Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import Deploy from '../../../components/MainContent/components/ContentOne/components/Deploy/Deploy';
import Button from '../../../components/UI/CustomButton/CustomButton';
import { DoubleRightOutlined } from '@ant-design/icons';

interface ComponentsP {
  [index: string]: () => {
    headerOne?: () => JSX.Element;
    headerTwo?: () => JSX.Element;
    headerThree?: () => JSX.Element;
    contentOne?: () => JSX.Element;
    contentTwo?: () => JSX.Element;
    contentThree?: () => JSX.Element;
  };
}

export const components: ComponentsP = {
  deploy: () => {
    const headerOne = () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Hats Signer Gate Factory</Text>
        <Text>Select the function to call</Text>
      </VStack>
    );
    const contentOne = () => <Deploy />;
    return {
      headerOne,
      contentOne,
    };
  },

  deploy_hsg: () => {
    const headerOne = () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
        <Text>
          You can leverage the capabilities of this dashboard for the following
          functions:
        </Text>
      </VStack>
    );
    const contentOne = () => <Deploy />;
    const contentTwo = () => <HatsSignerGateForm />;
    return {
      headerOne,
      contentOne,
      contentTwo,
    };
  },
  deploy_hsgws: () => {
    const headerOne = () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
        <Text>
          You can leverage the capabilities of this dashboard for the following
          functions:
        </Text>
      </VStack>
    );
    const contentOne = () => <Deploy />;
    const contentTwo = () => <HatsSignerGateAndSafeForm />;

    return {
      headerOne,
      contentOne,
      contentTwo,
    };
  },
  deploy_mhsg: () => {
    const headerOne = () => (
      <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
        <Text>
          You can leverage the capabilities of this dashboard for the following
          functions:
        </Text>
      </VStack>
    );
    const contentOne = () => <Deploy />;
    const contentTwo = () => <MultiHatsSignerGateForm />;
    return {
      headerOne,
      contentOne,
      contentTwo,
    };
  },
  modify: () => {
    return {
      headerOne: () => <Text as='b'>Modify</Text>,
      headerTwo: () => <Text as='b'>Modify</Text>,
      headerThree: () => <Text as='b'>Modify</Text>,
      contentOne: () => <Text as='b'>Modify</Text>,
      contentTwo: () => <Text as='b'>Modify</Text>,
      contentThree: () => <Text as='b'>Modify</Text>,
    };
  },
  view: () => {
    return {
      headerOne: () => <Text as='b'>View</Text>,
      headerTwo: () => <Text as='b'>View</Text>,
      headerThree: () => <Text as='b'>View</Text>,
      contentOne: () => <Text as='b'>View</Text>,
      contentTwo: () => <Text as='b'>View</Text>,
      contentThree: () => <Text as='b'>View</Text>,
    };
  },
  claim: () => {
    return {
      headerOne: () => <Text as='b'>Claim</Text>,
      headerTwo: () => <Text as='b'>Claim</Text>,
      headerThree: () => <Text as='b'>Claim</Text>,
      contentOne: () => <Text as='b'>Claim</Text>,
      contentTwo: () => <Text as='b'>Claim</Text>,
      contentThree: () => <Text as='b'>Claim</Text>,
    };
  },
  renounce: () => {
    return {
      headerOne: () => (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Renounce Hat, and Signer Authority on Hats App</Text>
          <Text>
            Click "Go to Hats" to be redirected, and to connect your wallet
          </Text>
        </VStack>
      ),
      contentOne: () => (
        <Button
          leftIcon={<DoubleRightOutlined />}
          onClick={() => window.open('https://app.hatsprotocol.xyz/', '_blank')}
        >
          Go to Hats App
        </Button>
      ),
      contentThree: () => (
        <>
          <Text>
            <b>Renounce Signing Authority</b> by giving up the signer hat on the
            Hats app.
          </Text>
          <Text mt={4}>
            If you decide that you no longer wish to be a signer on the safe,
            you have the option to relinquish your signing authority.
          </Text>
          <Text mt={4}>
            After Renouncing your signer Hat come back to this dashboard and
            Remove your address from the Safe to complete the process.
          </Text>
        </>
      ),
    };
  },
  remove: () => {
    return {
      headerOne: () => <Text as='b'>Remove</Text>,
      headerTwo: () => <Text as='b'>Remove</Text>,
      headerThree: () => <Text as='b'>Remove</Text>,
      contentOne: () => <Text as='b'>Remove</Text>,
      contentTwo: () => <Text as='b'>Remove</Text>,
      contentThree: () => <Text as='b'>Remove</Text>,
    };
  },
};
