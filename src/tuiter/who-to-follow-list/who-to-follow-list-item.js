import React, {useState, useEffect} from "react";
import {updateUserThunk, updateUserByIdThunk} from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";
import * as authService from "../services/auth-service";
import {Link} from "react-router-dom";

const WhoToFollowListItem = ({whoToFollow}) => {
    const { currentUser} = useSelector((state) => state.user);
    // const [profile, setProfile] = useState(currentUser);
    // const [followed, setFollowed] = useState(false);

    let isFollowed = false;
    let myProfile = currentUser;
    if (currentUser && currentUser.following && currentUser.following.includes(whoToFollow._id)) {
        isFollowed = true;
    }
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (currentUser && currentUser.following && currentUser.following.includes(whoToFollow._id)) {
    //         setFollowed(true);
    //     }
    // }, [whoToFollow._id]);

    const addToFollowers = (userId, profileToEdit) => {
        let newFollowers;
        if (typeof profileToEdit.follwers === 'undefined') {
            console.error("profileToEdit.follwers is undefined")
            newFollowers = [userId]
        } else {
            newFollowers = [...profileToEdit.followers, userId]
        }
        return { ...profileToEdit, followers: newFollowers};
    }

    const removeFollowers = (userId, profileToEdit) => {
        let newFollowers;
        if (typeof profileToEdit.follwers === 'undefined') {
            console.error("profileToEdit.follwers is undefined")
            newFollowers = []
        } else {
            newFollowers = profileToEdit.followers.filter(item => item !== userId);
        }
        return { ...profileToEdit, followers: newFollowers};
    }

    const addToFollowing = (userId, profileToEdit) => {
        let newFollowings;
        if (typeof profileToEdit.following === 'undefined') {
            console.error("profileToEdit.following is undefined")
            newFollowings = [userId];
        } else {
            newFollowings = [...profileToEdit.following, userId];
        }
        return { ...profileToEdit, following: newFollowings};
    }

    const removeFollowing = (userId, profileToEdit) => {
        let newFollowings;
        if (typeof profileToEdit.following === 'undefined') {
            console.error("profileToEdit.following is undefined")
            newFollowings = []
        } else {
            newFollowings = profileToEdit.following.filter(item => item !== userId);
        }
        return { ...profileToEdit, following: newFollowings};
    }

    const handleFollow = async () => {
        const newProfile = addToFollowing(whoToFollow._id, myProfile)
        // setProfile(newProfile);
        // setFollowed(true);
        // myProfile = newProfile;
        // isFollowed = true;
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }

        // Modify follwers for the user being followed
        const newWhoProfile = addToFollowers(currentUser._id, whoToFollow)
        try {
            await authService.updateUserById(newWhoProfile);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnFollow = async () => {
        const newProfile = removeFollowing(whoToFollow._id, myProfile)
        // setProfile(newProfile);
        // myProfile = newProfile;
        // setFollowed(false);
        // isFollowed = false;
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }

        // Modify follwers for the user being followed
        const newWhoProfile = removeFollowers(currentUser._id, whoToFollow)
        try {
            await authService.updateUserById(newWhoProfile);
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
                <div className="col-9">
                    <Link className="nav-link" to={"/tuiter/profile/"+whoToFollow._id}
                          style={{ textDecoration: 'underline'}}>
                        <i className="fa-solid fa-heart"></i>   {whoToFollow.firstName} {whoToFollow.lastName}</Link>

                </div>
                {!isFollowed && <div className="col-3">
                    <button onClick={handleFollow}
                            className="btn btn-primary rounded-pill float-end" disabled={!currentUser}>Follow
                    </button>
                </div>
                }
                {isFollowed && <div className="col-3">
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