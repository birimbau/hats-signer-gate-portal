import type { NextPage } from "next";
import MainContent from "../../components/MainContent/MainContent";
import { useSelectedActionContext } from "../../context/SelectedActionContext";
import { HEADER_ACTIONS, SelectedActionType } from "../../context/SelectedActionContext";
import { useAccount } from "wagmi"; 
import { useEffect } from "react";
import { useRouter } from "next/router";
const X: NextPage = () => { //access state here through destructuring
    const router = useRouter()

        return <MainContent selected={router.pathname.slice(1).toUpperCase() as SelectedActionType} />


};



export default X;