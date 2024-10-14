import { VStack } from "@chakra-ui/react";
import { AbiTypeToPrimitiveType } from "abitype";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
	useAccount,
	useChainId,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import { Hex, decodeEventLog } from "viem";
import * as Yup from "yup";
import "../utils/form/validation"; // for Yup Validation
import { useDeployMultiHatSG } from "@/hooks/useHatsSignerGateFactory";
import { HatsSignerGateFactoryAbi } from "@/utils/abi/HatsSignerGateFactory";
import {
	arrayOfHatStrings,
	ethAddressSchema,
	hatIntSchema,
	minThresholdValidation,
	targetThresholdValidation,
} from "../utils/form/validation";
import { useRefetchWrite } from "@/hooks/useRefetchWrite";
import Button from "@/components/ui/CustomButton";
import MultiInput from "@/components/ui/MultiInput/MultiInput";
import CustomInputWrapper from "../components/form/CustomInputWrapper";
import { DeployConfigMHSG } from "@/types/forms";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { extractMhsgAddress } from "../utils/form/extractMhsgAddress";

interface Props {
	setIsPending: (isPending: boolean) => void;
	setData: (data: any) => void;
	formData: DeployConfigMHSG;
	setFormData: (formData: any) => void;
	isPending: boolean;
	setIsSuccessOne: (isSuccessOne: boolean) => void;
	setMhsgAddress: (hsgAddress: Hex | null) => void;
}

export default function MultiHatsSignerGateForm(props: Props) {
	// Destructure Props for ease of use & visibility within this function
	const {
		setIsPending,
		setData,
		formData,
		setFormData,
		isPending,
		setIsSuccessOne,
		setMhsgAddress,
	} = props;

	const [hash, setHash] = useState<Hex | "">("");

	// Used to prevent the user Deploying when not connected
	const { isConnected } = useAccount();
	const chainId = useChainId();

	const {
		config,
		refetch,
		isSuccess: contractPrepared,
	} = useDeployMultiHatSG(formData, chainId);

	const {
		data: contractData,
		isLoading,
		write,
		isError,
	} = useContractWrite(config);

	// console.log('contractData.hash', contractData?.hash);

	// This only runs if "hash" is defined
	// Use this to detect isLoading state in transaction
	const {
		isSuccess,
		isLoading: transactionPending,
		data: transactionData,
	} = useWaitForTransaction({
		hash: contractData?.hash as AbiTypeToPrimitiveType<"address">,
		onSuccess(data) {
			const response = decodeEventLog({
				abi: HatsSignerGateFactoryAbi,
				data: data.logs[3].data,
				topics: data.logs[3].topics,
			});

			setData(response.args);
			console.log("Transaction Success");
		},
	});

	// Get the HsgAddress from the HsgFactory response
	useEffect(() => {
		if (transactionData) {
			const MhsgContractAddress = extractMhsgAddress(transactionData);
			// console.log('MhsgContractAddress: ', MhsgContractAddress);
			setMhsgAddress(MhsgContractAddress);
		}
	}, [transactionData, setMhsgAddress]);
	// console.log('inside hsgForm - render');

	const handleFormSubmit = useRefetchWrite({
		write,
		refetch,
		isError,
		contractPrepared,
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

	// After 'useWaitForTransaction' returns 'isSuccess', update the state above to render next stage
	useEffect(() => {
		setIsSuccessOne(isSuccess);
	}, [setIsSuccessOne, isSuccess]);

	// Custom Validations are in one file for maintainability "validation.tsx"
	const validationSchema = Yup.object().shape({
		_ownerHatId: hatIntSchema,
		_signersHatIds: arrayOfHatStrings,
		_safe: ethAddressSchema,
		_minThreshold: minThresholdValidation(hatIntSchema),
		_targetThreshold: targetThresholdValidation(hatIntSchema),
		_maxSigners: hatIntSchema.greaterThanTarget(),
	});

	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values: DeployConfigMHSG, actions) => {
				// The formData updates state in the parent file -> index.jsx
				setFormData({
					_ownerHatId: values._ownerHatId,
					_signersHatIds: values._signersHatIds,
					_safe: values._safe,
					_minThreshold: values._minThreshold,
					_targetThreshold: values._targetThreshold,
					_maxSigners: values._maxSigners,
				});
				handleFormSubmit();
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
						<MultiInput
							values={formData._signersHatIds}
							label="Signer Hat IDs"
							name="_signersHatIds"
							countLabel="Id"
							placeholder="26960000000000000000000000003152..."
							width={"80%"}
						/>
						<CustomInputWrapper
							name="_safe"
							label="Existing Safe (address)"
							placeholder="0xC8ac0000000000000000000000000000000047fe"
							isReadOnly={true}
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
								!props.isValid ||
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
