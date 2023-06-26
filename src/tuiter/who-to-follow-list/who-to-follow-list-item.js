import React, {useState, useEffect} from "react";
import {updateUserThunk, updateUserByIdThunk} from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";
import * as authService from "../services/auth-service";
import {Link} from "react-router-dom";

const WhoToFollowListItem = ({whoToFollow}) => {
    const { currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [followed, setFollowed] = useState(false);

    console.log("------ whoToFollow currentUser ")
    console.log(profile)
    console.log("------ whoToFollow whoToFollow ")
    console.log(whoToFollow)

    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser && currentUser.following && currentUser.following.includes(whoToFollow._id)) {
            setFollowed(true);
        }
    }, [whoToFollow._id]);

    const addToFollowers = (userId, profileToEdit) => {
        let newFollowers;
        if (typeof profileToEdit.follwers === 'undefined') {
            console.error("profileToEdit.follwers is undefined")
            // return; // Exit the function if following array is undefined
            newFollowers = [userId]
        } else {
            newFollowers = [...profileToEdit.followers, userId]
        }
        console.log("------ newFollowers------ ")
        console.log(newFollowers)
        return { ...profileToEdit, followers: newFollowers};
    }

    const removeFollowers = (userId, profileToEdit) => {
        let newFollowers;
        if (typeof profileToEdit.follwers === 'undefined') {
            console.error("profileToEdit.follwers is undefined")
            // return; // Exit the function if following array is undefined
            newFollowers = []
        } else {
            newFollowers = profileToEdit.followers.filter(item => item !== userId);
        }
        console.log("------ newFollowers------ ")
        console.log(newFollowers)
        return { ...profileToEdit, followers: newFollowers};
    }

    const addToFollowing = (userId, profileToEdit) => {
        let newFollowings;
        if (typeof profileToEdit.following === 'undefined') {
            console.error("profileToEdit.following is undefined")
            // return; // Exit the function if following array is undefined
            newFollowings = [userId];
        } else {
            newFollowings = [...profileToEdit.following, userId];
        }
        console.log("------ newFollowings------ ")
        console.log(newFollowings)
        return { ...profileToEdit, following: newFollowings};
    }

    const removeFollowing = (userId, profileToEdit) => {
        let newFollowings;
        if (typeof profileToEdit.following === 'undefined') {
            console.error("profileToEdit.following is undefined")
            // return; // Exit the function if following array is undefined
            newFollowings = []
        } else {
            newFollowings = profileToEdit.following.filter(item => item !== userId);
        }
        console.log("------ newFollowings------ ")
        console.log(newFollowings)
        return { ...profileToEdit, following: newFollowings};
    }

    const handleFollow = async () => {
        const newProfile = addToFollowing(whoToFollow._id, profile)
        setProfile(newProfile);
        setFollowed(true);
        console.log("------ handleFollow newProfile ")
        console.log(newProfile)
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }

        // Modify follwers for the user being followed
        const newWhoProfile = addToFollowers(currentUser._id, whoToFollow)
        // setProfile(newProfile);
        // setFollowed(true);
        console.log("------ handleFollow newWhoProfile ")
        console.log(newWhoProfile)
        try {
            console.log("------ whoToFollow._id  ")
            console.log(whoToFollow._id)
            // await updateUserByIdThunk({ user: newWhoProfile, uid: whoToFollow._id });
            await authService.updateUserById(newWhoProfile);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnFollow = async () => {
        const newProfile = removeFollowing(whoToFollow._id, profile)
        setProfile(newProfile);
        setFollowed(false);
        console.log("------ handleUnFollow newProfile ")
        console.log(newProfile)
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }

        // Modify follwers for the user being followed
        const newWhoProfile = removeFollowers(currentUser._id, whoToFollow)
        // setProfile(newProfile);
        // setFollowed(true);
        console.log("------ handleFollow newWhoProfile ")
        console.log(newWhoProfile)
        try {
            console.log("------ whoToFollow._id  ")
            console.log(whoToFollow._id)
            // await updateUserByIdThunk({ user: newWhoProfile, uid: whoToFollow._id });
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
                <div className="col-2">
                    <img className="rounded-circle" height={48} src={`/images/${whoToFollow.avatarIcon}`} />
                </div>
                <div className="col-8">
                    <nav className="nav nav-tabs mb-2">
                    <Link className="nav-link" to={"/tuiter/profile/"+whoToFollow._id}>{whoToFollow.firstName} {whoToFollow.lastName}</Link>
                    </nav>
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