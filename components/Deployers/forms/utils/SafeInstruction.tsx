import { VStack, Text, Button } from '@chakra-ui/react';
import { safe } from '../../../../pages/deploy/hsg';
import VariableExplanations from './VariableExplainations';
import TransactionDetails from './TransactionDetails';
import {
  DeployConfigHSG_String,
  DeployConfigMHSG_String,
} from '../types/forms';
import { EthereumAddress } from './ReadForm';

interface SafeInstructionsProps {
  canAttachSafe: number;
  hsgAddress: EthereumAddress | null;
  connectedAddress: EthereumAddress | undefined;
  handleConnect: (
    hsgAddress: EthereumAddress,
    connectedAddress: EthereumAddress,
    setIsSuccessTwo: (isSuccess: boolean) => void
  ) => void;
  safeType: string;
  data: any; // Adjust the type accordingly
  transactionData: any; // Adjust the type accordingly
  formData: DeployConfigHSG_String | DeployConfigMHSG_String;
  isPending: boolean;
  setIsSuccessTwo: (isSuccess: boolean) => void;
}

const SafeInstructions: React.FC<SafeInstructionsProps> = ({
  canAttachSafe,
  hsgAddress,
  connectedAddress,
  handleConnect,
  safeType,
  data,
  transactionData,
  formData,
  isPending,
  setIsSuccessTwo,
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
      {canAttachSafe === safe.CAN_ATTACH && hsgAddress && (
        <>
          <Button
            isDisabled={!connectedAddress}
            onClick={() => {
              if (connectedAddress && hsgAddress) {
                handleConnect(hsgAddress, connectedAddress, setIsSuccessTwo);
              }
            }}
            width={'140px'}
          >
            Attach {safeType} to Safe
          </Button>
          <>
            <Text>
              Two transactions will get batched via multisend, and those
              transactions will be created on the safe:
            </Text>
            <Text>Approve the {safeType} address as a module on the Safe.</Text>
            <Text>
              Approve the {safeType} address as the guard on the Safe.
            </Text>
            <br />
            <Text>Multisig signers must execute these transactions.</Text>
          </>
        </>
      )}
      {data && !isPending && (
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
