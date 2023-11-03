import { IconButton, IconButtonProps } from "@chakra-ui/react";

export const IconButtonStyled = (p: IconButtonProps) => (
	<IconButton
		backgroundColor="white"
		border="1px solid #2d3748"
		borderRadius="4px"
		{...p}
	/>
);
