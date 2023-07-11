import { useContractRead, useContractWrite } from "wagmi";
import { CONTRACTS } from "../constants";


// Hooks for write functions for the HatsSignerGateFactory contract


const useDeployHSG = (args: {_ownerHatId: string, _signerHatId: string, _safe: string, _minThreshold:number, _targetThreshold: number, _maxSigners: number}) => {
    const {data, isLoading, isSuccess, isError, write} = useContractWrite({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "deployHatsSignerGate",
        args: Array.from(Object.values(args))
    })
    return {data, isLoading, isSuccess, isError, write};
}

const useDeployHSGwSafe = (args: {_ownerHatId: string, _signerHatId: string, _minThreshold:number, _targetThreshold: number, _maxSigners: number}) => {
    const {data, isLoading, isSuccess, isError, write} = useContractWrite({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "deployHatsSignerGateWithSafe",
        args: Array.from(Object.values(args))
    })

    return {data, isLoading, isSuccess, isError, write};
}

const useDeployMultiHatSG = (args: {_ownerHatId: string, _signerHatId: string, _safe: string, _minThreshold:number, _targetThreshold: number, _maxSigners: number}) => {
    const {data, isLoading, isSuccess, isError, write} = useContractWrite({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "deployMultiHatsSignerGate",
        args: Array.from(Object.values(args))
    })

    return {data, isLoading, isSuccess, isError, write};
}

const useDeployMultiHatSGwSafe = (args: {_ownerHatId: string, _signerHatId: string, _minThreshold:number, _targetThreshold: number, _maxSigners: number}) => {
    const {data, isLoading, isSuccess, isError, write} = useContractWrite({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "deployMultiHatsSignerGateWithSafe",
        args: Array.from(Object.values(args))
    })

    return {data, isLoading, isSuccess, isError, write};
}


// Hooks for read functions for the HatsSignerGateFactory contract
const useCanAttachHSG2Safe = (args: {_hsg: string}) => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "canAttachHSGToSafe",
        args: Array.from(Object.values(args))
    })

    return {data, isLoading, isSuccess, isError};
    
}

const useCanAttachMHSG2Safe = (args: {_mhsg: string}) => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "canAttachMHSGToSafe",
        args: Array.from(Object.values(args))
    })

    return {data, isLoading, isSuccess, isError};
    
}


const useGnosisFallbackLibrary = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "gnosisFallbackLibrary",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useGnosisMultiSendLibrary = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "gnosisMultiSendLibrary",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}


const useGnosisSafeProxyFactory = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "gnosisSafeProxyFactory",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useGnosisHasProxyFactory = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "gnosisHasProxyFactory",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useHatsAddresses = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "hatAddress",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useHatsSignerGateSingleton = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "hatsSignerGateSingleton",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useMultiHatsSignerGateSingleton = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
        functionName: "multiHatsSignerGateSingleton",
        args: []
    })

    return {data, isLoading, isSuccess, isError}
}

const useSafeSigleton = () => {
    const {data, isLoading, isSuccess, isError} = useContractRead({
        abi: CONTRACTS.hatsSignerGateFactory.contractABI,
        address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`, 
        functionName: "safe",
        args: []
    })

    return {data, isLoading,
        isSuccess, isError}
}


export {

    // All the write function hooks are below
    useDeployHSG,
    useDeployHSGwSafe,
    useDeployMultiHatSG,
    useDeployMultiHatSGwSafe,
    // All the read function hooks are below
    useCanAttachHSG2Safe,
    useCanAttachMHSG2Safe,
    useGnosisFallbackLibrary,
    useGnosisMultiSendLibrary,
    useGnosisSafeProxyFactory,
    useGnosisHasProxyFactory,
    useHatsAddresses,
    useHatsSignerGateSingleton,
    useMultiHatsSignerGateSingleton,
    useSafeSigleton

}