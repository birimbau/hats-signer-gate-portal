import { useMinThreshold } from "../../../../../../utils/hooks/HatsSignerGate";

interface P {
    address?: string;
}

const MinThreshold: React.FC<P> = (p) => {
    const { data: minThreshold } = useMinThreshold(p.address);

    return <div>Min Threshold = {minThreshold?.toString()}</div>
}

export default MinThreshold;