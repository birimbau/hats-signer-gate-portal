import { useTargetThreshold } from "../../../../../../utils/hooks/MultiHatsSignerGate";

interface P {
    address?: `0x${string}`;
}

const MaxThreshold: React.FC<P> = (p) => {
    const { data: maxThreshold } = useTargetThreshold(p.address);
    return <div>Max Threshold = {maxThreshold?.toString()}</div>
}

export default MaxThreshold;