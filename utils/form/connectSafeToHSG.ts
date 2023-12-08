import Web3 from "web3";
import Safe, { Web3Adapter } from "@safe-global/protocol-kit";
import SafeApiKit, { ProposeTransactionProps } from "@safe-global/api-kit";
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types";
import { Hex } from "viem";
import { ChainKeys, SAFE_API_URL } from "../constants";

// Add error rendering

async function connectSafeToHSG(
	existingHSGAddress: Hex,
	connectedAddress: Hex,
	safeAddress: Hex,
	chainId: number,
	setTransactionHash: (transactionHash?: string) => void,
	setIsSigningExecuting: (isSigningExecuting: boolean) => void,
): Promise<boolean> {
	if (typeof window.ethereum === "undefined") {
		throw new Error("MetaMask is not installed!");
	}

	const web3 = new Web3(window.ethereum); // Use MetaMask's provider

	// Request user connection to MetaMask
	const accounts = await window.ethereum.request({
		method: "eth_requestAccounts",
	});
	if (!accounts || accounts.length === 0) {
		throw new Error("Failed to connect to MetaMask");
	}

	const ethAdapter = new Web3Adapter({
		web3,
		signerAddress: accounts[0], // Use the first account from MetaMask
	});

	if (!connectedAddress) {
		throw new Error("No address connected");
	}

	// I need to use the EthersAdapter to connect to the @safe-global/protocol-kit SDK.
	// To use 'Ethers' for the EthersAdapter, we must use V5. Because this project uses Ethers V6, I opted for a Web3 implementation instead.
	let safeSdk;
	let safeService;
	try {
		// Connects the 'Connected user' to the safe in question so that the user can perform the required actions: 'createEnableModuleTx' & 'createEnableGuardTx'
		safeSdk = await Safe.create({
			ethAdapter,
			safeAddress: safeAddress,
		});
		safeService = new SafeApiKit({
			txServiceUrl: SAFE_API_URL[chainId as ChainKeys],
			ethAdapter,
		});
		// console.log('safeSdk: ', safeSdk);
	} catch (error) {
		console.error("Error creating Safe instance:", error);
		return false;
	}

	try {
		// 1. Prepare the transactions
		const safeThreshold = await safeSdk.getThreshold();
		const enableModuleTx =
			await safeSdk.createEnableModuleTx(existingHSGAddress);
		// console.log('enableModuleTx: ', enableModuleTx);

		const enableGuardTx =
			await safeSdk.createEnableGuardTx(existingHSGAddress);
		// console.log('enableGuardTx: ', enableGuardTx);

		const safeTransactionData: MetaTransactionData[] = [
			{
				to: enableModuleTx.data.to,
				value: enableModuleTx.data.value.toString(),
				data: enableModuleTx.data.data,
				// you can add operation if needed, but it's optional
			},
			{
				to: enableGuardTx.data.to,
				value: enableGuardTx.data.value.toString(),
				data: enableGuardTx.data.data,
				// you can add operation if needed, but it's optional
			},
		];
		// console.log('safeTransactionData: ', safeTransactionData);

		// 2. Use the `createTransaction` function for MultiSend transactions
		const batchedTransaction = await safeSdk.createTransaction({
			safeTransactionData,
		});
		console.log("batchedTransaction: ", batchedTransaction);

		// 3. Sign the batched transaction
		const signedBatchedTx = await safeSdk.signTransaction(
			batchedTransaction,
			"eth_signTypedData_v4",
		);
		console.log("signedBatchedTx: ", signedBatchedTx);

		// 4. Propose or execute the batched transaction
		if (safeThreshold === 1) {
			const txResponse =
				await safeSdk.executeTransaction(signedBatchedTx);
			console.log("txResponse1", txResponse);
			// await txResponse.transactionResponse?.wait();
			// console.log(
			//   'Batched transaction executed successfully. Response:',
			//   txResponse
			// );
			// 5. Pass new data back to parents
			if (txResponse.hash) setTransactionHash(txResponse.hash);
			return true;
		}

		const safeTxHash = await safeSdk.getTransactionHash(batchedTransaction);
		const senderSignature = signedBatchedTx.signatures.get(
			connectedAddress?.toLowerCase(),
		)?.data;
		if (!senderSignature) {
			console.log("no sender signature");
			return false;
		}

		const transactionConfig: ProposeTransactionProps = {
			safeAddress,
			safeTxHash,
			safeTransactionData: batchedTransaction.data,
			senderAddress: connectedAddress,
			senderSignature,
			origin,
		};
		const result = await safeService.proposeTransaction(transactionConfig);
		console.log(result);

		return true;
	} catch (error) {
		// Enables the user to click the submit button again.
		setIsSigningExecuting(false);

		console.error("Error in batched transaction:", error);
		return false;
	}
}

export async function handleConnect(
	existingHSGAddress: Hex,
	connectedAddress: Hex,
	safeAddress: Hex,
	chainId: number,
	setTransactionHash: (transactionHash?: string) => void,
	setIsSigningExecuting: (isSigningExecuting: boolean) => void,
): Promise<void> {
	// console.log('inside handleConnect');
	console.log(
		existingHSGAddress,
		connectedAddress,
		safeAddress,
		chainId,
		setTransactionHash,
		setIsSigningExecuting,
	);

	try {
		await connectSafeToHSG(
			existingHSGAddress,
			connectedAddress,
			safeAddress,
			chainId,
			setTransactionHash,
			setIsSigningExecuting,
		); // <-- Get the return value (True/False)
	} catch (error) {
		// Enables the user to click the submit button again.
		setIsSigningExecuting(false);

		if (error instanceof Error) {
			console.error("Error connecting Safe to HSG:", error.message);
		} else {
			console.error("An unexpected error occurred:", error);
		}
	}
}

// const signedGuardTx = await signSafeTransaction(safeSdk, enableGuardTx);
// console.log('signedGuardTx', signedGuardTx);
