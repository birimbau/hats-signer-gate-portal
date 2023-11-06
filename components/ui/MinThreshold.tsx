import { useMinThreshold } from "@/hooks/useHatsSignerGate";
import { Hex } from "viem";

interface P {
	address?: Hex;
}

const MinThreshold: React.FC<P> = (p) => {
	const { data: minThreshold } = useMinThreshold(p.address);

	return <div>Min Threshold = {minThreshold?.toString()}</div>;
};

export default MinThreshold;
