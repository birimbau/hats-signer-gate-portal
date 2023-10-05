import { AbiTypeToPrimitiveType } from 'abitype';
import { EthereumAddress } from '../utils/ReadForm';

export interface DeployConfigHSG_BigInt {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}

// used to allow the FE to have strings, this is converted
export interface DeployConfigHSGWF {
  _ownerHatId: string;
  _signerHatId: string;
  _minThreshold: string;
  _targetThreshold: string;
  _maxSigners: string;
}
export interface DeployConfigMHSG {
  _ownerHatId: string;
  _signersHatIds: string[];
  _safe: EthereumAddress;
  _minThreshold: string;
  _targetThreshold: string;
  _maxSigners: string;
}
export interface DeployConfigHSG {
  _ownerHatId: string;
  _signerHatId: string;
  _safe: EthereumAddress;
  _minThreshold: string;
  _targetThreshold: string;
  _maxSigners: string;
}

// This is redundent code used for double checking types inside of: useDeployMultiHatSG
export interface MHSG_Args {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signersHatIds: AbiTypeToPrimitiveType<'uint256'>[];
  _safe: AbiTypeToPrimitiveType<'address'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}
export interface HSG_Args {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _safe: AbiTypeToPrimitiveType<'address'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}
