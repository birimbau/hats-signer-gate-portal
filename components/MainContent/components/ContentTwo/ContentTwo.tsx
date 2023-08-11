import { Card, VStack, Text, CardBody } from '@chakra-ui/react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgUserRemove } from 'react-icons/cg';
import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from '../../../../context/DeployContext';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../../../context/WalletConnectionContext';
import HatsSignerGateAndSafeForm from '../../../Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import HatsSignerGateForm from '../../../Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import MultiHatsSignerGateAndSafeForm from '../../../Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import MultiHatsSignerGateForm from '../../../Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import Button from '../../../UI/CustomButton/CustomButton';

const ContentTwo = () => {
  const { selectedDeployAction } = useDeployContext();
  const { selected, setSelected } = useSelectedActionContext();
  const { isReadyToUse } = useWalletConnectionContext();

  switch (selectedDeployAction) {
    case DEPLOY_ACTIONS.DEPLOY_HSG:
      return <HatsSignerGateForm />;
    case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
      return <HatsSignerGateAndSafeForm />;
    case DEPLOY_ACTIONS.DEPLOY_MHSG:
      return <MultiHatsSignerGateForm />;
    case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
      return <MultiHatsSignerGateAndSafeForm />;
    default:
      return (
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => setSelected(HEADER_ACTIONS.MODIFY)}
                  leftIcon={<AiOutlineSetting />}
                >
                  Modify
                </Button>

                <Text>
                  <Text as='b'>Modify Parameters</Text> of a multisig safe
                  governed by an HSG or MHSG contract.
                </Text>
                <Text>
                  The contract owner can transfer ownership, or adjust
                  thresholds on an HSG, and add signer hats to an MHSG.
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
                  <Text as='b'>Renounce Signing Authority</Text> by giving up
                  the signer hat on the Hats app.
                </Text>
                <Text>
                  If you decide that you no longer wish to be a signer on the
                  safe, you have the option to relinquish your signing
                  authority.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      );
  }
};

export default ContentTwo;
