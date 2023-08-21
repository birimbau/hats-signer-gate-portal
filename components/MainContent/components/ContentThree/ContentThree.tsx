import { Card, VStack, Text, CardBody } from '@chakra-ui/react';
import { CgUserRemove } from 'react-icons/cg';
import { LiaCopySolid } from 'react-icons/lia';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../../../context/WalletConnectionContext';
import Button from '../../../UI/CustomButton/CustomButton';
import {
  useDeployContext,
  DEPLOY_ACTIONS,
} from '../../../../context/DeployContext';
import { useRouter } from 'next/router';

export const ContentThree = () => {
  const { selected, setSelected } = useSelectedActionContext();
  const { isReadyToUse } = useWalletConnectionContext();
  const { selectedDeployAction } = useDeployContext();
  const router = useRouter();
  const onClickHandler = (action: HEADER_ACTIONS) => {
    setSelected(action);
    router.replace(`/${action.toLowerCase()}`);
  };

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY: {
      switch (selectedDeployAction) {
        case DEPLOY_ACTIONS.DEPLOY_HSG:
          return <p> HSG</p>;
        case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
          return <p> HSGWS</p>;
        case DEPLOY_ACTIONS.DEPLOY_MHSG:
          return <p> MHSG</p>;
        case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
          return <p> MHSGWS</p>;
        default:
          return (
            <p>
              {' '}
              {`Deploy a Hats Signer Gate (HSG), or Multiple Hats Signer Gate (MHSG) smart contract via the Hats Signer Gate Factory contract.An HSG or MHSG can be deployed for an existing safe or in conjunction with a new safe that will be generated.If you already have a multisig set up that you'd like to use, select either:
              Deploy Hats Signer Gate: for cases where only one distinct hat will be a signer on the multisig, or
              Deploy Multi Hats Signer Gate: to enable multiple distinct hats to be signers on the multisig
              If you would like to set up a new multisig to use with Hats Signer Gate, select either:
              Deploy Hats Signer Gate + Safe, or
              Deploy Multi Hats Signer Gate + Safe`}
            </p>
          );
      }
    }
    case HEADER_ACTIONS.VIEW:
      return <p>View</p>;
    case HEADER_ACTIONS.CLAIM:
      return <p>Claim</p>;
    case HEADER_ACTIONS.RENOUNCE:
      return <p>Renounce</p>;
    case HEADER_ACTIONS.REMOVE:
      return <p>Remove</p>;
    case HEADER_ACTIONS.MODIFY:
      return <p>Modify</p>;
    default:
      return (
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.VIEW)}
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
                  onClick={() => onClickHandler(HEADER_ACTIONS.REMOVE)}
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
