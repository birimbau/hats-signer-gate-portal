import { BsSafe } from 'react-icons/bs';
import Button from '../../../../components/UI/CustomButton/CustomButton';
import { useSafe as useHSGSafe } from '../../../../utils/hooks/HatsSignerGate';
import { useSafe as useMHSGSafe } from '../../../../utils/hooks/MultiHatsSignerGate';
import { EthereumAddress } from '../../../../components/Deployers/forms/utils/ReadForm';

interface P {
  address?: EthereumAddress;
  type: 'HSG' | 'MHSG';
}

const SafeButton: React.FC<P> = (p) => {
  if (p.type === 'HSG') {
    return <HSGSafeButton address={p.address}></HSGSafeButton>;
  } else {
    return <MHSGSafeButton address={p.address}></MHSGSafeButton>;
  }
};

interface HSGSafeButtonP {
  address?: EthereumAddress;
}

const HSGSafeButton: React.FC<HSGSafeButtonP> = (p) => {
  const { data: safe } = useHSGSafe(p.address);
  return (
    <Button
      leftIcon={<BsSafe />}
      onClick={() => {
        window.open(`https://app.safe.global/home?safe=gor:${safe}`);
      }}
    >
      View Safe
    </Button>
  );
};

const MHSGSafeButton: React.FC<HSGSafeButtonP> = (p) => {
  const { data: safe } = useMHSGSafe(p.address);
  return (
    <Button
      leftIcon={<BsSafe />}
      onClick={() => {
        window.open(`https://app.safe.global/home?safe=gor:${safe}`);
      }}
    >
      View Safe
    </Button>
  );
};

export default SafeButton;
