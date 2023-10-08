import { useContractWrite } from "wagmi";
import Button from "../../../../components/UI/CustomButton/CustomButton";
import { LuEdit } from 'react-icons/lu';
import { useClaimSigner } from "../../../../utils/hooks/HatsSignerGate";
import { useEffect } from "react";

interface P {
    address: string;
    onLoading: (value: boolean) => void;
    onTransationComplete: (transation: any) => void;
}

const HSGClaimForm: React.FC<P> = (p) => {
    const { config } = useClaimSigner(p.address);
    const { data: transationData, isLoading, error, write } = useContractWrite(config);

    useEffect(() => {
        p.onLoading(isLoading);

        if (transationData) {
            p.onTransationComplete(transationData);
        }

        if (error) {
            alert(error);
        }
    }, [isLoading, transationData, error]);

    return <>
        <Button
        leftIcon={<LuEdit />}
        onClick={() => {
            write?.();
        }}
        
        
        >Claim</Button>
    </>
}

export default HSGClaimForm;