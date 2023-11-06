import { VStack, Text, Link } from "@chakra-ui/react";
import { useNetwork } from "wagmi";
import {
	displayAddress,
	getBlockExplorerUrl,
	getSafeAppUrlPrefix,
} from "@/utils";
import {
	useOwnerHat,
	useSafe,
	useSignersHatId,
} from "@/hooks/useHatsSignerGate";
import ValidSignerCount from "@/components/ui/ValidSignerCount";
import MinThreshold from "@/components/ui/MinThreshold";
import MaxThreshold from "@/components/ui/MaxThreshold";
import MaxSigners from "@/components/ui/MaxSigners";
import { Hex } from "viem";
import { hatIdDecimalToIp } from "@hatsprotocol/sdk-v1-core";

interface P {
	address?: Hex;
}

const HSGView: React.FC<P> = (p) => {
	const { chain } = useNetwork();
	const { data: safeData } = useSafe(p.address);
	const { data: ownerHatID } = useOwnerHat(p.address);
	const { data: signerHatID } = useSignersHatId(p.address);

	if (!p.address || !safeData) return null;

	return (
		<VStack gap="24px" alignItems="flex-start">
			<VStack alignItems="flex-start">
				<Text as="b">HSG Contract Address</Text>
				<Link
					href={`${getBlockExplorerUrl(chain?.id || 1)}/address/${
						p.address
					}`}
					target="_blank"
					wordBreak="break-word"
				>
					{displayAddress(p.address)}
				</Link>
			</VStack>
			<VStack alignItems="flex-start">
				<Text as="b">Safe Address</Text>
				<Link
					href={`${getSafeAppUrlPrefix(chain?.id)}${safeData}`}
					target="_blank"
					wordBreak="break-word"
				>
					{displayAddress(safeData as Hex)}
				</Link>
			</VStack>
			<VStack alignItems="flex-start">
				<Text as="b">Owner Hat ID</Text>
				<Text wordBreak="break-word">
					{hatIdDecimalToIp(BigInt(ownerHatID as string))}
				</Text>
			</VStack>
			<VStack alignItems="flex-start">
				<Text as="b">Signer Hat ID</Text>
				<Text wordBreak="break-word">
					{hatIdDecimalToIp(BigInt(signerHatID as string))}
				</Text>
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

export default HSGView;
