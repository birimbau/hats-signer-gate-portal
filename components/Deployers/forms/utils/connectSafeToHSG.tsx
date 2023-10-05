import { EthereumAddress } from './ReadForm';
import Web3 from 'web3';
import Safe, { Web3Adapter } from '@safe-global/protocol-kit';
import {
  MetaTransactionData,
  SafeSignature,
} from '@safe-global/safe-core-sdk-types';

// TODO - revert to a previous version where the batch transaction occured correctly and identify why the current set up is not working!
// Add error rendering

async function connectSafeToHSG(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  safeAddress: EthereumAddress
): Promise<void> {
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

  console.log('inside connectSafeToHSG');
  console.log('SafeAddress: ', SafeAddress);
  console.log('existingHSGAddress: ', existingHSGAddress);
  console.log('signerAddress: ', connectedAddress);
  console.log(
    'SafeAddress HARD: ',
    '0xc2bd60183b54cc628df709c7a78ec67a7b6dc827'
  );
  console.log('existingHSGAddress HARD: ', 'NONE');
  console.log(
    'signerAddress HARD: ',
    '0xc56a789558a0dec88b99c11a887460301d016cf7'
  );

  // SafeAddress = '0xc2bd60183b54cc628df709c7a78ec67a7b6dc827';
  // const existingHSGAddress2 = '0x9b61d5b849c51f7df88f3618ef0eb3d5a00bbe27';
  // const connectedAddress2 = '0xc56a789558a0dec88b99c11a887460301d016cf7';
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
      safeAddress: SafeAddress,
    });
    console.log('safeSdk: ', safeSdk);
  } catch (error) {
    console.error('Error creating Safe instance:', error);
    return;
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
  } catch (error) {
    console.error('Error in batched transaction:', error);
  }

  // try {
  //   const enableModuleTx = await safeSdk.createEnableModuleTx(
  //     existingHSGAddress
  //   );
  //   console.log('enableModuleTx', enableModuleTx);

  //   const signedSafeTx = await safeSdk.signTransaction(
  //     enableModuleTx,
  //     'eth_signTypedData_v4'
  //   );
  //   console.log('signedSafeTx', signedSafeTx);

  //   const moduleTxResponse = await safeSdk.executeTransaction(signedSafeTx);

  //   await moduleTxResponse.transactionResponse?.wait();
  //   console.log(
  //     'Module transaction executed successfully. Response: ',
  //     moduleTxResponse
  //   );
  // } catch (error) {
  //   console.error('Error in module transaction:', error);
  // }

  // try {
  //   const enableGuardTx = await safeSdk.createEnableGuardTx(existingHSGAddress);
  //   console.log('enableGuardTx', enableGuardTx);

  //   const signedSafeTx = await safeSdk.signTransaction(
  //     enableGuardTx,
  //     'eth_signTypedData_v4'
  //   );

  //   const guardTxResponse = await safeSdk.executeTransaction(signedSafeTx);

  //   console.log('guardTxResponse', guardTxResponse);

  //   await guardTxResponse.transactionResponse?.wait();
  //   console.log(
  //     'Guard transaction executed successfully. Response: ',
  //     guardTxResponse
  //   );
  // } catch (error) {
  //   console.error('Error in guard transaction:', error);
  // }
}

export async function handleConnect(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  safeAddress: EthereumAddress,

  setIsSuccessTwo: (isSuccess: boolean) => void
): Promise<void> {
  console.log('inside handleConnect');
  try {
    await connectSafeToHSG(existingHSGAddress, connectedAddress, safeAddress);
    console.log('successTwo set to TRUE');

    setIsSuccessTwo(true);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting Safe to HSG:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

// const signedGuardTx = await signSafeTransaction(safeSdk, enableGuardTx);
// console.log('signedGuardTx', signedGuardTx);
