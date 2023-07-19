import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

const NonConnectedCard = () => {
  return (
    <Card
      maxW="3xl"
      padding="16px 48px"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <CardHeader>Connect Your Wallet</CardHeader>
      <CardBody display="flex" gap={"12px"} flexDirection="column">
        <Text>
          You can leverage the capabilities of this dashboard for the following
          functions:
        </Text>
        <Text>
          Utilize the Hats Signer Gate Factory to initiate a Hats Signer Gate
          (HSG), or Multiple Hats Signer Gate (MHSG) smart contract.
        </Text>
        <Text>
          An HSG or MHSG can be deployed for an already existing safe or in
          conjunction with a new safe that will be generated.
        </Text>
        <Text>
          Depending on privileges, you can transfer ownership, set multisig
          threshholds, add zodiac modules, claim, add or remove signers.
        </Text>
      </CardBody>
    </Card>
  );
};

export default NonConnectedCard;
