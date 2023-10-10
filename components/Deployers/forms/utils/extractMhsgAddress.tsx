import { keccak256, toUtf8Bytes } from 'ethers';
import { TransactionReceipt } from 'viem';
import { EthereumAddress } from './ReadForm';

export const extractMhsgAddress = (
  transactionReceipt: TransactionReceipt
): EthereumAddress | null => {
  if (
    !transactionReceipt ||
    !transactionReceipt.logs ||
    transactionReceipt.logs.length === 0
  ) {
    console.error('No logs found in the transaction receipt.');
    console.error('Transaction Receipt:', transactionReceipt);
    return null;
  }

  // Define the MultiHatsSignerGateSetup event signature
  const multiHatsSignerGateSetupSignature = keccak256(
    toUtf8Bytes(
      'MultiHatsSignerGateSetup(address,uint256,uint256[],address,uint256,uint256,uint256)'
    )
  );

  // Find the log corresponding to MultiHatsSignerGateSetup
  const multiHatsSignerGateSetupLog = transactionReceipt.logs.find(
    (log) => log.topics[0] === multiHatsSignerGateSetupSignature
  );

  if (!multiHatsSignerGateSetupLog) {
    console.error('Log for MultiHatsSignerGateSetup not found.');
    console.error('Transaction Receipt:', transactionReceipt);
    return null;
  }

  if (
    !multiHatsSignerGateSetupLog.data ||
    multiHatsSignerGateSetupLog.data === '0x'
  ) {
    console.warn('No data found in the MultiHatsSignerGateSetup log.');
    return null;
  }

  // The data is in a hex string, we need to extract a small part of that.

  // Extract the _hatsSignerGate from the data of the log
  return ('0x' +
    multiHatsSignerGateSetupLog.data.slice(26, 66)) as EthereumAddress;
};

// Usage:
// const _multiHatsSignerGate = extractMhsgAddress(transactionReceipt);
// if (_multiHatsSignerGate) {
//     console.log('_multiHatsSignerGate:', _multiHatsSignerGate);
// }
