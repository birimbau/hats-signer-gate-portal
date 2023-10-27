import { useEffect, useRef, useState } from "react";
import { EthereumAddress } from "../../../components/Deployers/forms/utils/ReadForm";
import {
	useGetHatsContract,
	useMaxSigners,
	useMinThreshold,
	useOwnerHat,
	useSetMinThreshold,
	useSetOwnerHat,
	useSetTargetThreshold,
	useTargetThreshold,
} from "../../../utils/hooks/MultiHatsSignerGate";
import * as Yup from "yup";
import {
	hatIntSchema,
	minThresholdValidation,
	targetThresholdValidation,
} from "../../../components/Deployers/forms/utils/validation";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import CustomInputWrapper from "../../../components/Deployers/forms/utils/CustomInputWrapper";
import Button from "../../../components/UI/CustomButton/CustomButton";
import { FiSettings } from "react-icons/fi";

interface P {
	address?: EthereumAddress;
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
				hatsContract={hatsContract as EthereumAddress}
				setIsLoading={p.setIsLoading}
				setTransaction={p.setTransaction}
			/>
		);
	}
};

export default MHSGModifyForm;

interface MHSGFormP {
	address?: EthereumAddress;
	minThreshold?: string;
	maxThreshold?: string;
	maxSigners?: string;
	ownerHat?: string;
	hatsContract?: EthereumAddress;
	setIsLoading: (isLoading: boolean) => void;
	setTransaction: (transaction: {
		ownerHat?: string;
		minThreshold?: string;
		maxThreshold?: string;
	}) => void;
}
const MHSGForm: React.FC<MHSGFormP> = (p) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		_minThreshold: p.minThreshold?.toString(),
		_targetThreshold: p.maxThreshold?.toString(),
		_ownerHat: p.ownerHat?.toString(),
		_maxSigners: p.maxSigners?.toString(),
		hatsContract: p.hatsContract,
	});

	const originalFormData = useRef(formData);
	const validationSchema = Yup.object().shape({
		_ownerHat: hatIntSchema,
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
		writeAsync: writeSetMinThresholdAsync,
		data: useMinThresholdData,
	} = useContractWrite(configMinThreshold);
	const {
		isSuccess: isSetMinThresholdSuccess,
		isError: isSetMinThresholdError,
		isLoading: setMinThresholdtransationPending,
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
		writeAsync: writeSetMaxThresholdAsync,
		data: useMaxThresholdData,
	} = useContractWrite(configMaxThreshold);
	const {
		isSuccess: isSetMaxThresholdSuccess,
		isError: isSetMaxThresholdError,
		isLoading: setMaxThresholdtransationPending,
	} = useWaitForTransaction({
		hash: useMaxThresholdData?.hash,
		onSuccess(data) {
			console.log("Transaction Success");
		},
	});

	// OwnerHat hooks
	const { config, refetch: fetchUseOwnerHat } = useSetOwnerHat(
		{
			_ownerHat: BigInt(formData._ownerHat || 0),
			_hatsContract: formData.hatsContract || ("" as EthereumAddress),
		},
		p.address,
	);
	const {
		isLoading: setOwnerHatIsLoading,
		isError: setOwnerHatIsError,
		writeAsync: writeOwnerHatAsync,
		data: useOwnerHatData,
	} = useContractWrite(config);
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

	useEffect(() => {
		p.setIsLoading(
			setOwnerHatIsLoading ||
				setMaxThresholdIsLoading ||
				setMinThresholdIsLoading ||
				setMinThresholdtransationPending ||
				setMaxThresholdtransationPending ||
				setOwnerHatPending,
		);
	}, [
		setOwnerHatIsLoading,
		setMaxThresholdIsLoading,
		setMinThresholdIsLoading,
		setMinThresholdtransationPending,
		setMaxThresholdtransationPending,
		setOwnerHatPending,
	]);

	useEffect(() => {
		if (
			setMinThresholdIsError ||
			isSetMinThresholdError ||
			setMaxThresholdIsError ||
			isSetMaxThresholdError ||
			setOwnerHatIsError ||
			setOwnerHatError
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

	useEffect(() => {
		if (
			isSubmitted &&
			originalFormData.current._minThreshold !== formData._minThreshold &&
			fetchUseMinThreshold &&
			writeSetMinThresholdAsync
		) {
			fetchUseMinThreshold().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
				} else {
					writeSetMinThresholdAsync?.();
				}
			});
		}

		if (
			isSubmitted &&
			originalFormData.current._targetThreshold !==
				formData._targetThreshold &&
			fetchUseMaxThreshold &&
			writeSetMaxThresholdAsync
		) {
			fetchUseMaxThreshold().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
				} else {
					writeSetMaxThresholdAsync?.();
				}
			});
		}

		if (
			isSubmitted &&
			originalFormData.current._ownerHat !== formData._ownerHat &&
			fetchUseOwnerHat &&
			writeOwnerHatAsync
		) {
			fetchUseOwnerHat().then((data) => {
				if (data.status === "error") {
					alert(data.error.message);
				} else {
					writeOwnerHatAsync?.();
				}
			});
		}
	}, [isSubmitted]);

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
							/>
							<CustomInputWrapper
								label="Min Threshold (integer)"
								placeholder="3"
								name="_minThreshold"
							/>

							<CustomInputWrapper
								label="Max Threshold (integer)"
								placeholder="3"
								name="_targetThreshold"
							/>

							<Button
								type="submit"
								isDisabled={
									!props.dirty ||
									setOwnerHatIsLoading ||
									setMaxThresholdIsLoading ||
									setMinThresholdIsLoading ||
									setMinThresholdtransationPending ||
									setMaxThresholdtransationPending ||
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
