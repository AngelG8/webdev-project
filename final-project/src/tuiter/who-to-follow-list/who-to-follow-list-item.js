import React, {useState, useEffect} from "react";
import {updateUserThunk} from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";


const WhoToFollowListItem = ({who}) => {
    const { currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [followed, setFollowed] = useState(false);

    // console.log("------ who currentUser ")
    // console.log(profile)

    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser && currentUser.followers && currentUser.followers.includes(who._id)) {
            setFollowed(true);
        }
    }, [currentUser, currentUser?.followers, who._id]);

    const handleFollow = async () => {
        if (!profile.followers) {
            console.error("profile.follower is null")
            return; // Exit the function if followers array is undefined
        }
        const newFollowers = [...profile.followers, who._id]
        // console.log("follower to add ")
        // console.log(who)
        const newProfile = { ...profile, followers: newFollowers};
        setProfile(newProfile);
        setFollowed(true);
        // console.log("------ handleFollow newProfile ")
        // console.log(newProfile)
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }
    };
    const handleUnFollow = async () => {
        if (!profile.followers) {
            console.error("profile.follower is null")
            return; // Exit the function if followers array is undefined
        }
        const newFollowers = profile.followers.filter(followId => followId !== who._id);
        // console.log("follower to unfollow ")
        // console.log(who)
        // console.log(profile.followers)
        const newProfile = { ...profile, followers: newFollowers};
        // console.log(newProfile)
        setProfile(newProfile);
        setFollowed(false);
        try {
            await dispatch(updateUserThunk(newProfile));
        } catch (error) {
            console.error(error);
        }
    };

    if (currentUser && who._id === currentUser._id) {
            return null;
        }


    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" height={48} src={`/images/${who.avatarIcon}`} />
                </div>
                <div className="col-8">
                    <div className="fw-bold">{who.firstName} {who.lastName}</div>
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