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
    const [myFollowing, setMyFollowing] = useState([]);

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
            console.log("fetchProfile-----------------")
            try {
                const { payload } = await dispatch(profileThunk());
                console.log(payload)
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
        const fetchMyFollowing = async () => {
            console.log("fetchMyFollowing====================")
            try {
                let followingIds = !profile.following ? [] : profile.following;
                let following = await Promise.all(followingIds.map(async followingId => {
                    const following = await whoService.findUserById(followingId)
                    console.log(following)
                    return following;
                }))
                console.log("myfollowing:")
                console.log(following)
                setMyFollowing(following);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
        fetchMyTuits();
        fetchMyFollowing();
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
    console.log("--------- myFollowing -----------")
    console.log(myFollowing)
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
            <ul className="list-group mt-2">
                <li className="list-group-item">
                    <h4>Following</h4>
                    <div>{myFollowing.length ?? ""}</div>
                </li>
                {
                    myFollowing.map((user) => (
                    <li className="list-group-item" key={user._id}>
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>

            {/*<pre>{JSON.stringify(myTuits, null, 2)}</pre>*/}
            <ul className="list-group mt-2">
                <li className="list-group-item">
                    <h4>My Tuits</h4>
                </li>
                {myTuits.map((tuit) => (
                    <li className="list-group-item">
                        <div><span className="fw-bolder">{tuit.topic}</span> <i className="fas fa-check-circle wd-blue"></i> {tuit.handle} • {tuit.time}</div>
                        <div>{tuit.tuit}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileScreen;
