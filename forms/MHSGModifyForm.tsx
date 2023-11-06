/* eslint-disable react-hooks/exhaustive-deps */
import { use, useEffect, useRef, useState } from "react";
import {
	useAddSignerHats,
	useGetHatsContract,
	useMaxSigners,
	useMinThreshold,
	useOwnerHat,
	useSetMinThreshold,
	useSetOwnerHat,
	useSetTargetThreshold,
	useTargetThreshold,
} from "@/hooks/useMultiHatsSignerGate";
import * as Yup from "yup";
import {
	arrayOfHatStrings,
	hatIntSchema,
	minThresholdValidation,
	targetThresholdValidation,
} from "@/utils/form/validation";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import CustomInputWrapper from "@/components/form/CustomInputWrapper";
import Button from "@/components/ui/CustomButton";
import { FiSettings } from "react-icons/fi";
import MultiInput from "@/components/ui/MultiInput/MultiInput";
import _ from "lodash";
import { Hex } from "viem";

interface P {
	address?: Hex;
	setIsLoading: (isLoading: boolean) => void;
	setTransaction: (transaction: {
		ownerHat?: string;
		minThreshold?: string;
		maxThreshold?: string;
	}) => void;
}

const MHSGModifyForm: React.FC<P> = (p) => {
	const { data: minThreshold, isLoading: minThresholdIsLoading } =
		useMinThreshold(p.address);
	const { data: maxThreshold, isLoading: maxThresholdIsLoading } =
		useTargetThreshold(p.address);
	const { data: ownerHat, isLoading: ownerHatIsLoading } = useOwnerHat(
		p.address,
	);
	const { data: maxSigners, isLoading: maxSignersIsLoading } = useMaxSigners(
		p.address,
	);
	const { data: hatsContract, isLoading: hatsContractIsLoading } =
		useGetHatsContract(p.address);

	if (
		minThresholdIsLoading ||
		maxThresholdIsLoading ||
		ownerHatIsLoading ||
		hatsContractIsLoading ||
		maxSignersIsLoading
	) {
		return <></>;
	} else {
		return (
			<MHSGForm
				address={p.address}
				minThreshold={minThreshold as string}
				maxThreshold={maxThreshold as string}
				maxSigners={maxSigners as string}
				ownerHat={ownerHat as string}
				hatsContract={hatsContract as Hex}
				newSignerHats={[""]}
				setIsLoading={p.setIsLoading}
				setTransaction={p.setTransaction}
			/>
		);
	}
};

export default MHSGModifyForm;

