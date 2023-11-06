import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface P extends FlexProps {}

export const MainContentStyled = ({ children, ...props }: P) => (
	<Flex
		position="relative"
		width="100%"
		_before={{
			content: '""',
			position: "absolute",
			width: " 100%",
			height: "100%",
			backgroundImage: "/background.svg",
		}}
		{...props}
	>
		{children}
	</Flex>
);

export const CellContent = ({ children }: { children: ReactNode }) => (
	<Box position="relative" zIndex={1} height="100%">
		{children}
	</Box>
);
