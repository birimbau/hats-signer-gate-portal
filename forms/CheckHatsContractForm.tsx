/* eslint-disable react-hooks/exhaustive-deps */
import { VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/CustomButton";
import { useValidSignerHats } from "@/hooks/useMultiHatsSignerGate";
import { useGetHatsContract } from "@/hooks/useHatsSignerGate";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import CustomInputWrapper from "@/components/form/CustomInputWrapper";
import { useWalletConnectionContext } from "@/context/WalletConnectionContext";
import { AiOutlineDownload } from "react-icons/ai";
import { Hex } from "viem";

interface P {
	onResult: (
		{
			isMhsg,
			isHsg,
		}: {
			isMhsg: boolean;
			isHsg: boolean;
		},
		address: Hex,
	) => void;
	setIsError?(isError: boolean): void;
	setIsErrorOne?(isErrorOne: boolean): void;
	setIsErrorTwo?(isErrorTwo: boolean): void;
	setIsPending?(isPending: boolean): void;
}

const CheckHatsContract: React.FC<P> = (p) => {
	const { setIsError, setIsErrorOne, setIsErrorTwo } = p;
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		contractAddress: "" as Hex,
	});

	const contractAddress = useRef("");

	const { isReadyToUse } = useWalletConnectionContext();

	// Used to check if its a MHSG
	const {
		refetch: checkMHSG,
		isLoading: checkMHSGIsLoading,
		isSuccess: checkMHSGIsSuccess,
		data: checkMHSGData,
		error: MhsgError,
	} = useValidSignerHats(
		{
			input: BigInt(0),
		},
		contractAddress.current as Hex,
	);

	// Used to check if its a HSG
	const {
		data: hsgResult,
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

	useEffect(() => {
		if (checkMHSGIsSuccess && isSubmitted) {
			p.onResult(
				{
					isMhsg: true,
					isHsg: false,
				},
				contractAddress.current as Hex,
			);
			setIsSubmitted(false);
		}
	}, [checkMHSGIsSuccess, checkMHSGData, isSubmitted]);

	useEffect(() => {
		if (MhsgError && isSubmitted) {
			checkHSG().then((hsgResult) => {
				if (hsgResult.data) {
					p.onResult(
						{
							isMhsg: false,
							isHsg: true,
						},
						contractAddress.current as Hex,
					);
				} else {
					p.onResult(
						{
							isMhsg: false,
							isHsg: false,
						},
						contractAddress.current as Hex,
					);
				}
			});
		}
	}, [MhsgError, isSubmitted, hsgResult]);

	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				if (setIsErrorOne) setIsErrorOne(false);
				if (setIsErrorTwo) setIsErrorTwo(false);
				if (setIsError) setIsError(false);
				setIsSubmitted(true);

				contractAddress.current = values.contractAddress;
				setFormData(values);
				checkMHSG?.();
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
