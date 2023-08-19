'use-client';
import { DEPLOY_ACTIONS } from '../../context/DeployContext';
import { HEADER_ACTIONS } from '../../context/SelectedActionContext';
import { components } from './components/components';
import { ComponentP } from './types';

const useGetLayout = ({
  slug1,
  slug2,
}: {
  slug1: HEADER_ACTIONS;
  slug2?: DEPLOY_ACTIONS;
}) => {
  const component: ComponentP = slug2
    ? components[slug1][slug2]
    : components[slug1];

  return {
    headerOne: component?.headerOne,
    headerTwo: component?.headerTwo,
    headerThree: component?.headerThree,
    contentOne: component?.contentOne,
    contentTwo: component?.contentTwo,
    contentThree: component?.contentThree,
  };
};

export default useGetLayout;
