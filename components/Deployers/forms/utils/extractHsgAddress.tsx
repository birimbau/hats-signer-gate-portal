import { keccak256, toUtf8Bytes } from 'ethers';
import { TransactionReceipt } from 'viem';
import { EthereumAddress } from './ReadForm';

export const extractHsgAddress = (
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

  // Define the HatsSignerGateSetup event signature
  const hatsSignerGateSetupSignature = keccak256(
    toUtf8Bytes(
      'HatsSignerGateSetup(address,uint256,uint256,address,uint256,uint256,uint256)'
    )
  );

  // Find the log corresponding to HatsSignerGateSetup
  const hatsSignerGateSetupLog = transactionReceipt.logs.find(
    (log) => log.topics[0] === hatsSignerGateSetupSignature
  );

  if (!hatsSignerGateSetupLog) {
    console.error('Log for HatsSignerGateSetup not found.');
    console.error('Transaction Receipt:', transactionReceipt);
    return null;
  }

  if (!hatsSignerGateSetupLog.data || hatsSignerGateSetupLog.data === '0x') {
    console.warn('No data found in the HatsSignerGateSetup log.');
    return null;
  }

  // The data is in a hex string, we need to extract a small part of that.

  // Extract the _hatsSignerGate from the data of the log
  return ('0x' + hatsSignerGateSetupLog.data.slice(26, 66)) as EthereumAddress;
};

// Usage:
// const _hatsSignerGate = extractHsgAddress(transactionReceipt);
// if (_hatsSignerGate) {
//     console.log('_hatsSignerGate:', _hatsSignerGate);
// }
