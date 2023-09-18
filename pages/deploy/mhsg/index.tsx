import { VStack, Text } from "@chakra-ui/react";
import Deploy from "../../../components/MainContent/components/Deploy/Deploy";
import MainContent from "../../../components/MainContent/MainContent";
import { DEPLOY_ACTIONS } from "../../../context/DeployContext";
import ReadForm from "./components/ReadForm/ReadForm";
import { useState } from "react";
import { set } from "zod";

const MHSG = () => {
  const [canAttachSafe, setCanAttachSafe] = useState<undefined | boolean>(
    undefined
  );
  const [safeAddress, setSafeAddress] = useState<string>("");
  const headerOne = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Hats Signer Gate Factory</Text>
      <Text>Select the type of Hats Signer Gate to deploy</Text>
    </VStack>
  );
  const headerTwo = () => (
    <>
      <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
        <Text as="b">Deploy Hats Signer Gate</Text>
        <Text>Input safe address, click ‘Read’</Text>
      </VStack>
    </>
  );

  const headerThree = () => (
    <>
      {canAttachSafe === false && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b" color="red">
            No the Safe cannot be Attached
          </Text>
          <Text>{safeAddress}</Text>
        </VStack>
      )}
      {canAttachSafe === true && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b" color="green">
            Safe can be attached
          </Text>
          <Text>{safeAddress}</Text>
        </VStack>
      )}
    </>
  );

  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_MHSG} />;
  const contentTwo = () => (
    <>
      {!canAttachSafe && (
        <ReadForm
          canAttachSafe={(value, address) => {
            setCanAttachSafe(value);
            setSafeAddress(address);
          }}
        />
      )}
      {canAttachSafe && <>Form here</>}
    </>
  );
  const contentThree = () => (
    <>
      {canAttachSafe === undefined && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>
            This step will check if your existing safe can be attached to the
            MHSG you are creating.
          </Text>
        </VStack>
      )}
      {canAttachSafe === false && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>&lt;&lt; Check another safe address</Text>
        </VStack>
      )}
      {canAttachSafe === true && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>
            <b>Owner Hat</b> can transfer ownership to a new Hat ID, set
            multisig parameters, and for a MHSG, add other Hats as valid
            signers. Note: once added as a valid signer, a Hat cannot be removed
            from the multisig.
          </Text>
          <Text>
            <b>Signer Hat</b> is the ID of the Hat(s) that will have signing
            authority for the Safe multisig.
          </Text>
          <Text>
            <b>Min Threshold</b> is the fewest number of signers that can
            execute a transaction.
          </Text>
          <Text>
            <b>Max Threshold</b> when reached becomes the fewest number of
            signers that can execute a transaction.
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
            In order to execute a transaction, the safe must have a number of
            valid hat-wearing signers &gt;= Min Threshold. Each valid signer
            added beyond the Min Threshold will increase the safe&apos;s
            threshold until the Max Threshold is reached, after which the
            Safe&apos;s threshold will not increase.
          </Text>
        </VStack>
      )}
    </>
  );

  return (
    <MainContent
      headerOne={headerOne()}
      headerTwo={headerTwo()}
      headerThree={headerThree()}
      contentOne={contentOne()}
      contentTwo={contentTwo()}
      contentThree={contentThree()}
    />
  );
};

export default MHSG;
