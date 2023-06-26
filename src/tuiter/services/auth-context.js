import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "./auth-thunks";

function AuthContext({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const load = async () => {
            await dispatch(profileThunk());
            setLoading(false);
        };
        load();
    }, []);

    if (loading) {
        return (
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        );
    } else {
        return children;
    }
}

export default AuthContext;