import { VStack, Text } from '@chakra-ui/react';
import { safe } from '../../../../pages/deploy/hsg';
import VariableExplanations from './VariableExplainations';
import TransactionDetails from './TransactionDetails';
import { DeployConfigHSG, DeployConfigMHSG } from '../types/forms';
import { EthereumAddress } from './ReadForm';
import { handleConnect } from './connectSafeToHSG';
import { AiOutlinePaperClip } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { useWaitForTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { ConsoleSqlOutlined } from '@ant-design/icons';

interface SafeInstructionsProps {
  canAttachSafe: number;
  hsgAddress: EthereumAddress | null;
  connectedAddress: EthereumAddress | undefined;
  safeType: string;
  data: any; // Adjust the type accordingly
  formData: DeployConfigHSG | DeployConfigMHSG;
  isPending: boolean;
  setIsSuccessTwo: (isSuccess: boolean) => void;
  isSuccessTwo: boolean;
  setIsPending_HsgAttachSafe: (isSuccess: boolean) => void;
  isPending_HsgAttachSafe: boolean;
}

const SafeInstructions: React.FC<SafeInstructionsProps> = ({
  canAttachSafe,
  hsgAddress,
  connectedAddress,
  safeType,
  data,
  formData,
  isPending,
  setIsSuccessTwo,
  isSuccessTwo,
  setIsPending_HsgAttachSafe,
  isPending_HsgAttachSafe,
}) => {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined
  );
  const [isSigningExecuting, setIsSigningExecuting] = useState(false);

  console.log('transactionHash INSIDE : ', transactionHash);

  const { isSuccess, isLoading, isError } = useWaitForTransaction({
    hash: transactionHash as AbiTypeToPrimitiveType<'address'>,
    onSuccess() {
      console.log('Transaction Successfulll');
    },
  });

  // After 'useWaitForTransaction' returns 'isSuccess', update the state above to render next stage
  useEffect(() => {
    console.log('isSuccessTwo: ', isSuccess);
    setIsSuccessTwo(isSuccess);
  }, [setIsSuccessTwo, isSuccess]);

  // This is used to update the parent's display status
  useEffect(() => {
    setIsPending_HsgAttachSafe(isLoading && !!transactionHash);
  }, [isLoading, setIsPending_HsgAttachSafe, transactionHash]);

  // // This is used to update the parent's display status
  // useEffect(() => {
  //   setIsSigningExecuting(false);
  // }, [isError, setIsSigningExecuting]);

  console.log('!!transactionHash', !!transactionHash);

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
            leftIcon={<AiOutlinePaperClip />}
            isDisabled={!connectedAddress || isSigningExecuting}
            onClick={() => {
              setIsSigningExecuting(true);
              if (connectedAddress && hsgAddress) {
                handleConnect(
                  hsgAddress,
                  connectedAddress,
                  formData._safe,
                  setTransactionHash,
                  setIsSigningExecuting
                );
              }
            }}
          >
            Attach {safeType} to Safe
          </Button>
          <br></br>
          <br></br>

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
      {!isPending &&
        isSuccessTwo &&
        transactionHash &&
        !isPending_HsgAttachSafe && (
          <TransactionDetails
            data={data}
            transactionHash={transactionHash}
            formData={formData}
          />
        )}
    </>
  );
};

export default SafeInstructions;
