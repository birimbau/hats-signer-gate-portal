import { VStack, Text } from "@chakra-ui/react";
import MainContent from "@/components/MainContent";
import CheckHatsContract from "@/forms/CheckHatsContractForm";
import { useState } from "react";
import Button from "@/components/ui/CustomButton";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "@/utils";
import { FiCopy } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import HSGClaimForm from "@/forms/HSGClaimForm";
import MHSGClaimForm from "@/forms/MHSGClaimForm";
import SafeButton from "@/components/ui/SafeButton";
import MaxSigners from "@/components/ui/MaxSigners";
import MaxThreshold from "@/components/ui/MaxThreshold";
import MinThreshold from "@/components/ui/MinThreshold";

const Claim = () => {
	const [result, setResult] = useState<
		undefined | { isHsg: boolean; isMhsg: boolean }
	>(undefined);
	const [address, setAddress] = useState<undefined | `0x${string}`>(
		undefined,
	);
	const [isPending, setIsPending] = useState(false);
	const [transaction, setTransaction] = useState(undefined);
	const { chain } = useNetwork();

	const headerOne = () => (
		<VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
			<Text as="b">Claim Signing Authority</Text>
			<Text>Connect wallet with relevant hat, click ‘Fetch’</Text>
		</VStack>
	);

	const contentOne = () => {
		return (
			<CheckHatsContract
				onResult={(result, address) => {
					setResult(result);
					setAddress(address);
				}}
			/>
		);
	};

	const headerTwo = () => {
		if (result?.isMhsg || result?.isHsg) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Claim Signer for Multisig</Text>
					<Text>Click &rsquo;Claim&rsquo;</Text>
				</VStack>
			);
		}
		return <></>;
	};

	const contentTwo = () => {
		if (!transaction && result?.isMhsg) {
			return (
				<MHSGClaimForm
					address={address}
					onLoading={(value) => setIsPending(value)}
					onTransactionComplete={(transaction) => {
						setTransaction(transaction);
					}}
				/>
			);
		}

		if (!transaction && result?.isHsg) {
			return (
				<HSGClaimForm
					address={address}
					onLoading={(value) => setIsPending(value)}
					onTransactionComplete={(transaction) => {
						setTransaction(transaction);
					}}
				/>
			);
		}
		return <></>;
	};

	const headerThree = () => {
		if (isPending) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Transaction Pending...</Text>
				</VStack>
			);
		}

		if (!isPending && transaction) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Transaction Complete</Text>
				</VStack>
			);
		}

		return <></>;
	};

	const contentThree = () => {
		if (!isPending && !transaction) {
			return (
				<VStack gap="25px" alignItems={"flex-start"}>
					<Text>
						<Text as="b">Claim Signing Authority</Text> on a
						multisig safe that is controlled by an HSG or MHSG for
						which you wear the signing Hat.
					</Text>
					<Text>
						After the contract owner assigns the signer hat to your
						wallet address, you can be included in the safe.
					</Text>
				</VStack>
			);
		}
		if (!isPending && transaction) {
			return (
				<VStack
					height="100%"
					alignItems="flex-start"
					gap={"24px"}
					mt="24px"
				>
					<Button
						leftIcon={<FiCopy />}
						minWidth={"60%"}
						onClick={() => {
							window.open(
								`${getBlockExplorerUrl(
									chain?.id || 1,
								)}/address/${transaction}`,
							);
						}}
					>
						View Transaction
					</Button>
					<Button
						leftIcon={<BsCardList />}
						minWidth={"60%"}
						onClick={() => {
							window.open(
								`${getBlockExplorerUrl(
									chain?.id || 1,
								)}/address/${address}`,
							);
						}}
					>
						View {result?.isMhsg ? `MHSG` : `HSG`} Contract
					</Button>

					<SafeButton
						address={address}
						type={result?.isMhsg ? "MHSG" : "HSG"}
					/>
					{result?.isMhsg && (
						<>
							<MaxSigners address={address} />
							<MaxThreshold address={address} />
							<MinThreshold address={address} />
						</>
					)}
					{result?.isHsg && (
						<>
							<MaxSigners address={address} />
							<MaxThreshold address={address} />
							<MinThreshold address={address} />
						</>
					)}
				</VStack>
			);
		}

		return <></>;
	};

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

export default Claim;
