import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {
    logoutThunk,
    profileThunk,
    updateUserThunk
} from "../services/auth-thunks";
import * as tuitsService from "../services/tuits-service";
import * as whoService from "../services/who-service";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [myTuits, setMyTuits] = useState([]);
    const [myFollowers, setMyFollowers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = async () => {
        try {
            await dispatch(updateUserThunk(profile));
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            // console.log("fetchProfile-----------------")
            try {
                const { payload } = await dispatch(profileThunk());
                // console.log(payload)
                setProfile(payload);
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };
        const fetchMyTuits = async () => {
            // console.log("fetchMyTuits====================")
            try {
                const tuits = await tuitsService.findMyTuits();
                // console.log("profile myTuit:" + tuits)
                setMyTuits(tuits);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchMyFollowers = async () => {
            console.log("fetchMyFollowers====================")
            try {
                let followerIds = !profile.followers ? [] : profile.followers;
                let followers = await Promise.all(followerIds.map(async followerId => {
                    const follower = await whoService.findUserById(followerId)
                    console.log(follower)
                    return follower;
                }))
                console.log("myFollowers:" + followers)
                setMyFollowers(followers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
        fetchMyTuits();
        fetchMyFollowers();
    }, []);

    const handleLogout = async () => {

        await dispatch(logoutThunk());
        navigate("../login");
    };
    const handleUpdate = async () => {
        try {
            await dispatch(updateUserThunk(profile));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Profile Screen</h1>
            {profile && (
                <div>
                    <div>
                        <label>Username</label>
                        <input
                            className="form-control"
                            type="text"
                            value={profile.username} readOnly
                        />
                    </div>
                    <div>
                        <label>First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={profile.firstName}
                            onChange={(event) => {
                                const newProfile = { ...profile, firstName: event.target.value };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={profile.lastName ?? ""}
                            onChange={(event) => {
                                const newProfile = { ...profile, lastName: event.target.value };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            value={profile.email ?? ""}
                            onChange={(event) => {
                                const newProfile = { ...profile, email: event.target.value };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="text"
                            value={profile.phone ?? ""}
                            onChange={(event) => {
                                const newProfile = { ...profile, phone: event.target.value };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <button onClick={handleUpdate} className="btn btn-primary">
                        Update
                    </button>
                </div>
            )}
            <button className="btn btn-primary mt-2 btn-danger" onClick={handleLogout}>
                Logout
            </button>
            <button className="btn btn-primary mt-2" onClick={save}>
                Save
            </button>
            <ul className="list-group">
                <input
                    className="form-control"
                    type="text"
                    value={profile.followers.length ?? ""}
                />
                {myFollowers.map((user) => (
                    <li className="list-group-item" key={user._id}>
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
            <label>My Tuits</label>
            <pre>{JSON.stringify(myTuits, null, 2)}</pre>
        </div>
    );
}

export default ProfileScreen;
