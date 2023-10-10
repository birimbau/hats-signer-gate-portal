import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { BsCardList, BsSafe } from 'react-icons/bs';
import { useNetwork } from 'wagmi';
import {
  getBlockExplorerUrl,
  getSafeAppUrlPrefix,
} from '../../../../utils/utils';
import {
  DeployConfigHSG,
  DeployConfigHSGWF,
  DeployConfigMHSG,
  DeployConfigMHSGWF,
} from '../types/forms';
import Button from '../../../UI/CustomButton/CustomButton';

interface TransactionDetailsProps {
  type: string;
  data: any; // TODO
  transactionHash: string;
  formData:
    | DeployConfigHSG
    | DeployConfigHSGWF
    | DeployConfigMHSG
    | DeployConfigMHSGWF;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  type,
  data,
  transactionHash,
  formData,
}) => {
  const { chain } = useNetwork();

  return (
    <VStack height="100%" alignItems="flex-start" gap={'24px'}>
      <Button
        leftIcon={<FiCopy />}
        minWidth={'60%'}
        onClick={() => {
          window.open(
            `${getBlockExplorerUrl(chain?.id)}/tx/${transactionHash}`
          );
        }}
      >
        View Transaction
      </Button>
      <Button
        leftIcon={<BsCardList />}
        minWidth={'60%'}
        onClick={() => {
          window.open(
            `${getBlockExplorerUrl(chain?.id)}/address/${
              (data as unknown as { _hatsSignerGate: string })._hatsSignerGate
            }#writeContract`
          );
        }}
      >
        View {type} Contract
      </Button>
      <Button
        leftIcon={<BsSafe />}
        minWidth={'60%'}
        onClick={() => {
          window.open(
            `${getSafeAppUrlPrefix(chain?.id)}${
              (data as unknown as { _safe: string })._safe
            }`
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
        The Safe owner you see listed at app.safe.global is the new Hats Signer
        Gate contract you deployed. This signer will be replaced as soon as an
        authorized hat wearer claims signing authority for the first time.
      </Text>
    </VStack>
  );
};

export default TransactionDetails;
