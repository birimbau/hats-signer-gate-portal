import { useChainId, useContractWrite, useWaitForTransaction } from "wagmi";
import Button from "@/components/ui/CustomButton";
import { useRemoveSigner } from "@/hooks/useHatsSignerGate";
import { useEffect, useState } from "react";
import { CgUserRemove } from "react-icons/cg";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import CustomInputWrapper from "../components/form/CustomInputWrapper";
import { ethAddressSchema } from "../utils/form/validation";
import { AbiTypeToPrimitiveType } from "abitype";
import { Hex } from "viem";

interface P {
	hsgAddress: Hex;
	onTransactionComplete: (transaction: any) => void;
	setIsErrorOne: (value: boolean) => void;
	setIsErrorTwo: (value: boolean) => void;
	setIsPending: (isPending: boolean) => void;
}

interface StateType {
	_signer: Hex | undefined;
}

const HSGRemoveForm: React.FC<P> = (p) => {
	const {
		setIsErrorOne,
		setIsErrorTwo,
		setIsPending,
		onTransactionComplete,
	} = p;
	const chainId = useChainId();

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [refetchNow, setRefetchNow] = useState(false);
	const [formData, setFormData] = useState<StateType>({
		_signer: undefined,
	});

	console.log("p.hsgAddress: ", p.hsgAddress);
	console.log("formData._signer: ", formData._signer);
	const { config, refetch, error } = useRemoveSigner(
		p.hsgAddress,
		formData._signer,
		chainId,
	);

	const {
		data: contractData,
		isLoading,
		isError: isWriteError,
		error: writeError,
		writeAsync,
	} = useContractWrite(config);

	// This only runs if "hash" is defined
	// Use this to detect isLoading state in transaction and update user interface
	const { isLoading: transactionPending } = useWaitForTransaction({
		hash: contractData?.hash,
	});

	const validationSchema = Yup.object().shape({
		_signer: ethAddressSchema,
	});

	// LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
	// useEffect for handling refetch
	useEffect(() => {
		if (isSubmitted && refetchNow) {
			setRefetchNow(false);
			refetch();
		}
	}, [isSubmitted, refetchNow, refetch]);

	// useEffect for handling writeAsync
	useEffect(() => {
		if (isSubmitted && writeAsync) {
			setIsSubmitted(false);
			writeAsync?.()
				.then((data) => {
					onTransactionComplete(data.hash);
				})
				.catch((err) => {
					// This catch is for a rejection of the transaction or other errors.
					// if the user rejects, do nothing.
					// if there is another error, alert user

					if (err.message.includes("User rejected the request")) {
					} else alert(err.message);
				});
		}
	}, [isSubmitted, writeAsync, onTransactionComplete]);

	// useEffect for handling errors
	useEffect(() => {
		if (isSubmitted && error) {
			// Handle the error from useRemoveSigner
			if (error) {
				console.error("Error from useContractWrite:", error);

				// Reset error states to their default
				setIsErrorOne(false);
				setIsErrorTwo(false);

				if (error.message.includes("StillWearsSignerHat")) {
					setIsErrorOne(true);
				} else if (error.message.includes("FailedExecRemoveSigner")) {
					setIsErrorTwo(true);
				}
			}
		}
	}, [isSubmitted, error, setIsErrorOne, setIsErrorTwo]);

	// If user aborts transaction, reset status
	useEffect(() => {
		setIsSubmitted(false);
	}, [isWriteError]);

	// This is used to update the parent's display status
	useEffect(() => {
		setIsPending(isLoading || transactionPending);
	}, [isLoading, transactionPending, setIsPending]);

	useEffect(() => {
		if (isWriteError && writeError) {
			if (writeError.message.includes("User rejected the request")) {
				// Handle the specific error here
				console.log("Transaction was rejected by the user.");
				// You can also set some state or trigger alerts/modals to inform the user
			} else {
				console.error("An error occurred:", writeError.message);
			}
		}
	}, [isWriteError, writeError]); // Monitor changes in isError and error properties

	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values, _actions) => {
				console.log("submit");
				setFormData(values);

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
							label="Signer Wallet (address)"
							placeholder="0xC8ac0000000000000000000000000000000047fe"
							name="_signer"
						/>

						<Button
							leftIcon={<CgUserRemove />}
							type="submit"
							disabled={!props.dirty || isLoading}
						>
							Remove
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default HSGRemoveForm;
// This only runs once on user submit, avoiding unnecessary calls to hooks.
// useEffect(() => {
//   if (isSubmitted) {
//     if (refetchNow) {
//       setRefetchNow(false);
//       refetch();
//     }

//     if (writeAsync) {
//       setIsSubmitted(false);
//       writeAsync?.();
//     }
//   }
// }, [isSubmitted, refetchNow, refetch, writeAsync]);
