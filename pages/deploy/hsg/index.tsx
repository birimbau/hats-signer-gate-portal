import { VStack, Text, Button } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm, {
  EthereumAddress,
} from '../../../components/Deployers/forms/utils/ReadForm';
import { useState } from 'react';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';
import { DeployConfigHSG } from '../../../components/Deployers/forms/types/forms';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import { SafeAttachMessage } from '../../../components/Deployers/forms/utils/SafeAttachMessage';
import { useAccount } from 'wagmi';
import { handleConnect } from '../../../components/Deployers/forms/utils/connectSafeToHSG';

export enum safe {
  UNSET = 1,
  INVALID_ADDRESS = 2,
  CANNOT_ATTACH = 3,
  CAN_ATTACH = 4,
}

const HSG = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<DeployConfigHSG>({
    _ownerHatId: '',
    _signerHatId: '',
    _safe: '0x',
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
  });

  // This is extracted form the HSG factory response and connected to the existing safe
  const [hsgAddress, setHsgAddress] = useState<EthereumAddress | null>(null);

  // Use this state for conditional rendering
  const [canAttachSafe, setCanAttachSafe] = useState(safe.UNSET);

  const { address: connectedAddress } = useAccount();

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

  const headerThree = () =>
    !isPending && ( // Loading state ensures the message refreshes correctly
      <>
        {canAttachSafe === safe.CANNOT_ATTACH && (
          <SafeAttachMessage
            text="This safe cannot be attached"
            color="red"
            safeData={formData._safe}
          />
        )}
        {canAttachSafe === safe.INVALID_ADDRESS && (
          <SafeAttachMessage
            text="This is not a valid safe address"
            color="red"
            safeData={formData._safe}
          />
        )}
        {canAttachSafe === safe.CAN_ATTACH && (
          <SafeAttachMessage
            text="Safe can be attached"
            color="green"
            safeData={formData._safe}
          />
        )}
      </>
    );

  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_HSG} />;
  const contentTwo = () => (
    <>
      {(canAttachSafe === safe.UNSET ||
        canAttachSafe === safe.CANNOT_ATTACH ||
        canAttachSafe === safe.INVALID_ADDRESS) && (
        <ReadForm
          setCanAttachSafe={setCanAttachSafe}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {canAttachSafe === safe.CAN_ATTACH && (
        <HatsSignerGateForm
          setIsPending={setIsPending}
          isPending={isPending}
          setFormData={setFormData}
          formData={formData}
          setHsgAddress={setHsgAddress}
        />
      )}
    </>
  );
  const contentThree = () => (
    <>
      {canAttachSafe === safe.UNSET && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>
            This step will check if your existing safe can be attached to the
            HSG you are creating.
          </Text>
        </VStack>
      )}
      {(canAttachSafe === safe.CANNOT_ATTACH ||
        canAttachSafe === safe.INVALID_ADDRESS) && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>&lt;&lt; Check another safe address</Text>
        </VStack>
      )}
      {canAttachSafe === safe.CAN_ATTACH && !hsgAddress && (
        <VariableExplanations />
      )}
      {canAttachSafe === safe.CAN_ATTACH && hsgAddress && (
        <>
          <Button
            onClick={() => {
              if (connectedAddress && hsgAddress) {
                console.log('connectedAdrress: ', connectedAddress);
                console.log('EXISTING_HSG_ADDRESS: ', hsgAddress);
                handleConnect(hsgAddress, connectedAddress);
              }
            }}
            width={'140px'}
          >
            Attach HSG to Safe
          </Button>
        </>
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

export default HSG;
