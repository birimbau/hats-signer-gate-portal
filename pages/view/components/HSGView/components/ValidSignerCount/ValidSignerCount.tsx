import { EthereumAddress } from '../../../../../../components/Deployers/forms/utils/ReadForm';
import { useValidSignerCount } from '../../../../../../utils/hooks/HatsSignerGate';

interface P {
  address: EthereumAddress;
}

const ValidSignerCount: React.FC<P> = (p) => {
  const { data: validSignerCount } = useValidSignerCount(p.address);

  return <div>Valid Signer Count = {validSignerCount?.toString()}</div>;
};

export default ValidSignerCount;
