import { VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import MultiHatsSignerGateAndSafeForm from "@/forms/MultiHatsSignerGateAndSafeForm";
import Deploy from "@/components/DeployButtons";
import MainContent from "@/components/MainContent";
import { DEPLOY_ACTIONS } from "@/utils";
import VariableExplanations from "@/components/form/VariableExplanations";
import TransactionDetails from "@/components/form/TransactionDetails";
import { SafeAttachMessage } from "@/components/form/SafeAttachMessage";

const MHSGWS = () => {
	const [isPending, setIsPending] = useState(false);
	const [data, setData] = useState(undefined);
	const [formData, setFormData] = useState({
		_ownerHatId: "",
		_signersHatIds: [""],
		_minThreshold: "",
		_targetThreshold: "",
		_maxSigners: "",
	});
	const [transactionHash, setTransactionHash] = useState<string | undefined>(
		undefined,
	);
	const headerOne = () => (
		<VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
			<Text as="b">Hats Signer Gate Factory</Text>
			<Text>Select the type of Hats Signer Gate to deploy</Text>
		</VStack>
	);
	const headerTwo = () => (
		<VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
			<Text as="b">Deploy Multi Hats Signer Gate + Safe</Text>
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
	const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_MHSG_W_S} />;

	// on successful submit remove from middle column input form
	const contentTwo = () => (
		<>
			{!transactionHash && (
				<MultiHatsSignerGateAndSafeForm
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
			{!isPending && !data && (
				<VStack height="100%" alignItems="flex-start" gap={"8px"}>
					{!isPending && !data && <VariableExplanations />}
				</VStack>
			)}
			{data && !isPending && transactionHash && (
				<TransactionDetails
					type="MHSG"
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

export default MHSGWS;
