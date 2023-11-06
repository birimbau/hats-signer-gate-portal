import { useMaxSigners } from "@/hooks/useHatsSignerGate";
import { Hex } from "viem";

interface P {
	address?: Hex;
}

const MaxSigners: React.FC<P> = (p) => {
	// ? calling same fn as mhsg
	const { data: maxSigners } = useMaxSigners(p.address);
	// const { data: mhsgMaxSigners } = useMHSGMaxSigners(p.address);

	return <div>Max Signers = {maxSigners?.toString()}</div>;
};

export default MaxSigners;
