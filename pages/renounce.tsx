/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import MainContent from "@/components/MainContent";
import { BsChevronDoubleRight } from "react-icons/bs";
import { VStack, Text, Link, Icon } from "@chakra-ui/react";
import Button from "@/components/ui/CustomButton";

const Deploy: NextPage = () => {
	return (
		<MainContent
			headerOne={
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">
						Renounce Hat, and Signer Authority on Hats App
					</Text>
					<Text>
						Click "Go to Hats" to be redirected, and to connect your
						wallet
					</Text>
				</VStack>
			}
			contentOne={
				<Link href="https://app.hatsprotocol.xyz/" isExternal>
					<Button
						leftIcon={<Icon as={BsChevronDoubleRight} />}
						variant="outline"
					>
						Go to Hats App
					</Button>
				</Link>
			}
			contentThree={
				<>
					<Text>
						<b>Renounce Signing Authority</b> by giving up the
						signer hat on the Hats app.
					</Text>
					<Text mt={4}>
						If you decide that you no longer wish to be a signer on
						the safe, you have the option to relinquish your signing
						authority.
					</Text>
					<Text mt={4}>
						After Renouncing your signer Hat come back to this
						dashboard and Remove your address from the Safe to
						complete the process.
					</Text>
				</>
			}
		/>
	);
};

export default Deploy;
