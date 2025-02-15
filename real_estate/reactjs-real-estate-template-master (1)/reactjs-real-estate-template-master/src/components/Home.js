import FlatList from "./FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import References from "./References"
import Subscribe from "./Subscribe"
import BestFlatList from "./BestFlatList"
import Slider from "./Slider"


const Home=()=>{
    return (
        <React.Fragment>
            <Slider/>
            <Banner/>   
            <FlatList/>
            <BestFlatList/>
            <Subscribe/>
            <TeamList/>
            <References/>
        </React.Fragment>
    )
}

export default Home;