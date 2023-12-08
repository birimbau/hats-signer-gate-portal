import { useChainId, useContractWrite } from "wagmi";
import { useClaimSigner } from "@/hooks/useHatsSignerGate";
import { useState } from "react";
import { Form, Formik } from "formik";
import CustomInputWrapper from "@/components/form/CustomInputWrapper";
import Button from "@/components/ui/CustomButton";
import { LuFileEdit } from "react-icons/lu";
import { VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import { Hex } from "viem";

interface P {
	address?: Hex;
	onLoading: (value: boolean) => void;
	onTransactionComplete: (transaction: any) => void;
}

const MHSGClaimForm: React.FC<P> = (p) => {
	const [formData, setFormData] = useState({
		_hatId: BigInt(0),
	});
	const chainId = useChainId();

	const { config, refetch } = useClaimSigner(p.address, chainId);
	const {
		data: transactionData,
		isLoading,
		error,
		writeAsync,
	} = useContractWrite(config);

	const validationSchema = Yup.object().shape({
		_hatId: Yup.string().required("Required"),
	});
	return (
		<Formik
			initialValues={formData}
			validationSchema={validationSchema}
			onSubmit={(values, _actions) => {
				setFormData(values);
				refetch?.().then((data) => {
					if (data.status === "error") {
						alert(data.error.message);
					} else {
						writeAsync?.().then((data) => {
							p.onTransactionComplete(data.hash);
						});
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
							label="Hat Id"
							placeholder="0xC8ac0000000000000000000000000000000047fe"
							name="_hatId"
						/>

						<Button
							leftIcon={<LuFileEdit />}
							type="submit"
							disabled={!props.dirty || isLoading}
						>
							Claim
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default MHSGClaimForm;
