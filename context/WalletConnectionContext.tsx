import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useNetwork } from 'wagmi';

type WalletConnection = {
  isConnected: boolean;
  isWrongNetwork: boolean;
  isReadyToUse: boolean;
};

const WalletConnectionContext = createContext<WalletConnection>({
  isConnected: false,
  isWrongNetwork: false,
  isReadyToUse: false,
});

export const WalletConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = (p) => {
  const { isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);
  const [isReadyToUse, setIsReadyToUse] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      isConnected,
      isWrongNetwork,
      isReadyToUse,
    }),
    [isConnected, isWrongNetwork, isReadyToUse]
  );

  useEffect(() => {
    if (isConnected) {
      setIsWrongNetwork(!chains.find((c) => c.id === chain?.id));
    }
  }, [isConnected, chains, chain?.id]);

  useEffect(() => {
    setIsReadyToUse(isConnected && !isWrongNetwork);
  }, [isConnected, isWrongNetwork]);

  return (
    <WalletConnectionContext.Provider value={contextValue}>
      {p.children}
    </WalletConnectionContext.Provider>
  );
};

export const useWalletConnectionContext = () =>
  useContext(WalletConnectionContext);
