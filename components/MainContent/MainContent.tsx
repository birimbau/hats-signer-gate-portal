import { Grid, GridItem } from '@chakra-ui/react';
import * as S from './MainContent.styled';
import styles from '../../styles/Main.module.css';

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
      position="relative"
      width="100%"
    >
      <Grid
        templateRows="161px 1fr"
        templateColumns="repeat(3, 1fr)"
        flexGrow={1}
      >
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#EDF8FE"
          padding="16px 24px"
        >
          <S.CellContent className={styles.CellContent}>
            {p.headerOne}
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#F9FFFF"
          padding="16px 24px"
        >
          <S.CellContent className={styles.CellContent}>
            {p.headerTwo}
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#FAFAFA"
          padding="16px 24px"
        >
          <S.CellContent className={styles.CellContent}>
            {p.headerThree}
          </S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#F6FCFF"
          padding="24px 24px"
        >
          <S.CellContent>{p.contentOne}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#F0FCFD"
          padding="24px 24px"
        >
          <S.CellContent>{p.contentTwo}</S.CellContent>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          background="#FFFFFF"
          padding="24px 24px"
        >
          <S.CellContent>{p.contentThree}</S.CellContent>
        </GridItem>
      </Grid>
    </S.MainContentStyled>
  );
};

export default MainContent;
