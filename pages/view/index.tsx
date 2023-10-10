import { VStack, Text } from "@chakra-ui/react"
import MainContent from "../../components/MainContent/MainContent"
import { useState } from "react";
import CheckHatsContract from "../claim/components/CheckHatsContract/CheckHatsContract";
import MHSGView from "./components/MHSGView/MHSGView";
import HSGView from "./components/HSGView/HSGView";
import HSGAttachSafe from "./components/HSGAttachSafe/HSGAttachSafe";
import MHSGAttachSafe from "./components/MHSGAttachSafe/MHSGAttachSafe";

const View = () => {
    const [result, setResult] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    
    const headerOne = () => {
        return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text as='b'>View Configuration for Hats Signer Gate Contract</Text>
        <Text>Connect any wallet, click ‘Read’</Text>
      </VStack>
    }

    const contentOne = () => {

        return <CheckHatsContract onResult={(result, address) => {
            setResult(result);
            setAddress(address);
        }}/>};

        const contentTwo = () => {
            if (result?.isMhsg) {
                return <MHSGView />
            } 
    
            if(result?.isHsg) {
                return <HSGView address={address} />
            }
            return <></>
        }

        const headerThree = () => {
            if (result) {
                return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
                <Text as='b'>Check if Wallet is a Valid Signer</Text>
                <Text>Enter wallet address, click ‘Read’</Text>
              </VStack>
            }
            return <></>
        }

    const contentThree = () => {
        if (result?.isMhsg) {
            return <MHSGAttachSafe address={address} />
        }

        if(result?.isHsg) {
            return <HSGAttachSafe address={address} />
        }

        return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
        <Text><b>View Parameters</b> of a multisig safe governed by an HSG or MHSG contract.</Text>
        <Text>Any wallet can fetch the contract to view thresholds, Signer Hat IDs, the safe address, and number of valid signers.</Text>
      </VStack>
    }

    return <MainContent 
        headerOne={headerOne()}
        headerThree={headerThree()}
        contentOne={contentOne()}
        contentTwo={contentTwo()}
        contentThree={contentThree()}
    />
}

export default View;