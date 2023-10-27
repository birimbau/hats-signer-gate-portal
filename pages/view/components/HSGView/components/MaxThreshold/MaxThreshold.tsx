import { EthereumAddress } from "../../../../../../components/Deployers/forms/utils/ReadForm";
import { useTargetThreshold } from "../../../../../../utils/hooks/HatsSignerGate";

interface P {
	address?: EthereumAddress;
}

const MaxThreshold: React.FC<P> = (p) => {
	const { data: maxThreshold } = useTargetThreshold(p.address);
	return <div>Max Threshold = {maxThreshold?.toString()}</div>;
};

export default MaxThreshold;
