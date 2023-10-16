import { VStack, Text } from "@chakra-ui/react";
import MainContent from "../../components/MainContent/MainContent";
import CheckHatsContract from "../claim/components/CheckHatsContract/CheckHatsContract";
import { useState } from "react";
import HSGView from "../view/components/HSGView/HSGView";
import MHSGView from "../view/components/MHSGView/MHSGView";
import HSGModifyForm from "./HSGModifyForm/HSGModifyForm";

const ModifyPage: React.FC = () => {
    const [result, setResult] = useState<undefined | { isHsg: boolean, isMhsg: boolean }>(undefined);
    const [address, setAddress] = useState<undefined | `0x${string}`>(undefined);

    const headerOne = () => {
        if (result) {
            return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
                <Text as="b">Current HSG Parameters</Text>
            </VStack>
        }

        return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
            <Text as="b">Modify Hats Signer Gate Contract</Text>
            <Text>Connect owner wallet, click ‘Fetch’</Text>
        </VStack>
    }

    const headerTwo = () => {
        if (result) {
            return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
                <Text as='b'>Modify {result.isHsg ? 'HSG' : 'MHSG'} Owner, Thresholds</Text>
                <Text>Enter one or more inputs, click ‘Modify’</Text>
            </VStack>
        }

        return <></>
    }

    const contentOne = () => {
        if (result?.isHsg) {
            return <HSGView address={address} />
        }

        if (result?.isMhsg) {
            return <MHSGView address={address} />
        }

        return <>
            <CheckHatsContract onResult={(result, address) => {
                setResult(result);
                setAddress(address);
            }} />
        </>
    }

    const contentTwo = () => {
        if (result?.isHsg) {
            return <HSGModifyForm address={address}/>
        }

        if (result?.isMhsg) {
            return <></>
        }

        return <></>
    }

    const contentThree = () => {
        if (result) {
            return <VStack justifyContent="flex-start" alignItems="flex-start">
                <Text><b>Owner Hat</b> can transfer ownership to a new Hat ID, set multisig parameters, and for a MHSG, add other Hats as valid signers. Note: once added as a valid signer, a Hat cannot be removed from the multisig</Text>
                <Text><b>Min Threshold</b> is the fewest number of signers that can execute a transaction.</Text>
                <Text><b>Max Threshold</b> when reached becomes the fewest number of signers that can execute a transaction.</Text>
                <Text>In order to execute a transaction, the safe must have a number of valid hat-wearing signers &gt;= Min Threshold. Each valid signer added beyond the Min Threshold will increase the safe&#39;s threshold until the Max Threshold is reached, after which the Safe&#39;s threshold will not increase.</Text>
            </VStack>
        }

        return <>
            <VStack justifyContent='flex-start' height='100%' alignItems='flex-start'>
                <Text><b>Modify Parameters</b> of a multisig safe governed by an HSG or MHSG contract. </Text>
                <Text>The contract owner can transfer ownership, or adjust thresholds on an HSG, and add signer hats to an MHSG.</Text>
            </VStack>
        </>
    }

    return <MainContent 
        headerOne={headerOne()}
        headerTwo={headerTwo()}
        contentOne={contentOne()}
        contentTwo={contentTwo()}
        contentThree={contentThree()}
    />
}

export default ModifyPage;