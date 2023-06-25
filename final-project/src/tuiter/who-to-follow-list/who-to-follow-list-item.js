import React, {useState} from "react";
import {updateUserThunk} from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";

const WhoToFollowListItem = ({who}) => {
    const { currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);

    console.log("------ who currentUser ")
    console.log(profile)

    const dispatch = useDispatch();

    const handleFollow = async () => {
        const newFollowers = [...profile.followers, who._id]
        console.log("follower to add ")
        console.log(who)
        const newProfile = { ...profile, followers: newFollowers};
        setProfile(newProfile);
        console.log("------ handleFollow newProfile ")
        console.log(newProfile)
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" height={48} src={`/images/${who.avatarIcon}`} />
                </div>
                <div className="col-8">
                    <div className="fw-bold">{who.username}</div>
                    <div>@{who.handle}</div>
                </div>
                <div className="col-2">
                    <button onClick={handleFollow} className="btn btn-primary rounded-pill float-end">Follow</button>
                </div>
            </div>
        </li>
    );
};
export default WhoToFollowListItem;