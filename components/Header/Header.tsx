import { Box, Flex, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { TfiMenuAlt } from "react-icons/tfi";
import HeaderActions from "../HeaderActions/HeaderActions";
import * as S from "./Header.styled";
import { useRouter } from "next/router";
import { useSelectedActionContext } from "../../context/SelectedActionContext";

const Header = () => {
	const router = useRouter();
	function clickHandler() {
		router.replace("/");
	}
	return (
		<Box
			padding="8px 16px"
			width="100%"
			background="button.white"
			boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
			zIndex="2"
			position="sticky"
			top="0"
		>
			<Flex justifyContent="space-between" alignItems="center">
				<Flex alignItems="center" gap="94px">
					<Image
						src="/logo.svg"
						width={56}
						height={56}
						alt="Hats logo"
						onClick={() => clickHandler()}
					/>

					<Link
						href="https://docs.hatsprotocol.xyz"
						isExternal
						padding="8px 16px"
						color="gray.700"
						border="1px solid"
						borderColor="gray.700"
						borderRadius="6px"
						backgroundColor="white"
						fontSize="16px"
						fontWeight="500"
						_hover={{
							textDecoration: "none",
						}}
					>
						<Flex alignItems="center" gap={"8px"}>
							<TfiMenuAlt /> Hats Signer Gate (HSG) Documentation
						</Flex>
					</Link>
				</Flex>
				<ConnectButton />
			</Flex>
		</Box>
	);
};

export default Header;
