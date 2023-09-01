export const findAction = (value: string | string[] | undefined, pos = 0) => {
  return typeof value === 'string'
    ? value
    : Array.isArray(value)
    ? value[pos]
    : undefined;
};

export function getBlockExplorerUrl(networkId = 1): string {
  switch (networkId) {
    case 1:
      return 'https://etherscan.io';
    case 5:
      return 'https://goerli.etherscan.io';
    default:
      return 'https://etherscan.io';
  }
}
