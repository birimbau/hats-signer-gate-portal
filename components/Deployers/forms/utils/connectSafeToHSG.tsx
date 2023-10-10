import { EthereumAddress } from './ReadForm';
import Web3 from 'web3';
import Safe, { Web3Adapter } from '@safe-global/protocol-kit';
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';

// Add error rendering

async function connectSafeToHSG(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  safeAddress: EthereumAddress,
  setTransactionHash: (transactionHash?: string) => void,
  setIsSigningExecuting: (isSigningExecuting: boolean) => void
): Promise<boolean> {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed!');
  }

  const web3 = new Web3(window.ethereum); // Use MetaMask's provider

  // Request user connection to MetaMask
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  if (!accounts || accounts.length === 0) {
    throw new Error('Failed to connect to MetaMask');
  }

  const ethAdapter = new Web3Adapter({
    web3,
    signerAddress: accounts[0], // Use the first account from MetaMask
  });

  if (!connectedAddress) {
    throw new Error('No address connected');
  }

  // I need to use the EthersAdapter to connect to the @safe-global/protocol-kit SDK.
  // To use 'Ethers' for the EthersAdapter, we must use V5. Because this project uses Ethers V6, I opted for a Web3 implementation instead.
  let safeSdk;
  try {
    // Connects the 'Connected user' to the safe in question so that the user can perform the required actions: 'createEnableModuleTx' & 'createEnableGuardTx'
    safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: safeAddress,
    });
    console.log('safeSdk: ', safeSdk);
  } catch (error) {
    console.error('Error creating Safe instance:', error);
    return false;
  }

  try {
    // 1. Prepare the transactions
    const enableModuleTx = await safeSdk.createEnableModuleTx(
      existingHSGAddress
    );
    console.log('enableModuleTx: ', enableModuleTx);

    const enableGuardTx = await safeSdk.createEnableGuardTx(existingHSGAddress);
    console.log('enableGuardTx: ', enableGuardTx);

    const safeTransactionData: MetaTransactionData[] = [
      {
        to: enableModuleTx.data.to,
        value: enableModuleTx.data.value.toString(),
        data: enableModuleTx.data.data,
        // you can add operation if needed, but it's optional
      },
      {
        to: enableGuardTx.data.to,
        value: enableGuardTx.data.value.toString(),
        data: enableGuardTx.data.data,
        // you can add operation if needed, but it's optional
      },
    ];
    console.log('safeTransactionData: ', safeTransactionData);

    // 2. Use the `createTransaction` function for MultiSend transactions
    const batchedTransaction = await safeSdk.createTransaction({
      safeTransactionData,
    });
    console.log('batchedTransaction: ', batchedTransaction);

    // 3. Sign the batched transaction
    const signedBatchedTx = await safeSdk.signTransaction(
      batchedTransaction,
      'eth_signTypedData_v4'
    );
    console.log('signedBatchedTx: ', signedBatchedTx);

    // 4. Execute the batched transaction
    const txResponse = await safeSdk.executeTransaction(signedBatchedTx);
    console.log('txResponse1', txResponse);
    await txResponse.transactionResponse?.wait();
    console.log(
      'Batched transaction executed successfully. Response:',
      txResponse
    );

    // 5. Pass new data back to parents
    if (txResponse.hash) setTransactionHash(txResponse.hash);

    return true;
  } catch (error) {
    // Enables the user to click the submit button again.
    setIsSigningExecuting(false);

    console.error('Error in batched transaction:', error);
    return false;
  }
}

export async function handleConnect(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  safeAddress: EthereumAddress,
  setTransactionHash: (transactionHash?: string) => void,
  setIsSigningExecuting: (isSigningExecuting: boolean) => void
): Promise<void> {
  console.log('inside handleConnect');

  try {
    await connectSafeToHSG(
      existingHSGAddress,
      connectedAddress,
      safeAddress,
      setTransactionHash,
      setIsSigningExecuting
    ); // <-- Get the return value (True/False)
  } catch (error) {
    // Enables the user to click the submit button again.
    setIsSigningExecuting(false);

    if (error instanceof Error) {
      console.error('Error connecting Safe to HSG:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

// const signedGuardTx = await signSafeTransaction(safeSdk, enableGuardTx);
// console.log('signedGuardTx', signedGuardTx);
