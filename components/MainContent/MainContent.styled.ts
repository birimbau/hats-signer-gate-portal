import { Flex, Grid } from '@chakra-ui/react';
import styled from 'styled-components';

export const MainContentStyled = styled(Flex)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('/background.svg');
  }
`;
