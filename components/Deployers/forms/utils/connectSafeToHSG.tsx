import { Safe } from '@safe-global/protocol-kit';
import { EthereumAddress } from './ReadForm';
import { useAccount } from 'wagmi';
// Function to connect the Safe
async function connectSafeToHSG(
  existingSafeAddress: EthereumAddress,
  hsgModuleAddress: EthereumAddress,
  hsgGuardAddress: EthereumAddress,
  connectedAddress: EthereumAddress
): Promise<void> {
  if (!connectedAddress) {
    throw new Error('No address connected');
  }

  // Connect to the existing Safe
  const safeSdk = await Safe.connect({
    ethAdapter: connectedAddress,
    safeAddress: existingSafeAddress,
  });

  // Create a transaction to approve the HSG address as a module on the Safe
  const enableModuleTx = await safeSdk.createEnableModuleTx(hsgModuleAddress);

  // Execute the transaction
  const moduleTxResponse = await safeSdk.executeTransaction(enableModuleTx);
  await moduleTxResponse.transactionResponse?.wait();

  // Create a transaction to approve the HSG address as the guard on the Safe
  const enableGuardTx = await safeSdk.createEnableGuardTx(hsgGuardAddress);

  // Execute the transaction
  const guardTxResponse = await safeSdk.executeTransaction(enableGuardTx);
  await guardTxResponse.transactionResponse?.wait();
}

export async function handleConnect(
  existingSafeAddress: EthereumAddress,
  hsgModuleAddress: EthereumAddress,
  hsgGuardAddress: EthereumAddress,
  connectedAddress: EthereumAddress
): Promise<void> {
  try {
    await connectSafeToHSG(
      existingSafeAddress,
      hsgModuleAddress,
      hsgGuardAddress,
      connectedAddress
    );
    console.log('Safe connected to HSG successfully!');
  } catch (error) {
    console.error('Error connecting Safe to HSG:', error.message);
  }
}
