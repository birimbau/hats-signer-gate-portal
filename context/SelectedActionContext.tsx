import React, { createContext, useContext, useMemo, useState } from "react";

export enum HEADER_ACTIONS {
  DEPLOY = "Deploy",
  CLAIM = "Claim",
  RENOUNCE = "Renounce",
  REMOVE = "Remove",
  REVISE = "Revise",
  VIEW = "View",
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
  p,
) => {
  const [selected, setSelected] = useState<HEADER_ACTIONS | undefined>(
    undefined,
  );

  const contextValue = useMemo(
    () => ({ selected, setSelected }),
    [selected, setSelected],
  );

  return (
    <SelectedActionContext.Provider value={contextValue}>
      {p.children}
    </SelectedActionContext.Provider>
  );
};

export const useSelectedActionContext = () => useContext(SelectedActionContext);
