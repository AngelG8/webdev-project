import React from "react";
import { Link, useLocation } from "react-router-dom";
import links from "./nav.json";


function Navigation(){
    const location = useLocation();
    const {pathname} = location;


    
    return(
        <div className='nav nav-pills'>

            {links.map(({path,label}) => (
                <Link
                className= {`nav-link ${pathname === path? "active" : ""}`} to = {path}
                >
                {label}
                </Link>
            ))}
      
      
    </div>
    );
}

export default Navigation;