import { VStack, Text } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm, {
  EthereumAddress,
} from '../../../components/Deployers/forms/utils/ReadForm';
import { useState } from 'react';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';
import MultiHatsSignerGateForm from '../../../components/Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import { DeployConfigMHSG } from '../../../components/Deployers/forms/types/forms';
import { safe } from '../hsg';
import { SafeAttachMessage } from '../../../components/Deployers/forms/utils/SafeAttachMessage';
import SafeInstructions from '../../../components/Deployers/forms/utils/SafeInstruction';
import { useAccount } from 'wagmi';

const MHSG = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPending_HsgAttachSafe, setIsPending_HsgAttachSafe] =
    useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [formData, setFormData] = useState<DeployConfigMHSG>({
    _ownerHatId: '',
    _signersHatIds: [''],
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
    _safe: '0x',
  });

  // This is extracted form the HSG factory response and connected to the existing safe
  const [hsgAddress, setHsgAddress] = useState<EthereumAddress | null>(null);

  const [isSuccessOne, setIsSuccessOne] = useState(false);
  const [isSuccessTwo, setIsSuccessTwo] = useState(false);

  const [transactionHash, setTransactionHash] = useState(undefined);

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
        <Text as="b">Deploy Multi Hats Signer Gate</Text>
        <Text>Input safe address, click ‘Read’</Text>
      </VStack>
    </>
  );

  const headerThree = () => {
    // Initial phases of reading the Safe address
    if (!isPending && !hsgAddress) {
      if (canAttachSafe === safe.CANNOT_ATTACH) {
        return (
          <SafeAttachMessage
            text="This safe cannot be attached"
            color="red"
            safeData={formData._safe}
          />
        );
      } else if (canAttachSafe === safe.INVALID_ADDRESS) {
        return (
          <SafeAttachMessage
            text="This is not a valid safe address"
            color="red"
            safeData={formData._safe}
          />
        );
      } else if (canAttachSafe === safe.CAN_ATTACH) {
        return (
          <SafeAttachMessage
            text="Safe can be attached"
            color="green"
            safeData={formData._safe}
          />
        );
      }
    }

    // Secondary phase, during transaction
    if (isPending && !hsgAddress)
      return (
        <SafeAttachMessage
          text="Transaction pending..."
          color="black"
          safeData=""
        />
      );

    // Third phase - if a hsgAddress exists, it's been successfully extracted from the HSGfactory response -> so display next stage.
    if (hsgAddress && isSuccessOne && !isSuccessTwo && !isPending_HsgAttachSafe)
      return (
        <SafeAttachMessage
          text="HSG Created"
          color="black"
          safeData='Click "Attach HSG to Safe"'
        />
      );

    // Fourth phase - transaction complete
    if (isPending_HsgAttachSafe && !isSuccessTwo)
      return (
        <SafeAttachMessage
          text="Attaching HSG to Safe..."
          color="black"
          safeData=""
        />
      );
    // Fifth phase - transaction complete
    if (isSuccessTwo && !isPending_HsgAttachSafe)
      return (
        <SafeAttachMessage
          text="Transaction Complete"
          color="black"
          safeData=""
        />
      );

    return null; // Default return if none of the conditions above are met
  };

  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_MHSG} />;
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
      {canAttachSafe === safe.CAN_ATTACH && !isSuccessTwo && (
        <MultiHatsSignerGateForm
          setIsPending={setIsPending}
          setData={setData}
          setTransactionHash={setTransactionHash}
          formData={formData}
          setFormData={setFormData}
          isPending={isPending}
          setIsSuccessOne={setIsSuccessOne}
          setHsgAddress={setHsgAddress}
        />
      )}
    </>
  );
  const contentThree = () => (
    <SafeInstructions
      canAttachSafe={canAttachSafe}
      hsgAddress={hsgAddress}
      connectedAddress={connectedAddress}
      safeType="MHSG"
      data={data}
      formData={formData}
      isPending={isPending}
      setIsSuccessTwo={setIsSuccessTwo}
      isSuccessTwo={isSuccessTwo}
      setIsPending_HsgAttachSafe={setIsPending_HsgAttachSafe}
      isPending_HsgAttachSafe={isPending_HsgAttachSafe}
    />
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
