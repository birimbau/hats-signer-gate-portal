import { Flex } from '@chakra-ui/react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import { BiBlock } from 'react-icons/bi';
import { CgUserRemove } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { LiaCopySolid } from 'react-icons/lia';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import Button from '../UI/CustomButton/CustomButton';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../context/SelectedActionContext';

const HeaderActions = () => {
  const { selected, setSelected } = useSelectedActionContext();
  const { isConnected } = useAccount();

  return (
    <Flex alignItems='center' height='72px' padding='0 24px' gap='16px'>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.DEPLOY)}
        isActive={selected === HEADER_ACTIONS.DEPLOY}
        leftIcon={<AiOutlineDeploymentUnit />}
      >
        Deploy
      </Button>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.CLAIM)}
        isActive={selected === HEADER_ACTIONS.CLAIM}
        leftIcon={<LuEdit />}
      >
        Claim
      </Button>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.RENOUNCE)}
        isActive={selected === HEADER_ACTIONS.RENOUNCE}
        leftIcon={<BiBlock />}
      >
        Renounce
      </Button>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.REMOVE)}
        isActive={selected === HEADER_ACTIONS.REMOVE}
        leftIcon={<CgUserRemove />}
      >
        Remove
      </Button>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.REVISE)}
        isActive={selected === HEADER_ACTIONS.REVISE}
        leftIcon={<FiSettings />}
      >
        Revise
      </Button>
      <Button
        isDisabled={!isConnected}
        onClick={() => setSelected(HEADER_ACTIONS.VIEW)}
        isActive={selected === HEADER_ACTIONS.VIEW}
        leftIcon={<LiaCopySolid />}
      >
        View
      </Button>
    </Flex>
  );
};

export default HeaderActions;
