import { VStack, Text } from "@chakra-ui/react";
import {
  DEPLOY_ACTIONS,
  useDeployContext,
} from "../../../../context/DeployContext";

const HeaderTwo = () => {
  const { selectedDeployAction } = useDeployContext();

  switch (selectedDeployAction) {
    case DEPLOY_ACTIONS.DEPLOY_HSG:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate</Text>
          <Text>Input safe adrress, click 'Read'</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_HSG_W_S:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate + Safe</Text>
          <Text>Enter inputs, click 'Write'</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_MHSG:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate</Text>
          <Text>Input safe adrress, click 'Read'</Text>
        </VStack>
      );
    case DEPLOY_ACTIONS.DEPLOY_MHSG_W_S:
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Deploy Hats Signer Gate + Safe</Text>
          <Text>Enter inputs, click 'Write'</Text>
        </VStack>
      );
    default:
      return <></>;
  }
};

export default HeaderTwo;
