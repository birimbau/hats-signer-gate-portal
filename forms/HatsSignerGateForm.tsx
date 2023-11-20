/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDeployHSG } from "@/hooks/useHatsSignerGateFactory";
import { HatsSignerGateFactoryAbi } from "@/utils/abi/HatsSignerGateFactory";
import {
	ethAddressSchema,
	hatIntSchema,
	minThresholdValidation,
	targetThresholdValidation,
} from "@/utils/form/validation";
import { useRefetchWrite } from "@/hooks/useRefetchWrite";
import Button from "@/components/ui/CustomButton";
import CustomInputWrapper from "@/components/form/CustomInputWrapper";
import { DeployConfigHSG } from "@/types/forms";
import { extractHsgAddress } from "@/utils/form/extractHsgAddress";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

interface Props {
	setIsPending: (isPending: boolean) => void;
	formData: DeployConfigHSG;
	setFormData: (formData: any) => void;
	isPending: boolean;
	setHsgAddress: (hsgAddress: Hex | null) => void;
	setIsSuccessOne: (isSuccess: boolean) => void;
	setData: (data: any) => void;
}

export default function HatsSignerGateForm(props: Props) {
	// Destructure Props for ease of use & visibility within this function
	const {
		setIsPending,
		formData,
		setFormData,
		isPending,
		setHsgAddress,
		setIsSuccessOne,
		setData,
	} = props;

	const [hash, setHash] = useState<Hex | "">("");

	// Used to prevent the user Deploying when not connected
	const { isConnected } = useAccount();
	const chainId = useChainId();

	// console.log('inside hsgForm - formData: ', formData);

	const {
		config,
		refetch,
		isSuccess: contractPrepared,
	} = useDeployHSG(formData, chainId);
	const {
		data: contractData,
		isLoading,
		write,
		isError,
	} = useContractWrite(config);
	// console.log(contractData?.hash);

	// This only runs if "hash" is defined
	// Use this to detect isLoading state in transaction and update user interface
	const {
		isSuccess,
		isLoading: transactionPending,
		data: transactionData,
	} = useWaitForTransaction({
		hash: contractData?.hash as AbiTypeToPrimitiveType<"address">,
		onSuccess(data) {
			if (data && data.logs && data.logs.length > 3 && data.logs[3]) {
				const response = decodeEventLog({
					abi: HatsSignerGateFactoryAbi,
					data: data.logs[3].data,
					topics: data.logs[3].topics,
				});

				setData(response.args);
				console.log("Transaction Success");
			} else {
				console.error("Unexpected data structure:", data);
			}
		},
	});

	// Get the HsgAddress from the HsgFactory response
	useEffect(() => {
		if (transactionData) {
			const HsgContractAddress = extractHsgAddress(transactionData);
			// console.log('HsgContractAddress: ', HsgContractAddress);
			setHsgAddress(HsgContractAddress);
		}
	}, [transactionData]);

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
		_signerHatId: hatIntSchema,
		_safe: ethAddressSchema,
		_minThreshold: minThresholdValidation(hatIntSchema),
		_targetThreshold: targetThresholdValidation(hatIntSchema),
		_maxSigners: hatIntSchema.greaterThanTarget(),
	});

	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values: DeployConfigHSG, actions) => {
				// The formData updates state in the parent file -> index.jsx
				// console.log('inside hsgForm - submit');

				setFormData({
					_ownerHatId: values._ownerHatId,
					_signerHatId: values._signerHatId,
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
						<CustomInputWrapper
							name="_signerHatId"
							label="Signer Hat ID (integer)"
							placeholder="26960000000000000000000000003152..."
							width={80}
						/>
						<CustomInputWrapper
							name="_safe"
							label="Existing Safe (address)"
							placeholder="0xC8ac0000000000000000000000000000000047fe"
							width={80}
							isReadOnly={true}
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

// Example transaction from HSG factory
// const transactionReceipt = {
//   blockHash:
//     '0x5d5f9c5c1b47655a1d7bae510efe202a5d3aa11a4c7f88fcda3cdb6cd5e4852f',
//   blockNumber: 9781091,
//   contractAddress: null,
//   cumulativeGasUsed: 584637,
//   effectiveGasPrice: 1500000011,
//   from: '0xc56a789558a0dec88b99c11a887460301d016cf7',
//   gasUsed: 304422,
//   logs: [
//     {
//       address: '0xb674e846c3340e5eac66acb97594b958206ca867',
//       blockHash:
//         '0x5d5f9c5c1b47655a1d7bae510efe202a5d3aa11a4c7f88fcda3cdb6cd5e4852f',
//       blockNumber: 9781091,
//       data: '0x',
//       logIndex: 6,
//       topics: [
//         '0xc582b0d6f8160692b7d6f285c9111242fa38c5dcb8616fc9c8453e9b7ad0f22b',
//         '0x0000000000000000000000000000000000000000000000000000000000000001',
//         '0x0000000000000000000000003bc1a0ad72417f2d411118085256fc53cbddd137',
//       ],
//       transactionHash:
//         '0xb5f2ada01a99699a31e4b4ecad03478626e3b0470e2ad3d2ecfe71e337e9819c',
//       transactionIndex: 6,
//     },
//     // ... other log entries ...
//     {
//       address: '0xa1fb14b5f322651e20f06ee2f2681b8f380bbb0e',
//       blockHash:
//         '0x5d5f9c5c1b47655a1d7bae510efe202a5d3aa11a4c7f88fcda3cdb6cd5e4852f',
//       blockNumber: 9781091,
//       data: '0x000000000000000000000000b674e846c3340e5eac66acb97594b958206ca86700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2bd60183b54cc628df709c7a78ec67a7b6dc827000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000005',
//       logIndex: 9,
//       topics: [
//         '0x7272cee601084fb7bb4c747abc7213dabe88e27e27133d9390e9a56b1c46690e',
//       ],
//       transactionHash:
//         '0xb5f2ada01a99699a31e4b4ecad03478626e3b0470e2ad3d2ecfe71e337e9819c',
//       transactionIndex: 6,
//     },
//   ],
//   logsBloom:
//     '0x00000002000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000001000000000000040000004000000000000000000000000000000000000000040000000000000040020000000000000000000000000028010000080000000000000300000000400000000000000000000000040000000000100020000000000080000400800000000000000000000000020000000000000404000000000000000000000000000000000000000000000000000000000000040000000002000000000000000000000040000000008000000000040000000080000000000110000004000000000000000000',
//   status: 'success',
//   to: '0xa1fb14b5f322651e20f06ee2f2681b8f380bbb0e',
//   transactionHash:
//     '0xb5f2ada01a99699a31e4b4ecad03478626e3b0470e2ad3d2ecfe71e337e9819c',
//   transactionIndex: 6,
//   type: 'eip1559',
// };

// console.log(extractHsgAddress(transactionReceipt));
