import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icon from 'react-bootstrap-icons';

const NavigationSidebar = () => {
    // return null;
    const{ pathname } = useLocation();
    const[ignore, guider, active] = pathname.split("/");
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="list-group">
            <Link to={"/"} className={`list-group-item`}>
                <div className="d-none d-xl-block">
                    <Icon.Twitter/> 
                    <span style={{fontSize:16}}>Tuiter</span>
                </div>
                <div className={"d-xl-none"}><i className="bi bi-twitter  mt-1 me-1"></i></div>
            </Link>

            <Link to={"/guider/home "} className={`list-group-item
                    ${active === "home" ? "active" : ""} `}>
                    <Icon.House/> 
                    <span style={{fontSize:16}}>Home</span>
            </Link>

            <Link to={"/guider/explore "} className={`list-group-item
                    ${active === "explore" ? "active" : ""}`}>
                    <Icon.Hash/> 
                    <span style={{fontSize:16}}>Explore</span>
            </Link>
        
        
            {currentUser && <Link to={"/guider/profile "} className={`list-group-item
                    ${active === "profile" ? "active" : ""}`}>
                    <Icon.Person/>
                    <span style={{fontSize:16}}>Profile</span>
            </Link>}
        
            <Link to={"/guider/more "} className={`list-group-item
                    ${active === "more" ? "active" : ""}`}>
                    <Icon.ThreeDots/>
                    <span style={{fontSize:16}}>More</span>
            </Link>

            {!currentUser && <Link to={"/guider/login "} className={`list-group-item
                        ${active === "login" ? "active" : ""}`}>
                        <Icon.PersonBadge/>
                        <span style={{fontSize:16}}>LogIn</span>
            </Link>}
        
            {!currentUser && <Link to={"/guider/register "} className={`list-group-item
                        ${active === "register" ? "active" : ""}`}>
                        <Icon.PersonAdd/>
                        <span style={{fontSize:16}}>Register</span>
            </Link>}

        </div>
    );
};
export default NavigationSidebar;
