import {
	Flex,
	FormControl,
	FormErrorMessage,
	HStack,
	VStack,
} from "@chakra-ui/react";
import Input from "../CustomInput/CustomInput";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import * as S from "./MultiInput.styled";

interface P {
	values: any[];
	label: string;
	countLabel: string;
	placeholder: string;
	name: string;
	type?: string;
	width?: string;
	isDisabled?: boolean;
	minAmountOfValues?: number;
}

// Changes made to this file are to enable validation to occur easily.
// e.g. setFieldTouched needs manual updates inside of <FieldArray />

import { FieldArray, FieldArrayRenderProps } from "formik";
const MultiInput: React.FC<P> = (p) => {
	return (
		<Flex flexDirection={"column"} gap={0} w={"100%"}>
			<FieldArray name={p.name}>
				{({ push, remove, form }: FieldArrayRenderProps) => (
					<VStack gap={"13px"} alignItems="flex-start">
						{form.values[p.name].map((v: string, i: number) => {
							const isError =
								Array.isArray(form.errors[p.name]) &&
								typeof (form.errors[p.name] as any[])[i] ===
									"string";
							const isTouched =
								Array.isArray(form.touched[p.name]) &&
								typeof (form.touched[p.name] as any[])[i] ===
									"boolean";

							// console.log(`Error state for Field ${i}:`, form.errors[p.name]);
							// console.log(`Touched state for Field ${i}:`, form.touched[p.name]);
							// console.log(
							//   `Combined invalid state for Field ${i}:`,
							//   !!(isError && isTouched)
							// );

							return (
								<FormControl
									key={i}
									isInvalid={!!(isError && isTouched)}
									// w={'100%'}
								>
									<Input
										label={`${p.label} [${p.countLabel}${
											i + 1
										}] (integer)`}
										type={p.type || "text"}
										name={`${p.name}[${i}]`}
										value={v.toString()}
										placeholder={p.placeholder}
										_placeholder={{
											fontSize: "14px",
										}}
										multi={true}
										width={"100%"}
										isDisabled={p.isDisabled}
										onChange={(e) => {
											form.setFieldValue(
												`${p.name}[${i}]`,
												e.target.value,
											);
											form.setFieldTouched(
												`${p.name}[${i}]`,
												true,
											);
										}}
										onBlur={() => {
											form.setFieldTouched(
												`${p.name}[${i}]`,
												true,
											);
										}}
										extra={
											<>
												<HStack gap="8px">
													{i > 0 && (
														<S.IconButtonStyled
															aria-label="remove value"
															icon={<HiMinus />}
															size="xs"
															onClick={() => {
																remove(i);
															}}
														/>
													)}
													<S.IconButtonStyled
														aria-label="Add value"
														icon={<BsPlusLg />}
														size="xs"
														isDisabled={
															!v || p.isDisabled
														}
														onClick={() => push("")}
													/>
												</HStack>
											</>
										}
									/>
									<FormErrorMessage>
										{(Array.isArray(form.errors[p.name]) &&
											(form.errors[p.name] as string[])[
												i
											]) ||
											""}
									</FormErrorMessage>
								</FormControl>
							);
						})}
					</VStack>
				)}
			</FieldArray>
		</Flex>
	);
};

export default MultiInput;
