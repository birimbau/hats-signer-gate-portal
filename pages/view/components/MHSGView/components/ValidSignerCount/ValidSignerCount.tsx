import { useValidSignerCount } from "../../../../../../utils/hooks/MultiHatsSignerGate";

interface P {
    address: string;
}

const ValidSignerCount:React.FC<P> = (p) => {
    const { data: validSignerCount } = useValidSignerCount(p.address);

    return <div>Valid Signer Count = {validSignerCount?.toString()}</div>
}

export default ValidSignerCount;