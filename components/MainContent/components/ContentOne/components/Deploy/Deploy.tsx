import { VStack } from '@chakra-ui/react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import {
  DEPLOY_ACTIONS, useDeployContext
} from '../../../../../../context/DeployContext';
import Button from '../../../../../UI/CustomButton/CustomButton';


const Deploy: React.FC = () => {
  const {selectedDeployAction, setSelectedDeployAction} = useDeployContext();
  return (
    <VStack
      justifyContent='flex-start'
      height='100%'
      alignItems='flex-start'
      gap='36px'
      width={'340px'}
    >
      
        <Button
          isActive={selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_HSG}
          width={'100%'}
          onClick={() => setSelectedDeployAction(DEPLOY_ACTIONS.DEPLOY_HSG)}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Hats Signer Gate
        </Button>
      
      
        <Button
          isActive={selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_HSG_W_S}
          width={'100%'}
          onClick={() => setSelectedDeployAction(DEPLOY_ACTIONS.DEPLOY_HSG_W_S)}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Hats Signer Gate + Safe
        </Button>
      
      
        <Button
          isActive={selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_MHSG}
          width={'100%'}
          onClick={() => setSelectedDeployAction(DEPLOY_ACTIONS.DEPLOY_MHSG)}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Multi Hats Signer Gate
        </Button>
      
      
        <Button
          isActive={selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_MHSG_W_S}
          width={'100%'}
          onClick={() =>  setSelectedDeployAction(DEPLOY_ACTIONS.DEPLOY_MHSG_W_S)}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Multi Hats Signer Gate + Safe
        </Button>
      
    </VStack>
  );
};

export default Deploy;
