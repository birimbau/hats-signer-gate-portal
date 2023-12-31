import { VStack } from "@chakra-ui/react";
import Button from "@/components/ui/CustomButton";
import { useState, useEffect } from "react";
import {
	useAccount,
	useChainId,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import { Form, Formik } from "formik";
import { useDeployHSGwSafe } from "@/hooks/useHatsSignerGateFactory";
import { AbiTypeToPrimitiveType } from "abitype";
import { Hex, decodeEventLog } from "viem";
import { HatsSignerGateFactoryAbi } from "@/utils/abi/HatsSignerGateFactory";
import { DeployConfigHSGWS } from "@/types/forms";
import * as Yup from "yup";
import "../utils/form/validation"; // for Yup Validation
import CustomInputWrapper from "@/components/form/CustomInputWrapper";
import {
	hatIntSchema,
	minThresholdValidation,
	targetThresholdValidation,
} from "@/utils/form/validation";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

interface Props {
	setIsPending: (isPending: boolean) => void;
	setData: (data: any) => void;
	setTransactionHash: (data: any) => void;
	formData: DeployConfigHSGWS; // This now has it's own type and the initialised values are strings
	setFormData: (formData: any) => void;
	isPending: boolean;
}

export default function HatsSignerGateAndSafeForm(props: Props) {
	// Destructure Props for ease of use & visibility within this function
	const {
		setIsPending,
		setData,
		setTransactionHash,
		formData,
		setFormData,
		isPending,
	} = props;
	const chainId = useChainId();

	const [hash, setHash] = useState<Hex | "">("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [refetchNow, setRefetchNow] = useState(false);

	// Used to prevent the user Deploying when not connected
	const { isConnected } = useAccount();

	const { config, refetch } = useDeployHSGwSafe(formData, chainId);

	const {
		data: contractData,
		isLoading,
		write,
		isError,
	} = useContractWrite(config);

	// This only runs if "hash" is defined
	// Use this to detect isLoading state in transaction and update user interface
	const { isSuccess, isLoading: transactionPending } = useWaitForTransaction({
		hash: contractData?.hash as AbiTypeToPrimitiveType<"address">,
		onSuccess(data) {
			if (data && data.logs && data.logs.length > 8 && data.logs[8]) {
				const response = decodeEventLog({
					abi: HatsSignerGateFactoryAbi,
					data: data.logs[8].data,
					topics: data.logs[8].topics,
				});

				setTransactionHash(data.transactionHash);
				setData(response.args);
				console.log("Transaction Success");
			} else {
				console.error("Unexpected data structure:", data);
			}

			// setData(response.args);
			console.log("Transaction Success");
		},
	});

	// Yup Validation Schema is already used in this project.
	// Custom Validations are in one file for maintainability "validation.tsx"
	const validationSchema = Yup.object().shape({
		_ownerHatId: hatIntSchema,
		_signerHatId: hatIntSchema,
		_minThreshold: minThresholdValidation(hatIntSchema),
		_targetThreshold: targetThresholdValidation(hatIntSchema),
		_maxSigners: hatIntSchema.greaterThanTarget(),
	});

	// This is used to update the parent's display status
	useEffect(() => {
		setIsPending((isLoading || transactionPending) && hash !== "");
	}, [isLoading, transactionPending, setIsPending, hash]);

	// The hash changes when the user clicks submit.
	// This triggers the "useWaitForTransaction"
	useEffect(() => {
		if (contractData) {
			setHash(contractData.hash);
		}
	}, [contractData]);

	// LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
	// This only runs once on user submit, avoiding unnecessary calls to hooks.
	useEffect(() => {
		if (isSubmitted) {
			if (refetchNow) {
				setRefetchNow(false);
				refetch();
			}

			if (write) {
				setIsSubmitted(false);
				write?.();
			}
		}
	}, [isSubmitted, refetchNow, refetch, write]);

	// If user aborts transaction, reset status
	useEffect(() => {
		setIsSubmitted(false);
	}, [isError]);
	return (
		// Note: We have to use <Formik> wrapper for error handling
		// ** Be aware that <Field>, <FastField>, <ErrorMessage>, connect(),
		// and <FieldArray> will NOT work with useFormik() as they all require React Context **

		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values: DeployConfigHSGWS, actions) => {
				// e.preventDefault(); - This line is now handled by Formik

				// What happens here?
				//    The formData is updates state in the parent file -> index.jsx,
				//    this component re-renders, the updated state is used in
				//    'useDeployHSGwSafe()' and this creates a valid 'write()'.
				setFormData({
					_ownerHatId: values._ownerHatId,
					_signerHatId: values._signerHatId,
					_minThreshold: values._minThreshold,
					_targetThreshold: values._targetThreshold,
					_maxSigners: values._maxSigners,
				});

				// This ensures that write() and refetch behave as expected.
				setIsSubmitted(true);
				setRefetchNow(true);
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
							name="_ownerHatId"
							label="Owner Hat ID (integer)"
							placeholder="26950000000000000000000000004196..."
							width={80}
						/>
						<CustomInputWrapper
							name="_signerHatId"
							label="Signer Hat ID (integer)"
							placeholder="26960000000000000000000000003152..."
							width={80}
						/>
						<CustomInputWrapper
							name="_minThreshold"
							label="Min Threshold (integer)"
							placeholder="3"
							width={60}
						/>
						<CustomInputWrapper
							name="_targetThreshold"
							label="Max Threshold (integer)"
							placeholder="5"
							width={60}
						/>

						<CustomInputWrapper
							name="_maxSigners"
							label="Max Signers (integer)"
							placeholder="9"
							width={60}
						/>

						<Button
							leftIcon={<AiOutlineDeploymentUnit />}
							type="submit"
							// Will be grey during submit and after success
							// props.dirty comes from formik and makes the button clickable once values are inputted
							isDisabled={
								!props.dirty ||
								!isConnected ||
								isPending ||
								isSuccess
							}
							paddingInline={"30px"}
						>
							Deploy
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
}
