import { Grid, GridItem } from "@chakra-ui/react";
import { MainContentStyled, CellContent } from "./MainContentComponents";

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
		<MainContentStyled
			direction="column"
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
					<CellContent>{p.headerOne}</CellContent>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					background="#F9FFFF"
					padding="16px 24px"
				>
					<CellContent>{p.headerTwo}</CellContent>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					background="#FAFAFA"
					padding="16px 24px"
				>
					<CellContent>{p.headerThree}</CellContent>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					background="#F6FCFF"
					padding="24px 24px"
				>
					<CellContent>{p.contentOne}</CellContent>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					background="#F0FCFD"
					padding="24px 24px"
				>
					<CellContent>{p.contentTwo}</CellContent>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					background="#FFFFFF"
					padding="24px 24px"
				>
					<CellContent>{p.contentThree}</CellContent>
				</GridItem>
			</Grid>
		</MainContentStyled>
	);
};

export default MainContent;
