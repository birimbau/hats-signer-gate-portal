import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { use, useState } from "react";
import * as Yup from 'yup';
import CustomInputWrapper from "../../../components/Deployers/forms/utils/CustomInputWrapper";
import { FiSettings } from "react-icons/fi";
import { useMinThreshold, useSetMinThreshold, useSetTargetThreshold, useTargetThreshold } from "../../../utils/hooks/HatsSignerGate";
import { useContractWrite } from "wagmi";

interface P {
    address?: string
}

const HSGModifyForm:React.FC<P> = p => {
    const { data: minThreshold, isLoading: minThresholdIsLoading } = useMinThreshold(p.address);
    const { data: maxThreshold, isLoading: maxThresholdIsLoading } = useTargetThreshold(p.address);

    const [formData, setFormData] = useState({
        minThreshold: minThreshold?.toString(),
        maxThreshold: maxThreshold?.toString(),
    });

    const validationSchema = Yup.object().shape({
        minThreshold: Yup.string().required('Required'),
        maxThreshold: Yup.string().required('Required'),
    })

    const { config: configMinThreshold, refetch: fetchUseMinThreshold } = useSetMinThreshold({_minThreshold: BigInt(formData.minThreshold || 0)}, p.address);
    const {
        isLoading: setMinThresholdIsLoading,
        writeAsync: writeSetMinThresholdAsync,
    } = useContractWrite(configMinThreshold);

    const { config, refetch: fetchUseMaxThreshold } = useSetTargetThreshold({_targetThreshold: BigInt(formData.maxThreshold || 0)}, p.address);
    const {
        isLoading: setMaxThresholdIsLoading,
        writeAsync: writeSetMaxThresholdAsync,
    } = useContractWrite(config);


    if (minThresholdIsLoading || maxThresholdIsLoading) {
        return <></>;
    }

    return <>
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData(values);
        fetchUseMinThreshold?.().then((data) => {
            debugger;
            if (data.status === 'error') {
                alert(data.error.message);
            } else {
                writeSetMinThresholdAsync?.();
            }
        });

        fetchUseMaxThreshold?.().then((data) => {
            debugger;
            if (data.status === 'error') {
                alert(data.error.message);
            } else {
                writeSetMaxThresholdAsync?.();
            }
        });

      }}
    >
    {(props) => (
      <Form>
      <VStack width='100%' alignItems={'flex-start'} fontSize={14} gap={5}>
      <CustomInputWrapper
        label='Min Threshold (integer)'
        placeholder='3'
        name='minThreshold'
      />

        <CustomInputWrapper
        label='Max Threshold (integer)'
        placeholder='3'
        name='maxThreshold'
      />

      <Button type='submit' isDisabled={!props.dirty || setMinThresholdIsLoading || setMaxThresholdIsLoading} leftIcon={<FiSettings />}>
        Modify
      </Button>
    </VStack>
  </Form>


    )}
    </Formik>
    </>
}

export default HSGModifyForm;