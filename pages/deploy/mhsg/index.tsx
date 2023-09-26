import { VStack, Text } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm, {
  EthereumAddress,
} from '../../../components/Deployers/forms/utils/ReadForm';
import { useState } from 'react';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';
import MultiHatsSignerGateForm from '../../../components/Deployers/forms/MultiHatsSignerGateForm/MultiHatsSignerGateForm';
import {
  DeployConfigHSG_String,
  DeployConfigMHSG_String,
} from '../../../components/Deployers/forms/types/forms';
import HatsSignerGateAndSafeForm from '../../../components/Deployers/forms/HatsSignerGateAndSafeForm/HatsSignerGateAndSafeForm';

// TODO - CONNECT THE FORM
// TODO - APPLY TO THE HSG

const MHSG = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [formData, setFormData] = useState<DeployConfigMHSG_String>({
    _ownerHatId: '',
    _signersHatIds: [''],
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
    _safe: '',
  });
  // const [formData, setFormData] = useState<DeployConfigHSG_String>({
  //   _ownerHatId: '',
  //   _signerHatId: '',
  //   _minThreshold: '',
  //   _targetThreshold: '',
  //   _maxSigners: '',
  // });
  const [transactionData, setTransactionData] = useState(undefined);

  // Use this state for conditional rendering
  const [canAttachSafe, setCanAttachSafe] = useState<undefined | boolean>(
    undefined
  );
  // We need access to the SafeAddress that is 'Read' and validated
  const [safeAddress, setSafeAddress] = useState<EthereumAddress>('0x');

  const headerOne = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Hats Signer Gate Factory</Text>
      <Text>Select the type of Hats Signer Gate to deploy</Text>
    </VStack>
  );
  const headerTwo = () => (
    <>
      <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
        <Text as="b">Deploy Multi Hats Signer Gate</Text>
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
        // TODO - HatsSignerGateAndSafeForm WORKS AS EXPECTED WHEN PLACED IN HERE.
        //        FIND SOME WAY OF RECREATING THE MultiHatsSignerGateForm.
        //        MAYBE STRIP OUT EVERYTHING AND JUST WORK WITH IT IN A SIMPLE FORM
        // IT HAS TO BE SOMETHING TO DO WITH MultiHatsSignerGateForm.
        // CHECK WITH GPT ON WHY THIS MIGHT BE.
        // FOLLOW THE LOGIC FROM BEGINNING TO END

        // I DOUBT ITS VALIDATION, BUT MAYBE IT'S SOMETHING INSIDE OF YUP?

        // <HatsSignerGateAndSafeForm
        //   setIsPending={setIsPending}
        //   setData={setData}
        //   setTransactionData={setTransactionData}
        //   formData={formData}
        //   setFormData={setFormData}
        //   isPending={isPending}
        // />
        <MultiHatsSignerGateForm
          setIsPending={setIsPending}
          setData={setData}
          setTransactionData={setTransactionData}
          formData={formData}
          setFormData={setFormData}
          isPending={isPending}
        />
        // <ReadForm
        //   setCanAttachSafe={setCanAttachSafe}
        //   setSafeAddress={setSafeAddress}
        //   safeAddress={safeAddress}
        // />
      )}
      {/* {canAttachSafe && (
        <MultiHatsSignerGateForm
          setIsPending={setIsPending}
          setData={setData}
          setTransactionData={setTransactionData}
          formData={formData}
          setFormData={setFormData}
          isPending={isPending}
        />
      )} */}
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
        // <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
        <VariableExplanations />
        // </VStack>
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
