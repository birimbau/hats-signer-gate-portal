import { VStack, Text } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm, {
  EthereumAddress,
} from '../../../components/Deployers/forms/utils/ReadForm';
import { useState } from 'react';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';

const MHSG = () => {
  // Use this state for conditional rendering
  const [canAttachSafe, setCanAttachSafe] = useState<undefined | boolean>(
    undefined
  );
  // We need access to the SafeAddress that is 'Read' and validated
  const [safeAddress, setSafeAddress] = useState<EthereumAddress>('0x');

  const headerOne = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Hats Signer Gate Factory</Text>
      <Text>Select the type of Hats Signer Gate to deploy</Text>
    </VStack>
  );
  const headerTwo = () => (
    <>
      <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
        <Text as="b">Deploy Hats Signer Gate</Text>
        <Text>Input safe address, click ‘Read’</Text>
      </VStack>
    </>
  );

  const headerThree = () => (
    <>
      {canAttachSafe === false && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b" color="red">
            No the Safe cannot be Attached
          </Text>
          <Text>{safeAddress}</Text>
        </VStack>
      )}
      {canAttachSafe === true && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b" color="green">
            Safe can be attached
          </Text>
          <Text>{safeAddress}</Text>
        </VStack>
      )}
    </>
  );

  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_MHSG} />;
  const contentTwo = () => (
    <>
      {!canAttachSafe && (
        <ReadForm
          setCanAttachSafe={setCanAttachSafe}
          setSafeAddress={setSafeAddress}
          safeAddress={safeAddress}
        />
      )}
      {canAttachSafe && <>Form here</>}
    </>
  );
  const contentThree = () => (
    <>
      {canAttachSafe === undefined && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>
            This step will check if your existing safe can be attached to the
            MHSG you are creating.
          </Text>
        </VStack>
      )}
      {canAttachSafe === false && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>&lt;&lt; Check another safe address</Text>
        </VStack>
      )}
      {canAttachSafe === true && (
        // <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
        <VariableExplanations />
        // </VStack>
      )}
    </>
  );

  return (
    <MainContent
      headerOne={headerOne()}
      headerTwo={headerTwo()}
      headerThree={headerThree()}
      contentOne={contentOne()}
      contentTwo={contentTwo()}
      contentThree={contentThree()}
    />
  );
};

export default MHSG;
