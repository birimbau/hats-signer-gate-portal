import { Grid, GridItem } from '@chakra-ui/react';
import HeaderActions from '../HeaderActions/HeaderActions';
import ContentOne from './components/ContentOne/ContentOne';
import ContentThree from './components/ContentThree/ContentThree';
import ContentTwo from './components/ContentTwo/ContentTwo';
import HeaderOne from './components/HeaderOne/HeaderOne';
import HeaderThree from './components/HeaderThree/HeaderThree';
import HeaderTwo from './components/HeaderTwo/HeaderTwo';
import * as S from './MainContent.styled';

const MainContent = () => {
  return (
    <S.MainContentStyled direction={'column'} grow={1} position='relative'>
      <HeaderActions />
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
          <S.CellContent>
            <HeaderOne />
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F9FFFF'
          padding='16px 24px'
        >
          <S.CellContent>
            <HeaderTwo />
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#FAFAFA'
          padding='16px 24px'
        >
          <S.CellContent>
            <HeaderThree />
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F6FCFF'
          padding='24px 24px'
        >
          <S.CellContent>
            <ContentOne />
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#F0FCFD'
          padding='24px 24px'
        >
          <S.CellContent>
            <ContentTwo />
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#FFFFFF'
          padding='24px 24px'
        >
          <S.CellContent>
            <ContentThree />
          </S.CellContent>
        </GridItem>
      </Grid>
    </S.MainContentStyled>
  );
};

export default MainContent;
