import {
  useDeployContext,
  DEPLOY_ACTIONS,
} from "../../../../context/DeployContext";

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
      return <>Deploy mhsg with safe: To be developed</>;
    default:
      return <></>;
  }
};

export default ContentTwo;
