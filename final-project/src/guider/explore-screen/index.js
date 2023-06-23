import React from "react";
// To Do
// import TuitSummaryList from "../tuit-summary-list/index";
import { AiOutlineSearch } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import "./index.css";

function ExploreScreen() {
    return(
        <>
            <div className="row">
                <div className="col-11 position-relative">
                    <input placeholder="Search Guider"
                            className="form-control rounded-pill ps-5"/>
                    <AiOutlineSearch className="fs-3 position-absolute 
                            wd-nudge-up"/>
                </div>
                
                <div className="col-1">
                    <GoGear className="wd-top-4 float-end
                        fs-3 position-relative"/>
                </div>
            </div>
            <ul className="nav nav-pills mb-2 mt-2">
                <li className="nav-item">
                    <a className="nav-link active">For You</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Surroundings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Food</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Travel</a>
                </li>
                <li className="nav-item d-none d-md-block d-lg-block d-xxl-block">
                    <a className="nav-link">Sports</a>
                </li>
            </ul>
                <div className="position-relative mb-2">
                    {/* #location */}
                    <img src="/images/HAWAII.jpeg" className="w-100"/>
                    <h1 className="position-absolute wd-nudge-up text-white">
                        Hawaii Travel</h1>
                </div>
            <GuidesSummaryList/>
        </>
    );
};
export default ExploreScreen;