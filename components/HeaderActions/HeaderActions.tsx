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
import Link from 'next/link';

interface P {
  selectedAction?: HEADER_ACTIONS;
}
const HeaderActions: React.FC<P> = (p) => {
  const { isReadyToUse } = useWalletConnectionContext();

  return (
    <Flex alignItems='center' height='72px' padding='16px 24px' gap='16px'>
      <Link href='/deploy'>
        <Button
          isDisabled={!isReadyToUse}
          // onClick={() => setSelected(HEADER_ACTIONS.DEPLOY)}
          isActive={p.selectedAction === HEADER_ACTIONS.DEPLOY}
          leftIcon={<AiOutlineDeploymentUnit />}
        >
          Deploy
        </Button>
      </Link>
      <Link href='/modify'>
        <Button
          isDisabled={!isReadyToUse}
          isActive={p.selectedAction === HEADER_ACTIONS.MODIFY}
          leftIcon={<AiOutlineSetting />}
        >
          Modify
        </Button>
      </Link>
      <Link href='/view'>
        <Button
          isDisabled={!isReadyToUse}
          isActive={p.selectedAction === HEADER_ACTIONS.VIEW}
          leftIcon={<LiaCopySolid />}
        >
          View
        </Button>
      </Link>

      <Divider
        orientation='vertical'
        opacity='1'
        color='gray.700'
        backgroundColor='gray.700'
        width='1px'
      />

      <Link href='/claim'>
        <Button
          isDisabled={!isReadyToUse}
          isActive={p.selectedAction === HEADER_ACTIONS.CLAIM}
          leftIcon={<LuEdit />}
        >
          Claim
        </Button>
      </Link>

      <Link href='/renounce'>
        <Button
          isDisabled={!isReadyToUse}
          isActive={p.selectedAction === HEADER_ACTIONS.RENOUNCE}
          leftIcon={<BiBlock />}
        >
          Renounce
        </Button>
      </Link>

      <Divider
        orientation='vertical'
        opacity='1'
        color='gray.700'
        backgroundColor='gray.700'
        width='1px'
      />

      <Link href='/remove'>
        <Button
          isDisabled={!isReadyToUse}
          isActive={p.selectedAction === HEADER_ACTIONS.REMOVE}
          leftIcon={<CgUserRemove />}
        >
          Remove
        </Button>
      </Link>
    </Flex>
  );
};

export default HeaderActions;
