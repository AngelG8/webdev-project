import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/auth-thunks";
import * as tuitsService from "../services/tuits-service";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [myTuits, setMyTuits] = useState([]);
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
            console.log("fetchMyTuits====================")
            try {
                const tuits = await tuitsService.findMyTuits();
                console.log("profile myTuit:" + tuits)
                setMyTuits(tuits);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
        fetchMyTuits();
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
            <pre>{JSON.stringify(myTuits, null, 2)}</pre>
        </div>
    );
}

export default ProfileScreen;
