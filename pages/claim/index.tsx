import { VStack, Text } from "@chakra-ui/react";
import MainContent from "../../components/MainContent/MainContent";
import CheckHatsContract from "./components/CheckHatsContract/CheckHatsContract";
import { useState } from "react";
import Button from "../../components/UI/CustomButton/CustomButton";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "../../utils/utils";
import { FiCopy } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import HSGClaimForm from "./components/HSGClaimForm/HSGClaimForm";
import MHSGClaimForm from "./components/MHSGClaimForm/MHSGClaimForm";

const Claim = () => {
    const [result, setResult] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [isPending, setIsPending] = useState(false);
    const [transaction, setTransaction] = useState(undefined);
    const { chain } = useNetwork();

    const headerOne = () => 
       ( <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
      <Text as='b'>Claim Signing Authority</Text>
      <Text>Connect wallet with relevant hat, click ‘Fetch’</Text>
    </VStack>);

    const contentOne = () => {

    return <CheckHatsContract onResult={(result, address) => {
        setResult(result);
        setAddress(address);
    }}/>};

    
     const headerTwo = () => {
            if (result?.isMhsg || result?.isHsg) {
            return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
            <Text as='b'>Claim Signer for Multisig</Text>
            <Text>Click &rsquo;Claim&rsquo;</Text>
          </VStack>
        } 
        return <></>
    }

    const contentTwo = () => {
        if (result?.isMhsg) {
            return <MHSGClaimForm address={address} onLoading={value => setIsPending(value)} onTransationComplete={(transation) => {
                setTransaction(transation)
            }}/>
        } 

        if(result?.isHsg) {
            return <HSGClaimForm address={address} onLoading={value => setIsPending(value)} onTransationComplete={(transation) => {
                setTransaction(transation)
            }}/>
        }
        return <></>
    }

    const headerThree = () => {
        if (isPending) {
            return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
                <Text as='b'>Transaction Pending...</Text>
            </VStack>
        }

        if (!isPending && transaction) {
            return <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
                <Text as='b'>Transaction Complete!</Text>
            </VStack>
        }

        return <></>
    }

    const contentThree = () => {

        if (!isPending && transaction) {
            return  <VStack height='100%' alignItems='flex-start' gap={'24px'}>
            <Button
              leftIcon={<FiCopy />}
              onClick={() => {
                
              }}
            >
              View Transaction
            </Button>
            <Button
              leftIcon={<BsCardList />}
              onClick={() => {
                window.open(
                    `${getBlockExplorerUrl(chain?.id || 1)}/address/${
                        address
                    }`
                  );
              }}
            >
              View {result?.isMhsg ? `MHSG` : `HSG`} Contract
            </Button>
          </VStack>
        }

        return <></>
    }

    return <MainContent 
        headerOne={headerOne()}
        headerTwo={headerTwo()}
        headerThree={headerThree()}
        contentOne={contentOne()}
        contentTwo={contentTwo()}
        contentThree={contentThree()}
    />;
}

export default Claim;