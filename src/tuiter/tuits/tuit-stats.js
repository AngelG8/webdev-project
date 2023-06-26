import React from "react"
import { updateTuitThunk } from "../services/tuits-thunks";
import { useDispatch, useSelector } from "react-redux";
import "./tuit-item.css";
import { useNavigate } from "react-router";

const TuitStats = (
    { tuit }
) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const heartIcon = tuit.liked ? "fas fa-heart liked" : "fas fa-heart";
    const thumbsDownIcon = tuit.disliked ? "fas fa-thumbs-down disliked" : "fas fa-thumbs-down";

       const handleprofileBear = async (id) => {
    try {
        navigate(`/tuiter/details/${id}`);
    } catch (error) {
        console.error(error);
    }
    }

    return (
        <div className="row">
            <div className="col-2">
                <div onClick={() => handleprofileBear(tuit.username)}><i className="fas fa-comment"></i> {tuit.replies}</div>
            </div>
            <div className="col-2">
                <div><i className="fas fa-retweet"></i> {tuit.retuits}</div>
            </div>
            <div className="col-2">
                <div><i className={heartIcon} onClick={() => {
                    dispatch(updateTuitThunk({ ...tuit, "liked": true, "likes": tuit.likes + 1 }))
                }}></i> {tuit.likes}</div>
            </div>
            <div className="col-2">
                <div><i className={thumbsDownIcon} onClick={() => {
                    dispatch(updateTuitThunk({ ...tuit, "disliked": true, "dislikes": tuit.dislikes + 1 }))
                }}></i> {tuit.dislikes}</div>
            </div>
            <div className="col-2">
                <div><i className="fas fa-upload"></i></div>
            </div>

        </div>
    );
};
export default TuitStats;