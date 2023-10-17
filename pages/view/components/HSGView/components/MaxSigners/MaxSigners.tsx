import { EthereumAddress } from '../../../../../../components/Deployers/forms/utils/ReadForm';
import { useMaxSigners } from '../../../../../../utils/hooks/HatsSignerGate';

interface P {
  address?: EthereumAddress;
}

const MaxSigners: React.FC<P> = (p) => {
  const { data: maxSigners } = useMaxSigners(p.address);
  return <div>Max Signers = {maxSigners?.toString()}</div>;
};

export default MaxSigners;
