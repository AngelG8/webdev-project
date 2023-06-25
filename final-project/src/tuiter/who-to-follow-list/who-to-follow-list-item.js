import React, {useState, useEffect} from "react";
import {updateUserThunk} from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";


const WhoToFollowListItem = ({whoToFollow}) => {
    const { currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [followed, setFollowed] = useState(false);

    console.log("------ whoToFollow currentUser ")
    console.log(profile)

    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser && currentUser.following && currentUser.following.includes(whoToFollow._id)) {
            setFollowed(true);
        }
    }, [currentUser, currentUser?.following, whoToFollow._id]);

    const handleFollow = async () => {
        let newFollowings
        if (typeof profile.following === 'undefined') {
            console.error("profile.following is undefined")
            // return; // Exit the function if following array is undefined
            newFollowings = [whoToFollow._id]
        } else {
            newFollowings = [...profile.following, whoToFollow._id]
        }
        console.log("------ newFollowings------ ")
        console.log(newFollowings)
        const newProfile = { ...profile, following: newFollowings};
        setProfile(newProfile);
        setFollowed(true);
        console.log("------ handleFollow newProfile ")
        console.log(newProfile)
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }
    };
    const handleUnFollow = async () => {
        if (typeof profile.following === 'undefined') {
            console.error("profile.follower is undefined")
            return; // Exit the function if following array is undefined
        }
        const newFollowing = profile.following.filter(followId => followId !== whoToFollow._id);
        // console.log("follower to unfollow ")
        // console.log(whoToFollow)
        // console.log(profile.following)
        const newProfile = { ...profile, following: newFollowing};
        // console.log(newProfile)
        setProfile(newProfile);
        setFollowed(false);
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }
    };

    if (currentUser && whoToFollow._id === currentUser._id) {
            return null;
        }


    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" height={48} src={`/images/${whoToFollow.avatarIcon}`} />
                </div>
                <div className="col-8">
                    <div className="fw-bold">{whoToFollow.firstName} {whoToFollow.lastName}</div>
                </div>
                {!followed && <div className="col-2">
                    <button onClick={handleFollow}
                            className="btn btn-primary rounded-pill float-end">Follow
                    </button>
                </div>
                }
                {followed && <div className="col-2">
                    <button onClick={handleUnFollow}
                            className="btn btn-primary rounded-pill float-end">unFollow
                    </button>
                </div>
                }
            </div>
        </li>
    );
};
export default WhoToFollowListItem;