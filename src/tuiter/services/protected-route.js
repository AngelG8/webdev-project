import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk } from "./auth-thunks";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const load = async () => {
            const { payload } = await dispatch(profileThunk());
            if (!payload) {
                navigate("/tuiter/login");
            }
            setLoading(false);
        };
        load();
    }, []);
    return (<div className={`${loading ? "d-none" : ""}`}>
        {children}
    </div>);
}
export default ProtectedRoute;