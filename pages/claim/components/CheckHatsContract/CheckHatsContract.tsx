import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Button from "../../../../components/UI/CustomButton/CustomButton";
import { useValidSignerHats } from "../../../../utils/hooks/MultiHatsSignerGate";
import { useGetHatsContract } from "../../../../utils/hooks/HatsSignerGate";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import CustomInputWrapper from "../../../../components/Deployers/forms/utils/CustomInputWrapper";
import { useWalletConnectionContext } from "../../../../context/WalletConnectionContext";
import { EthereumAddress } from "../../../../components/Deployers/forms/utils/ReadForm";
import { AiOutlineDownload } from "react-icons/ai";

interface P {
	onResult: (
		{
			isMhsg,
			isHsg,
		}: {
			isMhsg: boolean;
			isHsg: boolean;
		},
		address: EthereumAddress,
	) => void;
	setIsError?(isError: boolean): void;
	setIsErrorOne?(isErrorOne: boolean): void;
	setIsErrorTwo?(isErrorTwo: boolean): void;
	setIsPending?(isPending: boolean): void;
}

const CheckHatsContract: React.FC<P> = (p) => {
	const { setIsError, setIsPending, setIsErrorOne, setIsErrorTwo } = p;
	const [formData, setFormData] = useState({
		contractAddress: "" as EthereumAddress,
	});

	const { isReadyToUse } = useWalletConnectionContext();

	// Used to check if its a MHSG
	const {
		refetch: checkMHSG,
		isLoading: checkMHSGIsLoading,
		error: MhsgError,
	} = useValidSignerHats(
		{
			input: BigInt(0),
		},
		formData.contractAddress,
	);

	// Used to check if its a HSG
	const {
		refetch: checkHSG,
		isLoading: checkHSGIsLoading,
		error: HsgError,
	} = useGetHatsContract(formData.contractAddress);

	const validationSchema = Yup.object().shape({
		contractAddress: Yup.string().required("Required").ethereumAddress(),
	});

	// When error occurs, show user the error
	useEffect(() => {
		// If both errors exist, then the user has input an invalid address
		if (setIsError && HsgError && MhsgError) {
			setIsError(true);
		}
	}, [MhsgError, HsgError, setIsError]);

	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				if (setIsErrorOne) setIsErrorOne(false);
				if (setIsErrorTwo) setIsErrorTwo(false);
				if (setIsError) setIsError(false);

				console.log("0");
				setFormData(values);
				checkMHSG?.().then((mhsgResult) => {
					if (mhsgResult.data === undefined) {
						console.log("1");

						checkHSG?.().then((hsgResult) => {
							if (hsgResult.isSuccess) {
								console.log("2");
								p.onResult(
									{
										isMhsg: false,
										isHsg: true,
									},
									values.contractAddress,
								);
							} else {
								console.log("3");
								p.onResult(
									{
										isMhsg: false,
										isHsg: false,
									},
									values.contractAddress,
								);
							}
						});
					} else {
						console.log("4");
						p.onResult(
							{
								isMhsg: true,
								isHsg: false,
							},
							values.contractAddress,
						);
					}
				});
			}}
		>
			{(props) => (
				<Form>
					<VStack
						width="100%"
						alignItems={"flex-start"}
						fontSize={14}
						gap={5}
					>
						<CustomInputWrapper
							label="HSG or MHSG Contract (address)"
							placeholder="0xC8ac0000000000000000000000000000000047fe"
							name="contractAddress"
						/>

						<Button
							type="submit"
							isDisabled={
								!props.dirty ||
								checkMHSGIsLoading ||
								checkHSGIsLoading ||
								!isReadyToUse
							}
							leftIcon={<AiOutlineDownload />}
						>
							Fetch
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default CheckHatsContract;
