import { EthereumAddress } from './ReadForm';
import Web3 from 'web3';
import Safe, { Web3Adapter } from '@safe-global/protocol-kit';
import {
  SafeSignature,
  MetaTransactionData,
} from '@safe-global/safe-core-sdk-types';

// why don't these populate correctly when i want to import autmatically?

// TODO - console log the data structures of the two things I want to submit.
// TODO - identify if I should be combining the transactions into one submit. "MultiSend transactions - from Safe docs.
/// Maybe use "signTransactionHash" instead of the "signTypedData" for EIP-712

async function connectSafeToHSG(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress
): Promise<void> {
  const SafeAddress = `${process.env.NEXT_PUBLIC_VALID_SAFE_ADDRESS}`;

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
  console.log('SafeAddress: ', SafeAddress.substring(0, 8));
  console.log('existingHSGAddress: ', existingHSGAddress.substring(0, 8));
  console.log('signerAddress: ', connectedAddress.substring(0, 8));

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
    const enableGuardTx = await safeSdk.createEnableGuardTx(existingHSGAddress);

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

    // 2. Use the `createTransaction` function for MultiSend transactions
    const batchedTransaction = await safeSdk.createTransaction({
      safeTransactionData,
    });

    // 3. Sign the batched transaction
    const signedBatchedTx = await safeSdk.signTransaction(
      batchedTransaction,
      'eth_signTypedData_v4'
    );

    // 4. Execute the batched transaction
    const txResponse = await safeSdk.executeTransaction(signedBatchedTx);
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
  connectedAddress: EthereumAddress
): Promise<void> {
  console.log('inside handleConnect');
  try {
    await connectSafeToHSG(existingHSGAddress, connectedAddress);
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
