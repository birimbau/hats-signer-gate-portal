import { Grid, GridItem } from '@chakra-ui/react';
import ContentOne from './components/ContentOne/ContentOne';
import { ContentThree } from './components/ContentThree/ContentThree';

import ContentTwo from './components/ContentTwo/ContentTwo';
import HeaderOne from './components/HeaderOne/HeaderOne';
import HeaderThree from './components/HeaderThree/HeaderThree';
import HeaderTwo from './components/HeaderTwo/HeaderTwo';
import * as S from './MainContent.styled';

interface P {
  headerOne?: React.ReactNode;
  headerTwo?: React.ReactNode;
  headerThree?: React.ReactNode;
  contentOne?: React.ReactNode;
  contentTwo?: React.ReactNode;
  contentThree?: React.ReactNode;
}

const MainContent: React.FC<P> = (p) => {
  return (
    <S.MainContentStyled
      direction={'column'}
      grow={1}
      position='relative'
      width='100%'
    >
      <Grid
        templateRows='161px 1fr'
        templateColumns='repeat(3, 1fr)'
        flexGrow={1}
      >
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#EDF8FE'
          padding='16px 24px'
        >
          <S.CellContent>{p.headerOne}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F9FFFF'
          padding='16px 24px'
        >
          <S.CellContent>{p.headerTwo}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#FAFAFA'
          padding='16px 24px'
        >
          <S.CellContent>{p.headerThree}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F6FCFF'
          padding='24px 24px'
        >
          <S.CellContent>{p.contentOne}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F0FCFD'
          padding='24px 24px'
        >
          <S.CellContent>{p.contentTwo}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#FFFFFF'
          padding='24px 24px'
        >
          <S.CellContent>{p.contentThree}</S.CellContent>
        </GridItem>
      </Grid>
    </S.MainContentStyled>
  );
};

export default MainContent;
