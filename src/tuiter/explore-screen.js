import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import TuitList from "./tuits";
import TuitSearch from "./tuits/tuit-search";
import { searchTuitsThunk } from "./services/tuits-thunks";
import "./index.css";

function ExploreScreen() {
    const initialSearchResults = useSelector((state) => state.tuits.searchResults);
    const [searchResults, setSearchResults] = useState(initialSearchResults);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const handleSearch = async () => {
        try {
            await dispatch(searchTuitsThunk(searchTerm));
        } catch (e) {
            alert(e);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        setSearchResults(searchResults);
    }, [searchResults]);

    return (
        <>
            <div className="row">
                <div className="col-12 position-relative">
                    <input
                        placeholder="Search"
                        className="form-control rounded-pill ps-5"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <AiOutlineSearch
                        className="fs-3 position-absolute wd-nudge-up"
                        onClick={handleSearch}
                    />
                </div>
            </div>
            <ul className="nav nav-pills mb-2 mt-2">
                <li className="nav-item">
                    <a className="nav-link active">For You</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Trending</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">News</a>
                </li>
            </ul>
            <div className="position-relative mb-2">
                <img src="/images/blahaj_space.jpg" className="w-100" />
                <h1 className="position-absolute wd-nudge-up text-white">
                    Blahaj Goes To Space!</h1>
            </div>
            <TuitSearch tuits={searchResults} />
        </>
    );
};
export default ExploreScreen;