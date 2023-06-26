import { Routes, Route } from "react-router";
import NavigationSidebar from "./navigation-sidebar";
import HomeScreen from "./home-screen";
import ExploreScreen from "./explore-screen";
import BookmarksScreen from "./bookmarks-screen";
import WhoToFollowList from "./who-to-follow-list";
import whoReducer from "./reducers/who-reducer";
import tuitsReducer from "./reducers/tuits-reducer";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import ProfileScreen from "./user/profile-screen";
import OtherProfileScreen from "./user/other-profile-screen";

import LoginScreen from "./user/login-screen";
import RegisterScreen from "./user/register-screen";
import authReducer from "./reducers/auth-reducer";
import AuthContext from "./services/auth-context";

const store = configureStore({
    reducer: {
        whoToFollowList: whoReducer,
        tuits: tuitsReducer,
        user: authReducer
    }
});

function Tuiter() {
    return (
        <Provider store={store}>
            <AuthContext>
                <div>
                    <div className="row">
                        <div class="col-2 col-lg-1 col-xl-2">
                            <NavigationSidebar />
                        </div>
                        <div class="col-10 col-lg-7 col-xl-6">
                            <Routes>
                                <Route path="/home" element={<HomeScreen />} />
                                <Route path="/explore" element={<ExploreScreen />} />
                                <Route path="/bookmarks" element={<BookmarksScreen />} />
                                <Route path="/profile" element={<ProfileScreen />} />
                                <Route path="/profile/:profileId" element={<OtherProfileScreen />} />
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/register" element={<RegisterScreen />} />
                            </Routes>
                        </div>
                        <div class="col-4 d-none d-lg-block">
                            <WhoToFollowList />
                        </div>
                    </div>
                </div>
            </AuthContext>
        </Provider>
    );
}
export default Tuiter;