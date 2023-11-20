import { Flex, VStack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInputWrapper from "../components/form/CustomInputWrapper";
import Button from "../components/ui/CustomButton";
import { AiOutlineRead } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useIsValidSigner } from "@/hooks/useMultiHatsSignerGate";
import { Hex } from "viem";
import { useChainId } from "wagmi";

interface P {
	address: Hex;
}

// TODO is this attach safe?

const MHSGAttachSafe: React.FC<P> = (p) => {
	const chainId = useChainId();
	const [result, setResult] = useState<any>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		_account: "" as Hex,
	});

	const validationSchema = Yup.object().shape({
		_account: Yup.string().required("Required").ethereumAddress(),
	});

	const { refetch, data, isLoading, isSuccess } = useIsValidSigner(
		formData,
		p.address,
		chainId,
	);

	// LOGIC FOR RUNNING `Refetch` AFTER CLICKING FORMIK'S OnSubmit
	// This only runs once on user submit, avoiding unnecessary calls to hooks.
	useEffect(() => {
		if (isSubmitted) {
			setIsSubmitted(false);
			refetch().then((data) => {
				setResult(data.data);
			});
		}
	}, [isSubmitted, refetch]);
	console.log(result, data, isSuccess);

	return (
		<>
			<Formik
				initialValues={{ _account: "" }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					setFormData(values as { _account: Hex });

					// This ensures that the refetch occurs after the state updates.
					setIsSubmitted(true);
				}}
			>
				{(props) => (
					<Form noValidate>
						<VStack
							width="100%"
							alignItems={"flex-start"}
							fontSize={14}
							gap={5}
						>
							<Flex flexDirection={"column"} gap={0} w={"100%"}>
								<CustomInputWrapper
									name="_account"
									label="Signer Wallet (address)"
									placeholder="0xC8ac0000000000000000000000000000000047fe"
								/>
							</Flex>

							<Button
								type="submit"
								leftIcon={<AiOutlineRead />}
								isDisabled={isLoading || !props.dirty}
							>
								Read
							</Button>
						</VStack>
					</Form>
				)}
			</Formik>
			{result && isSuccess && (
				<Text marginTop="20px" color="green">
					Wallet is a Valid Signer
				</Text>
			)}
			{!result && isSuccess && (
				<Text marginTop="20px" color="red">
					Wallet is not a Valid Signer
				</Text>
			)}
		</>
	);
};

export default MHSGAttachSafe;
