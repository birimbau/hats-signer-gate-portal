import { VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import HatsSignerGateAndSafeForm from '../../../components/Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import Button from '../../../components/UI/CustomButton/CustomButton';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import { FiCopy } from 'react-icons/fi';
import { BsCardList, BsSafe } from 'react-icons/bs';
import { getBlockExplorerUrl } from '../../../utils/utils';
import { useNetwork } from 'wagmi';
import { DeployConfigHSG_String } from '../../../components/Deployers/forms/types/forms';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';

const HSGWF = () => {
  const { chain } = useNetwork();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [formData, setFormData] = useState<DeployConfigHSG_String>({
    _ownerHatId: '',
    _signerHatId: '',
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
  });
  const [transactionData, setTransactionData] = useState(undefined);
  const headerOne = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Hats Signer Gate Factory HSGWS</Text>
      <Text>Select the type of Hats Signer Gate to deploy</Text>
    </VStack>
  );
  const headerTwo = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Deploy Hats Signer Gate + Safe</Text>
      <Text>Enter inputs, click ‘Deploy’</Text>
    </VStack>
  );
  const headerThree = () => (
    <>
      {isPending && <Text as="b">Transaction Pending...</Text>}
      {data && !isPending && <Text as="b">Transaction Complete</Text>}
    </>
  );
  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_HSG_W_S} />;
  const contentTwo = () => (
    <HatsSignerGateAndSafeForm
      setIsPending={setIsPending}
      setData={setData}
      setTransactionData={setTransactionData}
      formData={formData}
      setFormData={setFormData}
      isPending={isPending}
    />
  );

  const contentThree = () => (
    <>
      {!isPending && !data && <VariableExplanations />}
      {data && !isPending && (
        <VStack height="100%" alignItems="flex-start" gap={'24px'}>
          <Button
            leftIcon={<FiCopy />}
            onClick={() => {
              window.open(
                `${getBlockExplorerUrl(chain?.id || 1)}/tx/${
                  (transactionData as unknown as { transactionHash: string })
                    .transactionHash
                }`
              );
            }}
          >
            View Transaction
          </Button>
          <Button
            leftIcon={<BsCardList />}
            onClick={() => {
              window.open(
                `${getBlockExplorerUrl(chain?.id || 1)}/address/${
                  (data as unknown as { _hatsSignerGate: string })
                    ._hatsSignerGate
                }#writeContract`
              );
            }}
          >
            View HSG Contract
          </Button>
          <Button
            leftIcon={<BsSafe />}
            onClick={() => {
              window.open(
                `https://app.safe.global/home?safe=gor:${(
                  data as unknown as { _safe: string }
                )._safe!}`
              );
            }}
          >
            View Safe
          </Button>
          <Text>
            Min Threshold = {formData._minThreshold}
            <br />
            Max Threshold = {formData._targetThreshold}
            <br />
            Max Signers = {formData._maxSigners}
          </Text>
          <Text>
            The Safe owner you see listed at app.safe.global is the new Hats
            Signer Gate contract you deployed. This signer will be replaced as
            soon as an authorized hat wearer claims signing authority for the
            first time.
          </Text>
        </VStack>
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

export default HSGWF;
