import React from 'react';
import { VStack, Button, Text } from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { BsCardList, BsSafe } from 'react-icons/bs';
import { useNetwork } from 'wagmi';
import {
  getBlockExplorerUrl,
  getSafeAppUrlPrefix,
} from '../../../../utils/utils';
import {
  DeployConfigHSG_String,
  DeployConfigMHSG_String,
} from '../types/forms';

interface TransactionDetailsProps {
  data: any; // TODO
  transactionData: any; // TODO
  formData: DeployConfigHSG_String | DeployConfigMHSG_String;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  data,
  transactionData,
  formData,
}) => {
  const { chain } = useNetwork();

  return (
    <VStack height="100%" alignItems="flex-start" gap={'24px'}>
      <Button
        leftIcon={<FiCopy />}
        onClick={() => {
          window.open(
            `${getBlockExplorerUrl(chain?.id)}/tx/${
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
            `${getBlockExplorerUrl(chain?.id)}/address/${
              (data as unknown as { _hatsSignerGate: string })._hatsSignerGate
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
