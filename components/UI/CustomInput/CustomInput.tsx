import {
	Box,
	HStack,
	Input as ChakraUiInput,
	InputProps,
	Text,
} from "@chakra-ui/react";

import { FieldProps } from "formik";

// This is here temporarily to allow the old implementation of <Input/> to...
// work at the same time as the Formik compatible <CustomInputWrapper />
type OptionalFieldProps = {
	[K in keyof FieldProps<any, any>]?: FieldProps<any, any>[K];
};

type P = {
	label?: string;
	extra?: React.ReactNode;
	multi?: boolean;
} & InputProps &
	OptionalFieldProps;

const Input: React.FC<P> = (p) => {
	const { multi, label, width, field, ...rest } = p;

	return (
		<Box display={"flex"} flexDirection="column" width={width || undefined}>
			{label && (
				<Text
					fontStyle="normal"
					fontWeight={500}
					lineHeight="24px"
					as="label"
					id={p.name || undefined}
				>
					{label}
				</Text>
			)}
			<HStack gap="8px">
				<ChakraUiInput
					{...field} // Spread field props from Formik here
					{...rest}
					_placeholder={{
						fontSize: "14px",
					}}
					fontSize="14px"
					borderRadius="0px"
					borderColor="button.black"
					padding="0 16px"
					placeholdercolor="button.gray"
					background={"gray.50"}
					height={"40px"}
					width={multi ? "80%" : "100%"}
					_placeholderShown={{
						textOverflow: "ellipsis",
					}}
				></ChakraUiInput>
				{p.extra && <>{p.extra}</>}
			</HStack>
		</Box>
	);
};

export default Input;
