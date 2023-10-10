import { Flex, VStack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInputWrapper from '../../../../components/Deployers/forms/utils/CustomInputWrapper';
import Button from '../../../../components/UI/CustomButton/CustomButton';
import { AiOutlineRead } from 'react-icons/ai';
import { useIsValidSigner } from '../../../../utils/hooks/HatsSignerGate';
import { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { useCanAttachHSG2Safe } from '../../../../utils/hooks/HatsSignerGateFactory';


interface P {
    address: string;
}

const HSGAttachSafe:React.FC<P> = (p) => {
    const [result, setResult] = useState<any>(null);
    const [formData, setFormData] = useState({
        _account: '',
      });
    
    const validationSchema = Yup.object().shape({
        _account: Yup.string().required('Required').ethereumAddress(),
      });
    
      const {refetch, data, isLoading, isSuccess} = useIsValidSigner(formData, p.address);



    return <><Formik
    initialValues={{ _account: '' }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      setFormData(values);
      refetch?.().then((data) => {
        setResult(data.data);
      });
    }}
  >
    {(props) => (
      <Form noValidate>
        <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
          <Flex flexDirection={'column'} gap={0} w={'100%'}>
            <CustomInputWrapper
              name="_account"
              label="Signer Wallet (address)"
              placeholder="0xC8ac0000000000000000000000000000000047fe"
            />
          </Flex>

          <Button
            type="submit"
            leftIcon={<AiOutlineRead />}
            isDisabled={isLoading || !props.dirty}
          >
            Read
          </Button>
        </VStack>
      </Form>
    )}
  </Formik>
  {result && isSuccess && <Text marginTop="20px" color="green">Wallet is a Valid Signer</Text>}
  {!result && isSuccess && <Text marginTop="20px" color="red">Wallet is not a Valid Signer</Text>}
  </>
}

export default HSGAttachSafe;