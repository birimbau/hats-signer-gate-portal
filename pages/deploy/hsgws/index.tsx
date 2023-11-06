import { VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import HatsSignerGateAndSafeForm from "@/forms/HatsSignerGateAndSafeForm";
import Deploy from "@/components/DeployButtons";
import MainContent from "@/components/MainContent";
import { DEPLOY_ACTIONS } from "@/utils";
import { DeployConfigHSGWS } from "@/types/forms";
import VariableExplanations from "@/components/form/VariableExplanations";
import { SafeAttachMessage } from "@/components/form/SafeAttachMessage";
import TransactionDetails from "@/components/form/TransactionDetails";

const HSGWS = () => {
	const [isPending, setIsPending] = useState<boolean>(false);
	const [data, setData] = useState(undefined);
	const [formData, setFormData] = useState<DeployConfigHSGWS>({
		_ownerHatId: "",
		_signerHatId: "",
		_minThreshold: "",
		_targetThreshold: "",
		_maxSigners: "",
	});
	const [transactionHash, setTransactionHash] = useState(undefined);
	const headerOne = () => (
		<VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
			<Text as="b">Hats Signer Gate Factory</Text>
			<Text>Select the type of Hats Signer Gate to deploy</Text>
		</VStack>
	);
	const headerTwo = () => (
		<VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
			<Text as="b">Deploy Hats Signer Gate + Safe</Text>
			<Text>Enter inputs, click ‘Deploy’</Text>
		</VStack>
	);
	const headerThree = () => (
		<>
			{isPending && (
				<SafeAttachMessage
					text="Transaction pending..."
					color="black"
					safeData=""
				/>
			)}
			{data && !isPending && (
				<SafeAttachMessage
					text="Transaction Complete"
					color="black"
					safeData=""
				/>
			)}
		</>
	);
	const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_HSG_W_S} />;
	const contentTwo = () => (
		<>
			{/* Once a successful transaction is complete, remove input fields */}
			{!data && (
				<HatsSignerGateAndSafeForm
					setIsPending={setIsPending}
					setData={setData}
					setTransactionHash={setTransactionHash}
					formData={formData}
					setFormData={setFormData}
					isPending={isPending}
				/>
			)}
		</>
	);

	const contentThree = () => (
		<>
			{!isPending && !data && <VariableExplanations />}
			{data && !isPending && transactionHash && (
				<TransactionDetails
					type="HSG"
					data={data}
					transactionHash={transactionHash}
					formData={formData}
				/>
			)}
		</>
	);

	return (
		<MainContent
			headerOne={headerOne()}
			headerTwo={headerTwo()}
			headerThree={headerThree()}
			contentOne={contentOne()}
			contentTwo={contentTwo()}
			contentThree={contentThree()}
		/>
	);
};

export default HSGWS;
