import type { NextPage } from "next";
import MainContent from "../components/MainContent/MainContent";
import { SelectedActionType, useSelectedActionContext } from "../context/SelectedActionContext";
import { useEffect } from 'react';

const Home: NextPage = () => { //access state here through destructuring
    
    const { selected, setSelected } = useSelectedActionContext();
    useEffect(() => {
        setSelected(undefined);
    }, [selected, setSelected]);
        return (<MainContent />)
   
};

export default Home;

