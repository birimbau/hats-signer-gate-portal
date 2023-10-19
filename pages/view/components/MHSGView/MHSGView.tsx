import { VStack, Text, Link } from "@chakra-ui/react";
import {
	getBlockExplorerUrl,
	getSafeAppUrlPrefix,
} from "../../../../utils/utils";
import { useNetwork } from "wagmi";
import {
	useOwnerHat,
	useSafe,
} from "../../../../utils/hooks/MultiHatsSignerGate";
import MinThreshold from "./components/MinThreshold/MinThreshold";
import MaxThreshold from "./components/MaxThreshold/MaxThreshold";
import MaxSigners from "./components/MaxSigners/MaxSigners";
import ValidSignerCount from "./components/ValidSignerCount/ValidSignerCount";
import { EthereumAddress } from "../../../../components/Deployers/forms/utils/ReadForm";

interface P {
	address?: EthereumAddress;
}

const MHSGView: React.FC<P> = (p) => {
	const { chain } = useNetwork();
	const { data: safeData } = useSafe(p.address);
	const { data: ownerHatID } = useOwnerHat(p.address);

	return (
		<VStack gap="24px" alignItems="flex-start">
			<VStack alignItems="flex-start">
				<Text as="b">MHSG Contract Address</Text>
				<Link
					href={`${getBlockExplorerUrl(chain?.id || 1)}/address/${
						p.address
					}`}
					target="_blank"
					wordBreak="break-word"
				>
					{p.address}
				</Link>
			</VStack>
			<VStack alignItems="flex-start">
				<Text as="b">Safe Address</Text>
				<Link
					href={`${getSafeAppUrlPrefix(chain?.id)}${safeData}`}
					target="_blank"
					wordBreak="break-word"
				>
					{safeData as string}
				</Link>
			</VStack>
			<VStack alignItems="flex-start">
				<Text as="b">Owner Hat ID</Text>
				<Text wordBreak="break-word">{ownerHatID?.toString()}</Text>
			</VStack>
			<VStack alignItems="flex-start">
				<MinThreshold address={p.address} />
				<MaxThreshold address={p.address} />
				<MaxSigners address={p.address} />
			</VStack>
			<ValidSignerCount address={p.address} />
		</VStack>
	);
};

export default MHSGView;
