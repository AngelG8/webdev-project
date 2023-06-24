import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/auth-thunks";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
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
            try {
                const { payload } = await dispatch(profileThunk());
                console.log(payload)
                setProfile(payload);
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        navigate("../login");
    };

    return (
        <div>
            <h1>Profile Screen</h1>
            {profile && (
                <div>
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
                    <button className="btn btn-primary mt-2 btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="btn btn-primary mt-2" onClick={save}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileScreen;
