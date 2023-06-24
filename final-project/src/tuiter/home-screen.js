import React from "react";
import TuitList from "./tuits";
import "./index.css";
import WhatsHappening from "./whats-happening";
function HomeScreen() {
    return (
        <>
            <h4>Home</h4>
            <WhatsHappening />
            <TuitList />
        </>
    );
};
export default HomeScreen;