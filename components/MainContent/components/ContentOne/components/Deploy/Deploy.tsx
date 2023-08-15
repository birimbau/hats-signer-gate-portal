import { VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from '../../../../../../context/DeployContext';
import Button from '../../../../../UI/CustomButton/CustomButton';

interface P {
  selectedDeployAction?: DEPLOY_ACTIONS;
}

const Deploy: React.FC<P> = (p) => {
  return (
    <VStack
      justifyContent='flex-start'
      height='100%'
      alignItems='flex-start'
      gap='36px'
      width={'340px'}
    >
      <Link href='/deploy/hsg'>
        <Button
          isActive={p.selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_HSG}
          width={'100%'}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Hats Signer Gate
        </Button>
      </Link>
      <Link href='/deploy/hsgws'>
        <Button
          isActive={p.selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_HSG_W_S}
          width={'100%'}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Hats Signer Gate + Safe
        </Button>
      </Link>
      <Link href='/deploy/mhsg'>
        <Button
          isActive={p.selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_MHSG}
          width={'100%'}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Multi Hats Signer Gate
        </Button>
      </Link>
      <Link href='/deploy/mhsgws'>
        <Button
          isActive={p.selectedDeployAction === DEPLOY_ACTIONS.DEPLOY_MHSG_W_S}
          width={'100%'}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy Multi Hats Signer Gate + Safe
        </Button>
      </Link>
    </VStack>
  );
};

export default Deploy;
