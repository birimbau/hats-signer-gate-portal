import { VStack, Text } from "@chakra-ui/react";
import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from "../../../../context/DeployContext";

const HeaderTwo = () => {
  const { selectedDeployAction } = useDeployContext();

  switch (selectedDeployAction) {
    default:
    case DEPLOY_ACTIONS.DEPLOY_HSG:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate</Text>
          <Text>Input safe adrress, click &apos;Read&apos;</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate + Safe</Text>
          <Text>Enter inputs, click &apos;Write&apos;</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_MHSG:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate</Text>
          <Text>Input safe adrress, click &apos;Read&apos;</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate + Safe</Text>
          <Text>Enter inputs, click &apos;Write&apos;</Text>
        </VStack>
      );
  }
};

export default HeaderTwo;
