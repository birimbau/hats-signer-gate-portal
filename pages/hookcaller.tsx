import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import { useFormik } from 'formik';
  import {
    useAccount, useContractWrite,
  } from 'wagmi';
  import z from 'zod';
  import { useState } from 'react';
  
  import { useDeployHSG } from '../utils/hooks/HatsSignerGateFactory';
  
  interface useDeployHSGargs {_ownerHatId: string, _signerHatId: string, _safe: string, _minThreshold:number, _targetThreshold: number, _maxSigners: number}
  
  
  export default function HatsSignerGateForm() {
    const { address, isConnected, isDisconnected } = useAccount();
    
  const [args, SetArgs] = useState<useDeployHSGargs>({_ownerHatId: '', _signerHatId: '', _safe: '', _minThreshold: 0, _targetThreshold: 0, _maxSigners: 0});
  
  const { config } = useDeployHSG(args);
  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  
  
  
    return (
      <VStack width='100%'>
        <Input placeholder='Owner Hat ID' onChange={(e) => SetArgs({...args, _ownerHatId: e.target.value})} />
        <Input placeholder='Signer Hat ID' onChange={(e) => SetArgs({...args, _signerHatId: e.target.value})} />
        <Input placeholder='Safe Address' onChange={(e) => SetArgs({...args, _safe: e.target.value})} />
        <Input placeholder='Minimum Threshold' onChange={(e) => SetArgs({...args, _minThreshold: parseInt(e.target.value)})} />
        <Input placeholder='Target Threshold' onChange={(e) => SetArgs({...args, _targetThreshold: parseInt(e.target.value)})} />
        <Input placeholder='Maximum Signers' onChange={(e) => SetArgs({...args, _maxSigners: parseInt(e.target.value)})} />
        <Button disabled={!write && isDisconnected} onClick={() => write?.()} width={'100%'} variant={'solid'}>Deploy</Button>
        </VStack>
    )};