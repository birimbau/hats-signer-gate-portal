import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from '../../../../context/DeployContext';
import HatsSignerGateAndSafeForm from '../../../Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';
import HatsSignerGateForm from '../../../Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';
import MultiHatsSignerGateAndSafeForm from '../../../Deployers/forms/MultiHatsSignerGateAndSafeForm/MultiHatsSignerGateAndSafeForm';
import MultiHatsSignerGateForm from '../../../Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';

const ContentTwo = () => {
  const { selectedDeployAction } = useDeployContext();

  switch (selectedDeployAction) {
    default:
    case DEPLOY_ACTIONS.DEPLOY_HSG:
      return <HatsSignerGateForm />;
    case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
      return <HatsSignerGateAndSafeForm />;
    case DEPLOY_ACTIONS.DEPLOY_MHSG:
      return <MultiHatsSignerGateForm />;
    case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
      return <MultiHatsSignerGateAndSafeForm />;
  }
};

export default ContentTwo;
