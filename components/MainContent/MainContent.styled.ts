import { Flex, Grid } from '@chakra-ui/react';
import styled from 'styled-components';

export const MainContentStyled = styled(Flex)`
  position: relative;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('/background.svg');
  }
`;

export const CellContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;
