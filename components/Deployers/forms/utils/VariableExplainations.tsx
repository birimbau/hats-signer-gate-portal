import { VStack, Text } from '@chakra-ui/react';

function VariableExplanations() {
  return (
    <VStack height="100%" alignItems="flex-start" gap={'8px'}>
      <Text>
        <b>Owner Hat</b> can transfer ownership to a new Hat ID, set multisig
        parameters, and for a MHSG, add other Hats as valid signers. Note: once
        added as a valid signer, a Hat cannot be removed from the multisig.
      </Text>
      <Text>
        <b>Signer Hat</b> is the ID of the Hat(s) that will have signing
        authority for the Safe multisig.
      </Text>
      <Text>
        <b>Min Threshold</b> is the fewest number of signers that can execute a
        transaction.
      </Text>
      <Text>
        <b>Max Threshold</b> when reached becomes the fewest number of signers
        that can execute a transaction.
      </Text>
      <Text>
        <b>Max Signers</b> is the maximum number of addresses that can claim
        signing authority on the Safe.
      </Text>
      <Text>
        <b>Max Signers</b> is the maximum number of addresses that can claim
        signing authority on the Safe.
      </Text>
      <Text>
        In order to execute a transaction, the safe must have a number of valid
        hat-wearing signers &gt;= Min Threshold. Each valid signer added beyond
        the Min Threshold will increase the safe&apos;s threshold until the Max
        Threshold is reached, after which the Safe&apos;s threshold will not
        increase.
      </Text>
    </VStack>
  );
}

export default VariableExplanations;
