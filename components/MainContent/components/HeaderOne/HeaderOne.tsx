import { Box, VStack, Text } from '@chakra-ui/react';
import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';

const HeaderOne = () => {
  const { selected, setSelected } = useSelectedActionContext();

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY:
      return (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text>Hats Signer Gate Factory</Text>
          <Text>Select the function to call</Text>
        </VStack>
      );
    default:
      return <></>;
  }
};

export default HeaderOne;
