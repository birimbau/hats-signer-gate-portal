import { Divider, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineDeploymentUnit, AiOutlineSetting } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { CgUserRemove } from 'react-icons/cg';
import { LiaCopySolid } from 'react-icons/lia';
import { LuEdit } from 'react-icons/lu';
import { HEADER_ACTIONS } from '../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../context/WalletConnectionContext';
import Button from '../UI/CustomButton/CustomButton';

interface P {
  selectedAction: HEADER_ACTIONS | undefined;
}
const HeaderActions: React.FC<P> = (p) => {
  const { isReadyToUse } = useWalletConnectionContext();
  const router = useRouter();
  const onClickHandler = (action: HEADER_ACTIONS) => {
    router.replace(`/${action.toLowerCase()}`);
  };

  return (
    <Flex alignItems='center' height='72px' padding='16px 24px' gap='16px'>
      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.DEPLOY}
        leftIcon={<AiOutlineDeploymentUnit />}
        onClick={() => onClickHandler(HEADER_ACTIONS.DEPLOY)}
      >
        Deploy
      </Button>

      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.MODIFY}
        leftIcon={<AiOutlineSetting />}
        onClick={() => onClickHandler(HEADER_ACTIONS.MODIFY)}
      >
        Modify
      </Button>

      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.VIEW}
        leftIcon={<LiaCopySolid />}
        onClick={() => onClickHandler(HEADER_ACTIONS.VIEW)}
      >
        View
      </Button>

      <Divider
        orientation='vertical'
        opacity='1'
        color='gray.700'
        backgroundColor='gray.700'
        width='1px'
      />

      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.CLAIM}
        leftIcon={<LuEdit />}
        onClick={() => onClickHandler(HEADER_ACTIONS.CLAIM)}
      >
        Claim
      </Button>

      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.RENOUNCE}
        leftIcon={<BiBlock />}
        onClick={() => onClickHandler(HEADER_ACTIONS.RENOUNCE)}
      >
        Renounce
      </Button>

      <Divider
        orientation='vertical'
        opacity='1'
        color='gray.700'
        backgroundColor='gray.700'
        width='1px'
      />

      <Button
        isDisabled={!isReadyToUse}
        isActive={p.selectedAction === HEADER_ACTIONS.REMOVE}
        leftIcon={<CgUserRemove />}
        onClick={() => onClickHandler(HEADER_ACTIONS.REMOVE)}
      >
        Remove
      </Button>
    </Flex>
  );
};

export default HeaderActions;
