import { VStack, Text } from '@chakra-ui/react';
import Deploy from '../../../components/MainContent/components/Deploy/Deploy';
import MainContent from '../../../components/MainContent/MainContent';
import { DEPLOY_ACTIONS } from '../../../context/DeployContext';
import ReadForm from '../../../components/Deployers/forms/utils/ReadForm';
import { useState } from 'react';
import VariableExplanations from '../../../components/Deployers/forms/utils/VariableExplainations';
import { DeployConfigHSG } from '../../../components/Deployers/forms/types/forms';
import HatsSignerGateForm from '../../../components/Deployers/forms/HatsSignerGateForm/HatsSignerGateForm';

const HSG = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<DeployConfigHSG>({
    _ownerHatId: '',
    _signerHatId: '',
    _safe: '0x',
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
  });

  // Use this state for conditional rendering
  const [canAttachSafe, setCanAttachSafe] = useState<undefined | boolean>(
    undefined
  );

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
            No the Safe cannot be attached
          </Text>
          <Text>{formData._safe}</Text>
        </VStack>
      )}
      {canAttachSafe === true && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b" color="green">
            Safe can be attached
          </Text>
          <Text>{formData._safe}</Text>
        </VStack>
      )}
    </>
  );

  const contentOne = () => <Deploy active={DEPLOY_ACTIONS.DEPLOY_HSG} />;
  const contentTwo = () => (
    <>
      {!canAttachSafe && (
        <ReadForm
          setCanAttachSafe={setCanAttachSafe}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {canAttachSafe && (
        <HatsSignerGateForm
          setIsPending={setIsPending}
          isPending={isPending}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </>
  );
  const contentThree = () => (
    <>
      {canAttachSafe === undefined && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>
            This step will check if your existing safe can be attached to the
            HSG you are creating.
          </Text>
        </VStack>
      )}
      {canAttachSafe === false && (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text>&lt;&lt; Check another safe address</Text>
        </VStack>
      )}
      {canAttachSafe === true && <VariableExplanations />}
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

export default HSG;
