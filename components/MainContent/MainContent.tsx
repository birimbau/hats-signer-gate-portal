import { Grid, GridItem } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Content from '../Content/Content';
import HeaderActions from '../HeaderActions/HeaderActions';
import NonConnectedCard from '../NonConnectedCard/NonConnectedCard';
import ContentOne from './components/ContentOne/ContentOne';
import HeaderOne from './components/HeaderOne/HeaderOne';
import * as S from './MainContent.styled';

const MainContent = () => {
  const { isConnected } = useAccount();

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
        />
        <GridItem
          rowSpan={1}
          colSpan={1}
          background='#FAFAFA'
          padding='16px 24px'
        />
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
        <GridItem rowSpan={1} colSpan={1} background='#F0FCFD'>
          {/* TODO: ContentTwo will be here -> will be responsible for the form itself */}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} background='#FFFFFF' />
      </Grid>
      {!isConnected && <NonConnectedCard />}
    </S.MainContentStyled>
  );
};

export default MainContent;
