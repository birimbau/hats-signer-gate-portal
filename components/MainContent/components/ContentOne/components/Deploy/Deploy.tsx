import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { DEPLOY_ACTIONS } from '../../../../../../context/DeployContext';
import { findAction } from '../../../../../../utils/utils';
import Button from '../../../../../UI/CustomButton/CustomButton';

interface P {
  active?: DEPLOY_ACTIONS;
}
const Deploy: React.FC<P> = (p) => {
  const router = useRouter();
  const { slug } = router.query;
  const slug2 = findAction(slug, 1);
  const activeButton = p.active || slug2;

  const onClickHandler = (action: DEPLOY_ACTIONS) => {
    router.replace(encodeURI(`/deploy/${action.toLowerCase()}`));
  };

  return (
    <VStack
      justifyContent='flex-start'
      height='100%'
      alignItems='flex-start'
      gap='36px'
      width={'340px'}
    >
      <Button
        isActive={activeButton === DEPLOY_ACTIONS.DEPLOY_HSG}
        width={'100%'}
        onClick={() => onClickHandler(DEPLOY_ACTIONS.DEPLOY_HSG)}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy Hats Signer Gate
      </Button>

      <Button
        isActive={activeButton === DEPLOY_ACTIONS.DEPLOY_HSG_W_S}
        width={'100%'}
        onClick={() => onClickHandler(DEPLOY_ACTIONS.DEPLOY_HSG_W_S)}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy Hats Signer Gate + Safe
      </Button>

      <Button
        isActive={activeButton === DEPLOY_ACTIONS.DEPLOY_MHSG}
        width={'100%'}
        onClick={() => onClickHandler(DEPLOY_ACTIONS.DEPLOY_MHSG)}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy Multi Hats Signer Gate
      </Button>

      <Button
        isActive={activeButton === DEPLOY_ACTIONS.DEPLOY_MHSG_W_S}
        width={'100%'}
        onClick={() => onClickHandler(DEPLOY_ACTIONS.DEPLOY_MHSG_W_S)}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy Multi Hats Signer Gate + Safe
      </Button>
    </VStack>
  );
};

export default Deploy;
