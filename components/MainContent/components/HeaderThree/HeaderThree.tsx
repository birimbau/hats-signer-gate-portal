import { VStack, Text } from '@chakra-ui/react';
import { useWalletConnectionContext } from '../../../../context/WalletConnectionContext';

const HeaderThree = () => {
  const { isConnected, isWrongNetwork } = useWalletConnectionContext();

  return (
    <>
      {!isConnected && (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Please Connect Your Wallet</Text>
        </VStack>
      )}
      {isConnected && isWrongNetwork && (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Wrong Network</Text>
        </VStack>
      )}
      {isConnected && !isWrongNetwork && (
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Wallet Connected</Text>
        </VStack>
      )}
    </>
  );
};

export default HeaderThree;
