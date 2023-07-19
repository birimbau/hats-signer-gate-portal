import React, { createContext, useState, useContext } from 'react';

export enum DEPLOY_ACTIONS {
  DEPLOY_HSG = 'Deploy HSG',
  DEPLOY_HSG_W_S = 'Deploy HSG with SAFE',
  DEPLOY_MHSG = 'Deploy MHSG',
  DEPLOY_MHSG_W_S = 'Deploy MHSG with SAFE',
}

type DeployType = {
  selectedDeployAction: DEPLOY_ACTIONS | undefined;
  setSelectedDeployAction: (action: DEPLOY_ACTIONS | undefined) => void;
};

const DeployContext = createContext<DeployType>({
  selectedDeployAction: undefined,
  setSelectedDeployAction: () => {},
});

export const DeployProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [selectedDeployAction, setSelectedDeployAction] = useState<
    DEPLOY_ACTIONS | undefined
  >(undefined);

  return (
    <DeployContext.Provider
      value={{
        selectedDeployAction,
        setSelectedDeployAction,
      }}
    >
      {p.children}
    </DeployContext.Provider>
  );
};

export const useDeployContext = () => useContext(DeployContext);
