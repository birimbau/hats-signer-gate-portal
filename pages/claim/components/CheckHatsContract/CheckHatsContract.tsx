import { VStack } from "@chakra-ui/react";
import Input from "../../../../components/UI/CustomInput/CustomInput";
import { useState } from "react";
import Button from "../../../../components/UI/CustomButton/CustomButton";
import { GrDownload } from 'react-icons/gr';
import { useValidSignerHats } from "../../../../utils/hooks/MultiHatsSignerGate";
import { useGetHatsContract } from "../../../../utils/hooks/HatsSignerGate";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import CustomInputWrapper from "../../../../components/Deployers/forms/utils/CustomInputWrapper";

interface P {
  onResult: ({
    isMhsg,
    isHsg,
  }: {
    isMhsg: boolean;
    isHsg: boolean;
  }, address: string) => void;
}

const CheckHatsContract: React.FC<P> = p => { 
    const [formData, setFormData] = useState({
        contractAddress: '',
      });

      // Used to check if its a MHSG
      const { refetch: checkMHSG, isLoading: checkMHSGIsLoading } = useValidSignerHats({
        input: 0
      }, formData.contractAddress);

      // Used to check if its a HSG
      const { refetch: checkHSG, isLoading: checkHSGIsLoading } = useGetHatsContract(formData.contractAddress);

      const validationSchema = Yup.object().shape({
        contractAddress: Yup.string().required('Required'),
      })

    return <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setFormData(values);
        checkMHSG?.().then((mhsgResult) => {
          if (mhsgResult.data === undefined) {
            checkHSG?.().then((hsgResult) => {
              if (hsgResult.isSuccess) {
                p.onResult({
                  isMhsg: false,
                  isHsg: true
                }, formData.contractAddress);
              } else {
                p.onResult({
                  isMhsg: false,
                  isHsg: false
                }, formData.contractAddress);
              }
            });
          } else {
            p.onResult({
              isMhsg: true,
              isHsg: false
            }, formData.contractAddress);
    }});
      }}
    >
    {(props) => (
      <Form>
      <VStack width='100%' alignItems={'flex-start'} fontSize={14} gap={5}>
      <CustomInputWrapper
        label='HSG or MHSG Contract (address)'
        placeholder='0xC8ac0000000000000000000000000000000047fe'
        name='contractAddress'
      />

      <Button type='submit' isDisabled={!props.dirty || checkMHSGIsLoading || checkHSGIsLoading} leftIcon={<GrDownload />}>
        Fetch
      </Button>
    </VStack>
  </Form>


    )}
    </Formik>



    
}

export default CheckHatsContract;