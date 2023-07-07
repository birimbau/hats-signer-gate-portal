import { Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const Header = () => {
  return (
    <header>
      <Flex justifyContent='space-between'>
        <Image src='/logo.svg' width={56} height={56} alt='Hats logo' />
        <ConnectButton />
      </Flex>
    </header>
  );
};

export default Header;
