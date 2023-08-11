import { Divider, Flex } from '@chakra-ui/react';
import { AiOutlineDeploymentUnit, AiOutlineSetting } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import { BiBlock } from 'react-icons/bi';
import { CgUserRemove } from 'react-icons/cg';
import { LiaCopySolid } from 'react-icons/lia';
import Button from '../UI/CustomButton/CustomButton';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../context/SelectedActionContext';
import { useWalletConnectionContext } from '../../context/WalletConnectionContext';

const HeaderActions = () => {
  const { selected, setSelected } = useSelectedActionContext();
  const { isReadyToUse } = useWalletConnectionContext();

  return (
    <Flex alignItems='center' height='72px' padding='16px 24px' gap='16px'>
      <Button
        isDisabled={!isReadyToUse}
        onClick={() => setSelected(HEADER_ACTIONS.DEPLOY)}
        isActive={selected === HEADER_ACTIONS.DEPLOY}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy
      </Button>
      <Button
        isDisabled={!isReadyToUse}
        onClick={() => setSelected(HEADER_ACTIONS.MODIFY)}
        isActive={selected === HEADER_ACTIONS.MODIFY}
        leftIcon={<AiOutlineSetting />}
      >
        Modify
      </Button>
      <Button
        isDisabled={!isReadyToUse}
        onClick={() => setSelected(HEADER_ACTIONS.VIEW)}
        isActive={selected === HEADER_ACTIONS.VIEW}
        leftIcon={<LiaCopySolid />}
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
        onClick={() => setSelected(HEADER_ACTIONS.CLAIM)}
        isActive={selected === HEADER_ACTIONS.CLAIM}
        leftIcon={<LuEdit />}
      >
        Claim
      </Button>
      <Button
        isDisabled={!isReadyToUse}
        onClick={() => setSelected(HEADER_ACTIONS.RENOUNCE)}
        isActive={selected === HEADER_ACTIONS.RENOUNCE}
        leftIcon={<BiBlock />}
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
        onClick={() => setSelected(HEADER_ACTIONS.REMOVE)}
        isActive={selected === HEADER_ACTIONS.REMOVE}
        leftIcon={<CgUserRemove />}
      >
        Remove
      </Button>
    </Flex>
  );
};

export default HeaderActions;
