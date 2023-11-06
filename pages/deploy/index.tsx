import type { NextPage } from "next";
import { VStack, Text } from "@chakra-ui/react";
import MainContent from "@/components/MainContent";
import DeployActions from "@/components/DeployButtons";

const Deploy: NextPage = () => {
	return (
		<MainContent
			headerOne={
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Hats Signer Gate Factory</Text>
					<Text>Select the function to call</Text>
				</VStack>
			}
			contentOne={<DeployActions />}
		/>
	);
};

export default Deploy;
