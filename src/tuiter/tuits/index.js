import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TuitItem from "./tuit-item";
import YoutubeItem from "./youtube-item";
import { findTuitsThunk } from "../services/tuits-thunks";

const TuitList = () => {
    const { tuits, loading, searchResults, youtubeSearchResults } = useSelector((state) => state.tuits);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findTuitsThunk());
    }, []);

    let displayedTuits = tuits;

    return (
        <ul className="list-group">
            {loading && <li className="list-group-item">Loading...</li>}
            {displayedTuits.map((tuit) => (
                <TuitItem key={tuit._id} tuit={tuit} />
            ))}
        </ul>
    );
};

export default TuitList;