interface MHSGFormP {
	address?: Hex;
	minThreshold?: string;
	maxThreshold?: string;
	maxSigners?: string;
	ownerHat?: string;
	hatsContract?: Hex;
	newSignerHats?: string[];
	setIsLoading: (isLoading: boolean) => void;
	setTransaction: (transaction: {
		ownerHat?: string;
		minThreshold?: string;
		maxThreshold?: string;
		newSignerHats?: string;
	}) => void;
}
const MHSGForm: React.FC<MHSGFormP> = (p) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		_minThreshold: p.minThreshold?.toString(),
		_targetThreshold: p.maxThreshold?.toString(),
		_ownerHat: p.ownerHat?.toString(),
		_maxSigners: p.maxSigners?.toString(),
		_newSignerHats: p.newSignerHats,
		hatsContract: p.hatsContract,
	});

	const originalFormData = useRef(formData);
	const validationSchema = Yup.object().shape({
		_ownerHat: hatIntSchema,
		_newSignerHats: arrayOfHatStrings,
		_minThreshold: minThresholdValidation(hatIntSchema),
		_targetThreshold: targetThresholdValidation(hatIntSchema),
		_maxSigners: hatIntSchema.greaterThanTarget(),
	});

	// MinThreshold hooks
	const { config: configMinThreshold, refetch: fetchUseMinThreshold } =
		useSetMinThreshold(
			{ _minThreshold: BigInt(formData._minThreshold || 0) },
			p.address,
		);
	const {
		isLoading: setMinThresholdIsLoading,
		isError: setMinThresholdIsError,
		write: writeSetMinThresholdAsync,
		data: useMinThresholdData,
	} = useContractWrite(configMinThreshold);
	const {
		isSuccess: isSetMinThresholdSuccess,
		isError: isSetMinThresholdError,
		isLoading: setMinThresholdtransactionPending,
	} = useWaitForTransaction({
		hash: useMinThresholdData?.hash,
		onSuccess(data) {
			console.log("Transaction Success");
		},
	});

	// MaxThreshold hooks
	const { config: configMaxThreshold, refetch: fetchUseMaxThreshold } =
		useSetTargetThreshold(
			{ _targetThreshold: BigInt(formData._targetThreshold || 0) },
			p.address,
		);
	const {
		isLoading: setMaxThresholdIsLoading,
		isError: setMaxThresholdIsError,
		write: writeSetMaxThresholdAsync,
		data: useMaxThresholdData,
	} = useContractWrite(configMaxThreshold);
	const {
		isSuccess: isSetMaxThresholdSuccess,
		isError: isSetMaxThresholdError,
		isLoading: setMaxThresholdtransactionPending,
	} = useWaitForTransaction({
		hash: useMaxThresholdData?.hash,
		onSuccess(data) {
			console.log("Transaction Success");
		},
	});

	// OwnerHat hooks
	const { config: configOwnerHat, refetch: fetchUseOwnerHat } =
		useSetOwnerHat(
			{
				_ownerHat: BigInt(formData._ownerHat || 0),
				_hatsContract: formData.hatsContract || ("" as Hex),
			},
			p.address,
		);
	const {
		isLoading: setOwnerHatIsLoading,
		isError: setOwnerHatIsError,
		write: writeOwnerHatAsync,
		data: useOwnerHatData,
	} = useContractWrite(configOwnerHat);
	const {
		isSuccess: isSetOwnerHatSuccess,
		isLoading: setOwnerHatPending,
		isError: setOwnerHatError,
	} = useWaitForTransaction({
		hash: useOwnerHatData?.hash,
		onSuccess(data) {
			console.log("Transaction Success");
		},
	});

	// New Signer Hats hooks
	const { config: configSertSignerHats, refetch: fetchSetSignerHats } =
		useAddSignerHats(
			{
				_newSignerHats:
					formData._newSignerHats?.map((hat) => BigInt(hat)) || [],
			},
			p.address,
		);

	const {
		isLoading: addSignerHatIsLoading,
		isError: addSignerHatIsError,
		write: writeaddSignerHatAsync,
		data: useAddSignerHatsData,
	} = useContractWrite(configOwnerHat);
	const {
		isSuccess: isAddSignerHatSuccess,
		isLoading: addSignerHatPending,
		isError: addSIgnerHatsError,
	} = useWaitForTransaction({
		hash: useAddSignerHatsData?.hash,
		onSuccess(data) {
			console.log("Transaction Success");
		},
	});

	useEffect(() => {
		p.setIsLoading(
			setOwnerHatIsLoading ||
				setMaxThresholdIsLoading ||
				setMinThresholdIsLoading ||
				setMinThresholdtransactionPending ||
				setMaxThresholdtransactionPending ||
				setOwnerHatPending ||
				addSignerHatIsLoading ||
				addSignerHatPending,
		);
	}, [
		setOwnerHatIsLoading,
		setMaxThresholdIsLoading,
		setMinThresholdIsLoading,
		setMinThresholdtransactionPending,
		setMaxThresholdtransactionPending,
		setOwnerHatPending,
		addSignerHatIsLoading,
		addSignerHatPending,
	]);

	useEffect(() => {
		if (
			setMinThresholdIsError ||
			isSetMinThresholdError ||
			setMaxThresholdIsError ||
			isSetMaxThresholdError ||
			setOwnerHatIsError ||
			setOwnerHatError ||
			addSignerHatIsError ||
			addSIgnerHatsError
		) {
			setIsSubmitted(false);
		}
	}, [
		setMinThresholdIsError,
		isSetMinThresholdError,
		setMaxThresholdIsError,
		isSetMaxThresholdError,
		setOwnerHatIsError,
		setOwnerHatError,
		addSignerHatIsError,
		addSIgnerHatsError,
	]);

	useEffect(() => {
		if (isSetMinThresholdSuccess) {
			p.setTransaction({
				minThreshold: useMinThresholdData?.hash,
			});
			originalFormData.current._minThreshold = formData._minThreshold;
			setIsSubmitted(false);
		}
	}, [isSetMinThresholdSuccess]);

	useEffect(() => {
		if (isSetMaxThresholdSuccess) {
			p.setTransaction({
				maxThreshold: useMaxThresholdData?.hash,
			});
			originalFormData.current._targetThreshold =
				formData._targetThreshold;
			setIsSubmitted(false);
		}
	}, [isSetMaxThresholdSuccess]);

	useEffect(() => {
		if (isSetOwnerHatSuccess) {
			p.setTransaction({
				ownerHat: useOwnerHatData?.hash,
			});
			originalFormData.current._ownerHat = formData._ownerHat;
			setIsSubmitted(false);
		}
	}, [isSetOwnerHatSuccess]);

	// you are here
	useEffect(() => {
		if (isAddSignerHatSuccess) {
			p.setTransaction({
				newSignerHats: useAddSignerHatsData?.hash,
			});
			originalFormData.current._newSignerHats = formData._newSignerHats;
			setIsSubmitted(false);
		}
	}, [isAddSignerHatSuccess]);

	useEffect(() => {
		if (
			isSubmitted &&
			originalFormData.current._minThreshold !== formData._minThreshold &&
			fetchUseMinThreshold
		) {
			fetchUseMinThreshold().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
					setIsSubmitted(false);
				} else {
					writeSetMinThresholdAsync?.();
				}
			});
		}
	}, [isSubmitted, writeSetMinThresholdAsync]);

	useEffect(() => {
		if (
			isSubmitted &&
			originalFormData.current._targetThreshold !==
				formData._targetThreshold &&
			fetchUseMaxThreshold
		) {
			fetchUseMaxThreshold().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
					setIsSubmitted(false);
				} else {
					writeSetMaxThresholdAsync?.();
				}
			});
		}
	}, [isSubmitted, writeSetMaxThresholdAsync]);

	useEffect(() => {
		if (
			isSubmitted &&
			originalFormData.current._ownerHat !== formData._ownerHat &&
			fetchUseOwnerHat
		) {
			fetchUseOwnerHat().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
					setIsSubmitted(false);
				} else {
					writeOwnerHatAsync?.();
				}
			});
		}
	}, [isSubmitted, writeOwnerHatAsync]);

	useEffect(() => {
		if (
			isSubmitted &&
			!_.isEqual(
				originalFormData.current._newSignerHats,
				formData._newSignerHats,
			) &&
			fetchSetSignerHats
		) {
			fetchSetSignerHats().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
					setIsSubmitted(false);
				} else {
					writeaddSignerHatAsync?.();
				}
			});
		}
	}, [isSubmitted, writeaddSignerHatAsync]);

	return (
		<>
			<Formik
				initialValues={formData}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					setFormData(values);
					setIsSubmitted(true);
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
								label="New Owner Hat ID (integer)"
								placeholder="26960000000000000000000000003152"
								name="_ownerHat"
								width={80}
							/>
							<MultiInput
								values={formData._newSignerHats || []}
								width={"80%"}
								label="Signer Hat IDs"
								name="_newSignerHats"
								countLabel="Id"
								placeholder="26960000000000000000000000003152..."
							/>
							<CustomInputWrapper
								label="Min Threshold (integer)"
								placeholder="3"
								name="_minThreshold"
								width={60}
							/>

							<CustomInputWrapper
								label="Max Threshold (integer)"
								placeholder="3"
								name="_targetThreshold"
								width={60}
							/>

							<Button
								type="submit"
								isDisabled={
									!props.dirty ||
									setOwnerHatIsLoading ||
									setMaxThresholdIsLoading ||
									setMinThresholdIsLoading ||
									setMinThresholdtransactionPending ||
									setMaxThresholdtransactionPending ||
									setOwnerHatPending
								}
								leftIcon={<FiSettings />}
							>
								Modify
							</Button>
						</VStack>
					</Form>
				)}
			</Formik>
		</>
	);
};
