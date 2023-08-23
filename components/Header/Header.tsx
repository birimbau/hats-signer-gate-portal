import { Flex, Link } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { TfiMenuAlt } from 'react-icons/tfi';
import * as S from './Header.styled';
import { useRouter } from 'next/router';
import { useSelectedActionContext } from '../../context/SelectedActionContext';

const Header = () => {

  const router = useRouter();
  function clickHandler() 
    {
      router.replace('/')
    
  }
  return (
    <S.Header className='py-1 px-6 w-full'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center' gap='94px'>
          
          <Image src='/logo.svg' width={56}  height={56} alt='Hats logo' onClick={() => clickHandler()}/>
          
          <Link
            href='https://docs.hatsprotocol.xyz'
            isExternal
            padding='8px 16px'
            color='gray.700'
            border='1px solid'
            borderColor='gray.700'
            borderRadius='6px'
            backgroundColor='white'
            fontSize='16px'
            fontWeight='500'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Flex alignItems='center' gap={'8px'}>
              <TfiMenuAlt /> Hats Signer Gate (HSG) Documentation
            </Flex>
          </Link>
        </Flex>
        <ConnectButton />
      </Flex>
    </S.Header>
  );
};

export default Header;
