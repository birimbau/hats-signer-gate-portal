import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useSelectedActionContext } from './SelectedActionContext';

export enum DEPLOY_ACTIONS {
  DEPLOY_HSG = 'Deploy HSG',
  DEPLOY_HSG_W_S = 'Deploy HSG with SAFE',
  DEPLOY_MHSG = 'Deploy MHSG',
  DEPLOY_MHSG_W_S = 'Deploy MHSG with SAFE',
}

type DeployType = {
  selectedDeployAction: DEPLOY_ACTIONS | undefined;
  setSelectedDeployAction: (action: DEPLOY_ACTIONS | undefined) => void;
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
  transationResult: any;
  setTransationResult: (result: any) => void;
};

const DeployContext = createContext<DeployType>({
  selectedDeployAction: undefined,
  setSelectedDeployAction: () => {},
  isPending: false,
  setIsPending: () => {},
  transationResult: undefined,
  setTransationResult: () => {},
});

export const DeployProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [selectedDeployAction, setSelectedDeployAction] = useState<
    DEPLOY_ACTIONS | undefined
  >(undefined);
  const { selected } = useSelectedActionContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [transationResult, setTransationResult] = useState<any>();

  useEffect(() => {
    setSelectedDeployAction(undefined);
  }, [selected]);

  const deployContextValue = useMemo(
    () => ({
      selectedDeployAction,
      setSelectedDeployAction,
      isPending,
      setIsPending,
      transationResult,
      setTransationResult,
    }),
    [
      selectedDeployAction,
      setSelectedDeployAction,
      isPending,
      setIsPending,
      transationResult,
      setTransationResult,
    ]
  );

  return (
    <DeployContext.Provider value={deployContextValue}>
      {p.children}
    </DeployContext.Provider>
  );
};

export const useDeployContext = () => useContext(DeployContext);
