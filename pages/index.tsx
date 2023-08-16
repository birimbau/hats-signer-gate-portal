import type { NextPage } from "next";
import MainContent from "../components/MainContent/MainContent";
import { SelectedActionType } from "../context/SelectedActionContext";

const Home: NextPage = () => { //access state here through destructuring

   
        return (<MainContent selected={undefined as SelectedActionType['selected']} />)
   
};

export default Home;

