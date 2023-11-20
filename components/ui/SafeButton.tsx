import { BsSafe } from "react-icons/bs";
import Button from "@/components/ui/CustomButton";
import { useSafe } from "@/hooks/useHatsSignerGate";
import { useNetwork } from "wagmi";
import { getSafeAppUrlPrefix } from "@/utils";
import { Hex } from "viem";
import { Link } from "@chakra-ui/react";

interface P {
	address?: Hex;
	type: "HSG" | "MHSG";
}

const SafeButton: React.FC<P> = (p) => {
	if (p.type === "HSG") {
		return <HSGSafeButton address={p.address}></HSGSafeButton>;
	} else {
		return <MHSGSafeButton address={p.address}></MHSGSafeButton>;
	}
};

interface HSGSafeButtonP {
	address?: Hex;
}

const HSGSafeButton: React.FC<HSGSafeButtonP> = (p) => {
	const { data: safe } = useSafe(p.address);
	const { chain } = useNetwork();

	return (
		<Link href={`${getSafeAppUrlPrefix(chain?.id)}${safe}`} isExternal>
			<Button leftIcon={<BsSafe />} minWidth="60%">
				View Safe
			</Button>
		</Link>
	);
};

const MHSGSafeButton: React.FC<HSGSafeButtonP> = (p) => {
	const { data: safe } = useSafe(p.address);
	const { chain } = useNetwork();

	return (
		<Link href={`${getSafeAppUrlPrefix(chain?.id)}${safe}`} isExternal>
			<Button leftIcon={<BsSafe />} minWidth="60%">
				View Safe
			</Button>
		</Link>
	);
};

export default SafeButton;
