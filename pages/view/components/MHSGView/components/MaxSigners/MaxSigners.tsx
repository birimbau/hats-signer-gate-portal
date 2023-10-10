import { useMaxSigners } from "../../../../../../utils/hooks/MultiHatsSignerGate";

interface P {
    address: string;
}

const MaxSigners: React.FC<P> = (p) => {
    const { data: maxSigners } = useMaxSigners(p.address);
    return <div>Max Signers = {maxSigners?.toString()}</div>
};

export default MaxSigners;
