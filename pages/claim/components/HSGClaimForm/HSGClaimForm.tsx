import { useContractWrite } from "wagmi";
import Button from "../../../../components/UI/CustomButton/CustomButton";
import { LuEdit } from "react-icons/lu";
import { useClaimSigner } from "../../../../utils/hooks/HatsSignerGate";
import { EthereumAddress } from "../../../../components/Deployers/forms/utils/ReadForm";

interface P {
	address?: EthereumAddress;
	onLoading: (value: boolean) => void;
	onTransationComplete: (transation: any) => void;
}

const HSGClaimForm: React.FC<P> = (p) => {
	const { config, refetch } = useClaimSigner(p.address);
	const { writeAsync } = useContractWrite(config);

	return (
		<>
			<Button
				leftIcon={<LuEdit />}
				mt="24px"
				onClick={() => {
					refetch?.().then((data) => {
						if (data.status === "error") {
							alert(data.error.message);
						} else {
							writeAsync?.().then((data) => {
								p.onTransationComplete(data.hash);
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
