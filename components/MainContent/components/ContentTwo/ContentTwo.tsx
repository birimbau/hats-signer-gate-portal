import {
  useDeployContext,
  DEPLOY_ACTIONS,
} from '../../../../context/DeployContext';
import DeployMHSG_W_S from './components/DeployMHSG_W_S/DeployMHSG_W_S';

const ContentTwo = () => {
  const { selectedDeployAction } = useDeployContext();

  switch (selectedDeployAction) {
    case DEPLOY_ACTIONS.DEPLOY_HSG:
      return <>Deploy hsg: To be developed</>;
    case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
      return <>Deploy hsg with safe: To be developed</>;
    case DEPLOY_ACTIONS.DEPLOY_MHSG:
      return <>Deploy mhsg: To be developed</>;
    case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
      return <DeployMHSG_W_S />;
    default:
      return <></>;
  }
};

export default ContentTwo;
