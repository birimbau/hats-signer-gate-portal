import { Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../../../context/WalletConnectionContext';
import Button from '../../../UI/CustomButton/CustomButton';
import Deploy from './components/Deploy/Deploy';

const ContentOne = () => {
  const { selected, setSelected } = useSelectedActionContext();
  const { isReadyToUse } = useWalletConnectionContext();

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY:
      return <Deploy />;
    case HEADER_ACTIONS.CLAIM:
      return <>CLAIM: To be developer</>;
    case HEADER_ACTIONS.RENOUNCE:
      return <>Renounce: To be developer</>;
    case HEADER_ACTIONS.REMOVE:
      return <>Remove: To be developer</>;
    case HEADER_ACTIONS.REVISE:
      return <>REVISE: To be developer</>;
    case HEADER_ACTIONS.VIEW:
      return <>VIEW: To be developer</>;
    default:
      return (
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => setSelected(HEADER_ACTIONS.DEPLOY)}
                  leftIcon={<AiOutlineDeploymentUnit />}
                >
                  Deploy
                </Button>
                <Text>
                  <Text as='b'>Deploy a Hats Signer Gate</Text> (HSG), or
                  Multiple Hats Signer Gate (MHSG) smart contract via the Hats
                  Signer Gate Factory contract.
                </Text>
                <Text>
                  An HSG or MHSG can be deployed for an existing safe or in
                  conjunction with a new safe that will be generated.
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => setSelected(HEADER_ACTIONS.CLAIM)}
                  leftIcon={<LuEdit />}
                >
                  Claim
                </Button>
                <Text>
                  <Text as='b'>Claim Signing Authority</Text> on a multisig safe
                  that is controlled by an HSG or MSHG for which you wear the
                  signing Hat.
                </Text>
                <Text>
                  After the contract owner assigns the signer hat to your wallet
                  address, you can be included in the safe.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      );
  }
};

export default ContentOne;
