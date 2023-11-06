import { useTargetThreshold } from "@/hooks/useHatsSignerGate";
import { Hex } from "viem";

interface P {
	address?: Hex;
}

const MaxThreshold: React.FC<P> = (p) => {
	const { data: maxThreshold } = useTargetThreshold(p.address);
	return <div>Max Threshold = {maxThreshold?.toString()}</div>;
};

export default MaxThreshold;
