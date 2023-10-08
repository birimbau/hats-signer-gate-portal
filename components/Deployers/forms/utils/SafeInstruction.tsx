import { VStack, Text, Button } from '@chakra-ui/react';
import { safe } from '../../../../pages/deploy/hsg';
import VariableExplanations from './VariableExplainations';
import TransactionDetails from './TransactionDetails';
import { DeployConfigHSG, DeployConfigMHSG } from '../types/forms';
import { EthereumAddress } from './ReadForm';
import { handleConnect } from './connectSafeToHSG';

interface SafeInstructionsProps {
  canAttachSafe: number;
  hsgAddress: EthereumAddress | null;
  connectedAddress: EthereumAddress | undefined;
  safeType: string;
  data: any; // Adjust the type accordingly
  transactionData: any; // Adjust the type accordingly
  formData: DeployConfigHSG | DeployConfigMHSG;
  isPending: boolean;
  setIsSuccessTwo: (isSuccess: boolean) => void;
  isSuccessTwo: boolean;
}

const SafeInstructions: React.FC<SafeInstructionsProps> = ({
  canAttachSafe,
  hsgAddress,
  connectedAddress,
  safeType,
  data,
  transactionData,
  formData,
  isPending,
  setIsSuccessTwo,
  isSuccessTwo,
}) => {
  return (
    <>
      {canAttachSafe === safe.UNSET && (
        <VStack
          justifyContent="flex-start"
          height="100%"
          alignItems="flex-start"
        >
          <Text>
            This step will check if your existing safe can be attached to the
            {safeType} you are creating.
          </Text>
        </VStack>
      )}
      {canAttachSafe === safe.CANNOT_ATTACH && (
        <VStack
          justifyContent="flex-start"
          height="100%"
          alignItems="flex-start"
        >
          <br></br>

          <Text>&lt;&lt; Check another safe address</Text>
        </VStack>
      )}
      {canAttachSafe === safe.INVALID_ADDRESS && (
        <VStack
          justifyContent="flex-start"
          height="100%"
          alignItems="flex-start"
        >
          <br></br>
          <Text>&lt;&lt; Check a valid safe address</Text>
        </VStack>
      )}
      {canAttachSafe === safe.CAN_ATTACH && !hsgAddress && !isPending && (
        <VariableExplanations />
      )}
      {canAttachSafe === safe.CAN_ATTACH && hsgAddress && !isSuccessTwo && (
        <>
          <Button
            isDisabled={!connectedAddress}
            onClick={() => {
              if (connectedAddress && hsgAddress) {
                handleConnect(
                  hsgAddress,
                  connectedAddress,
                  formData._safe,
                  setIsSuccessTwo
                );
              }
            }}
            width={'140px'}
          >
            Attach {safeType} to Safe
          </Button>
          <>
            <Text>
              Now that the {safeType} has successfully been created, it needs to
              be attached to the Safe via the following batched multisend
              transaction:
            </Text>
            <Text>Approve the {safeType} address as a module on the Safe.</Text>
            <Text>
              Approve the {safeType} address as the guard on the Safe.
            </Text>
            <br />
            <Text>
              This is a multisig transaction needing the required number of
              signers to execute. This step initiates the transaction with you
              as first signer.
            </Text>
          </>
        </>
      )}
      {!isPending && isSuccessTwo && (
        <TransactionDetails
          data={data}
          transactionData={transactionData}
          formData={formData}
        />
      )}
    </>
  );
};

export default SafeInstructions;
