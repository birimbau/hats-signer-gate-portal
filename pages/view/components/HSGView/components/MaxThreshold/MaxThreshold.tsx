import { useTargetThreshold } from "../../../../../../utils/hooks/HatsSignerGate";

interface P {
    address?: string;
}

const MaxThreshold: React.FC<P> = (p) => {
    const { data: maxThreshold } = useTargetThreshold(p.address);
    return <div>Max Threshold = {maxThreshold?.toString()}</div>
}

export default MaxThreshold;