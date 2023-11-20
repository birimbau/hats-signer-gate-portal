import { useChainId, useContractWrite } from "wagmi";
import Button from "@/components/ui/CustomButton";
import { LuFileEdit } from "react-icons/lu";
import { useClaimSigner } from "@/hooks/useHatsSignerGate";
import { Hex } from "viem";

interface P {
	address?: Hex;
	onLoading: (value: boolean) => void;
	onTransactionComplete: (transaction: any) => void;
}

const HSGClaimForm: React.FC<P> = (p) => {
	const chainId = useChainId();
	const { config, refetch } = useClaimSigner(p.address, chainId);
	const { writeAsync } = useContractWrite(config);

	// TODO transaction complete on `useWaitForTransaction`

	return (
		<>
			<Button
				leftIcon={<LuFileEdit />}
				mt="24px"
				onClick={() => {
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
				Claim
			</Button>
		</>
	);
};

export default HSGClaimForm;
