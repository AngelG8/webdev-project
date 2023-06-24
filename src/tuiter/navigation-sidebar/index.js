import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationSidebar = () => {
    const { pathname } = useLocation();
    const [ignore, tuiter, active] = pathname.split("/");
    const links = ["home", "explore", "notifications", "messages", "bookmarks", "lists", "profile", "more"];
    const icons = ["fas fa-home", "fas fa-hashtag", "fas fa-bell", "fas fa-envelope", "fas fa-bookmark", "fas fa-list", "fas fa-user", "fas fa-ellipsis-h"];
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="list-group">
            {links.map((link, index) =>
                <Link to={`/tuiter/${link}`} className={`list-group-item text-capitalize ${active === link ? "active" : ""}`}>
                    <i className={icons[index]}></i> <span class="d-none d-xxl-inline">{link}</span>
                </Link>
            )}

            {!currentUser && <Link className="list-group-item text-capitalize" to="/tuiter/login">
                <i class="fa-solid fa-right-to-bracket"></i> <span class="d-none d-xxl-inline">Login</span>
            </Link>}
            {!currentUser && <Link className="list-group-item text-capitalize" to="/tuiter/register">
                <i class="fa-solid fa-address-card"></i> <span class="d-none d-xxl-inline">Register</span>
            </Link>}
        </div>
    );
};
export default NavigationSidebar;