import { VStack, Text } from "@chakra-ui/react";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "../../../../utils/utils";
import { useOwnerHat, useSafe, useSignersHatId } from "../../../../utils/hooks/HatsSignerGate";
import ValidSignerCount from "./components/ValidSignerCount/ValidSignerCount";
import MinThreshold from "./components/MinThreshold/MinThreshold";
import MaxThreshold from "./components/MaxThreshold/MaxThreshold";
import MaxSigners from "./components/MaxSigners/MaxSigners";

interface P {
    address: string;
}

const HSGView: React.FC<P> = (p) => {
    const { chain } = useNetwork();
    const { data: safeData } = useSafe(p.address);
    const { data: ownerHatID } = useOwnerHat(p.address);
    const { data: signerHatID } = useSignersHatId(p.address);

    return (
        <VStack gap="24px" alignItems="flex-start">
            <VStack alignItems="flex-start">
                <Text as='b'>HSG Contract Address</Text>
                <a href={`${getBlockExplorerUrl(chain?.id || 1)}/address/${
                        p.address
                    }`} target="_blank">{p.address}</a>
            </VStack>
            <VStack alignItems="flex-start"> 
                <Text as='b'>Safe Address</Text>
                <a href={`https://app.safe.global/home?safe=gor:${safeData}`} target="_blank">{safeData}</a>
            </VStack>
            <VStack alignItems="flex-start">
                <Text as='b'>Owner Hat ID</Text>
                <Text>{ownerHatID?.toString()}</Text>
            </VStack>
            <VStack alignItems="flex-start">
                <Text as='b'>Signer Hat ID</Text>
                <Text>{signerHatID?.toString()}</Text>
            </VStack>
            <VStack alignItems="flex-start">
                <MinThreshold address={p.address} />
                <MaxThreshold address={p.address} />
                <MaxSigners address={p.address} />
            </VStack>
                <ValidSignerCount address={p.address} />
        </VStack>
    )
}

export default HSGView;