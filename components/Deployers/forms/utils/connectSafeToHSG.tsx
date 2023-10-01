import Safe from '@safe-global/protocol-kit';
import { EthereumAddress } from './ReadForm';
import Web3 from 'web3';
import { Web3Adapter } from '@safe-global/protocol-kit';
import { PublicClient } from 'wagmi';

// TODO = READ https://github.com/safe-global/safe-apps-sdk/blob/main/packages/safe-apps-wagmi/README.md
// TODO - REad wagmi guides

async function connectSafeToHSG(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  publicClient: PublicClient
): Promise<void> {
  console.log('safeAddress: ', existingHSGAddress);
  console.log('signerAddress: ', connectedAddress);

  if (!connectedAddress) {
    throw new Error('No address connected');
  }

  // It seems like I need to use the EthersAdapter to allow me to connect to the protocol SDK.
  // This may meanI can remove the other safe context from the App.tsx.
  // const {address} = useAccount()

  // To use 'Ethers' as the adapter we have to use V5... as this project uses v6, I opted for a Web3 implementation instead.

  const provider = new Web3.providers.HttpProvider(
    'https://eth-goerli.g.alchemy.com/v2/kjybQk8t73eIkBddJ5RIszquNIMWTPB1'
  );
  const web3 = new Web3(provider);

  const ethAdapter = new Web3Adapter({
    web3,
    signerAddress: connectedAddress,
  });
  console.log('ethAdapter: ', ethAdapter);

  async function signSafeTransaction(safeSdk: any, tx: any): Promise<any> {
    try {
      return await safeSdk.signTransaction(tx, 'eth_signTypedData');
    } catch (error) {
      const typedError = error as Error;
      if (typedError.message.includes('EIP-712')) {
        console.warn(
          "Wallet doesn't support EIP-712. Falling back to basic eth_sign."
        );
        console.error('Error with eth_sign:', typedError.message);
        try {
          return await safeSdk.signTransaction(tx, 'eth_sign');
        } catch (ethSignError) {
          const ethTypedError = ethSignError as Error;
          console.error('Error with eth_sign:', ethTypedError.message);
          throw ethTypedError;
        }
      } else {
        throw typedError;
      }
    }
  }

  let safeSdk;
  try {
    safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: '0xc2bd60183b54cc628df709c7a78ec67a7b6dc827',
    });
    console.log('safeSdk: ', safeSdk);
  } catch (error) {
    console.error('Error creating Safe instance:', error);
    return; // Exit function if this fails, as the following steps depend on safeSdk
  }

  try {
    const enableModuleTx = await safeSdk.createEnableModuleTx(
      existingHSGAddress
    );
    const signedModuleTx = await signSafeTransaction(safeSdk, enableModuleTx);
    const moduleTxResponse = await safeSdk.executeTransaction(signedModuleTx);
    await moduleTxResponse.transactionResponse?.wait();
    console.log(
      'Module transaction executed successfully. Response: ',
      moduleTxResponse
    );
  } catch (error) {
    console.error('Error in module transaction:', error);
  }

  try {
    const enableGuardTx = await safeSdk.createEnableGuardTx(existingHSGAddress);
    console.log('enableGuardTx', enableGuardTx);
    const signedGuardTx = await signSafeTransaction(safeSdk, enableGuardTx);
    console.log('signedGuardTx', signedGuardTx);
    const guardTxResponse = await safeSdk.executeTransaction(signedGuardTx);
    console.log('guardTxResponse', guardTxResponse);
    await guardTxResponse.transactionResponse?.wait();
    console.log(
      'Guard transaction executed successfully. Response: ',
      guardTxResponse
    );
  } catch (error) {
    console.error('Error in guard transaction:', error);
  }
}

export async function handleConnect(
  existingHSGAddress: EthereumAddress,
  connectedAddress: EthereumAddress,
  publicClient: PublicClient
): Promise<void> {
  console.log('inside handleConnect');
  try {
    await connectSafeToHSG(existingHSGAddress, connectedAddress, publicClient);
    console.log('Safe connected to HSG successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting Safe to HSG:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
