import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDeployContext } from './DeployContext';

export enum HEADER_ACTIONS {
  DEPLOY = 'Deploy',
  CLAIM = 'Claim',
  RENOUNCE = 'Renounce',
  REMOVE = 'Remove',
  REVISE = 'Revise',
  VIEW = 'View',
}

type SelectedActionType = {
  selected: HEADER_ACTIONS | undefined;
  setSelected: (action: HEADER_ACTIONS | undefined) => void;
};

const SelectedActionContext = createContext<SelectedActionType>({
  selected: undefined,
  setSelected: () => {},
});

export const SelectedActionProvider: React.FC<{ children: React.ReactNode }> = (
  p
) => {
  const [selected, setSelected] = useState<HEADER_ACTIONS | undefined>(
    undefined
  );

  return (
    <SelectedActionContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {p.children}
    </SelectedActionContext.Provider>
  );
};

export const useSelectedActionContext = () => useContext(SelectedActionContext);
