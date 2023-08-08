import { Card, VStack, Text, CardBody } from '@chakra-ui/react';
import { CgUserRemove } from 'react-icons/cg';
import { LiaCopySolid } from 'react-icons/lia';
import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from '../../../../context/DeployContext';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../../../context/WalletConnectionContext';
import Button from '../../../UI/CustomButton/CustomButton';

const ContentThree = () => {
  const { selected, setSelected } = useSelectedActionContext();
  const { isReadyToUse } = useWalletConnectionContext();
  const { selectedDeployAction, isPending, transationResult } =
    useDeployContext();

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY:
      return (
        <>
          {!isPending && !transationResult && <></>}
          {!isPending && transationResult && (
            <>
              _hatsSignerGate: {transationResult._hatsSignerGate}
              _maxSigners: {transationResult._maxSigners}
              _minThreshold: {transationResult._minThreshold}
              _ownerHatId:{transationResult._ownerHatId}
              _safe: {transationResult._safe}
              _signersHatIds:{' '}
              {transationResult._signersHatIds.map((a) => (
                <>{a} </>
              ))}
              _targetThreshold: {transationResult._targetThreshold}
              {transationResult}
            </>
          )}
          {isPending && <>Transaction Pending......</>}
        </>
      );
    default:
      if (selected) {
        return <></>;
      }

      return (
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => setSelected(HEADER_ACTIONS.VIEW)}
                  leftIcon={<LiaCopySolid />}
                >
                  View
                </Button>

                <Text>
                  <Text as='b'>View Parameters</Text> of a multisig safe
                  governed by an HSG or MHSG contract.
                </Text>
                <Text>
                  Any wallet can fetch the contract to view thresholds, Signer
                  Hat IDs, the safe address, and number of valid signers.
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => setSelected(HEADER_ACTIONS.REMOVE)}
                  leftIcon={<CgUserRemove />}
                >
                  Remove
                </Button>
                <Text>
                  <Text as='b'>Remove an Inactive Signer</Text> that is no
                  longer wearing the signer hat.
                </Text>
                <Text>
                  Once a signer has renounced signer authority on the Hats app,
                  this maintenance step can be performed by any wallet, in order
                  to sync the multisig safe.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      );
  }
};

export default ContentThree;
