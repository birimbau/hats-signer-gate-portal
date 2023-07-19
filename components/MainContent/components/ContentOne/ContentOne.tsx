import {
  HEADER_ACTIONS,
  useSelectedActionContext,
} from '../../../../context/SelectedActionContext';
import Deploy from './components/Deploy/Deploy';

const ContentOne = () => {
  const { selected } = useSelectedActionContext();

  switch (selected) {
    case HEADER_ACTIONS.DEPLOY:
      return <Deploy />;
    case HEADER_ACTIONS.CLAIM:
      return <>CLAIM: To be developer</>;
    case HEADER_ACTIONS.RENOUNCE:
      return <>Renounce: To be developer</>;
    case HEADER_ACTIONS.REMOVE:
      return <>Remove: To be developer</>;
    case HEADER_ACTIONS.REVISE:
      return <>REVISE: To be developer</>;
    case HEADER_ACTIONS.VIEW:
      return <>VIEW: To be developer</>;
    default:
      return <></>;
  }
};

export default ContentOne;
