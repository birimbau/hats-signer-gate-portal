import { useValidSignerCount } from "@/hooks/useHatsSignerGate";
import { Hex } from "viem";

interface P {
	address?: Hex;
}

const ValidSignerCount: React.FC<P> = (p) => {
	const { data: validSignerCount } = useValidSignerCount(p.address);

	return (
		<div>Valid Signer Count = {(validSignerCount as any)?.toString()}</div>
	);
};

export default ValidSignerCount;
