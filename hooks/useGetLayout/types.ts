import { DEPLOY_ACTIONS } from '../../context/DeployContext';
import { HEADER_ACTIONS } from '../../context/SelectedActionContext';

export interface ComponentP {
  headerOne?: JSX.Element;
  headerTwo?: JSX.Element;
  headerThree?: JSX.Element;
  contentOne?: JSX.Element;
  contentTwo?: JSX.Element;
  contentThree?: JSX.Element;
}

export interface ComponentsP {
  [HEADER_ACTIONS.DEPLOY]: {
    headerOne?: JSX.Element;
    headerTwo?: JSX.Element;
    headerThree?: JSX.Element;
    contentOne?: JSX.Element;
    contentTwo?: JSX.Element;
    contentThree?: JSX.Element;
    [DEPLOY_ACTIONS.DEPLOY_HSG]: ComponentP;
    [DEPLOY_ACTIONS.DEPLOY_HSG_W_S]: ComponentP;
    [DEPLOY_ACTIONS.DEPLOY_MHSG]: ComponentP;
    [DEPLOY_ACTIONS.DEPLOY_MHSG_W_S]: ComponentP;
  };
  [HEADER_ACTIONS.MODIFY]: ComponentP;
  [HEADER_ACTIONS.VIEW]: ComponentP;
  [HEADER_ACTIONS.CLAIM]: ComponentP;
  [HEADER_ACTIONS.RENOUNCE]: ComponentP;
  [HEADER_ACTIONS.REMOVE]: ComponentP;
}
