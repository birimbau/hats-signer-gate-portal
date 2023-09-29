// Finds the segment specified from an entire path.
export const findAction = (value: string | undefined, pos: number) => {
  if (typeof value === 'string') {
    const segments = value.split('/');
    return segments[pos] || undefined;
  }
  return undefined;
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
