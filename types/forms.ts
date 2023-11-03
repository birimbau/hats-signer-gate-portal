import { AbiTypeToPrimitiveType } from "abitype";
import { Hex } from "viem";

export interface DeployConfigHSG_BigInt {
	_ownerHatId: AbiTypeToPrimitiveType<"uint256">;
	_signerHatId: AbiTypeToPrimitiveType<"uint256">;
	_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	_maxSigners: AbiTypeToPrimitiveType<"uint256">;
}

// used to allow the FE to have strings, this is converted
export interface DeployConfigHSGWS {
	_ownerHatId: string;
	_signerHatId: string;
	_minThreshold: string;
	_targetThreshold: string;
	_maxSigners: string;
}
export interface DeployConfigMHSGWS {
	_ownerHatId: string;
	_signersHatIds: string[];
	_minThreshold: string;
	_targetThreshold: string;
	_maxSigners: string;
}
export interface DeployConfigMHSG {
	_ownerHatId: string;
	_signersHatIds: string[];
	_safe: Hex;
	_minThreshold: string;
	_targetThreshold: string;
	_maxSigners: string;
}
export interface DeployConfigHSG {
	_ownerHatId: string;
	_signerHatId: string;
	_safe: Hex;
	_minThreshold: string;
	_targetThreshold: string;
	_maxSigners: string;
}

// This is redundent code used for double checking types inside of: useDeployMultiHatSG
export interface MHSG_Args {
	_ownerHatId: AbiTypeToPrimitiveType<"uint256">;
	_signersHatIds: AbiTypeToPrimitiveType<"uint256">[];
	_safe: AbiTypeToPrimitiveType<"address">;
	_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	_maxSigners: AbiTypeToPrimitiveType<"uint256">;
}
export interface MHSGWS_Args {
	_ownerHatId: AbiTypeToPrimitiveType<"uint256">;
	_signersHatIds: AbiTypeToPrimitiveType<"uint256">[];
	_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	_maxSigners: AbiTypeToPrimitiveType<"uint256">;
}
export interface HSG_Args {
	_ownerHatId: AbiTypeToPrimitiveType<"uint256">;
	_signerHatId: AbiTypeToPrimitiveType<"uint256">;
	_safe: AbiTypeToPrimitiveType<"address">;
	_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	_maxSigners: AbiTypeToPrimitiveType<"uint256">;
}
export interface HSGWS_Args {
	_ownerHatId: AbiTypeToPrimitiveType<"uint256">;
	_signerHatId: AbiTypeToPrimitiveType<"uint256">;
	_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	_maxSigners: AbiTypeToPrimitiveType<"uint256">;
}
