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
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

function OtherProfileScreen() {
  const { profileId } = useParams();
  console.log("-------- profileId ")
  console.log(profileId)
  const [profile, setProfile] = useState({});
  const [myTuits, setMyTuits] = useState([]);
  const [myFollowing, setMyFollowing] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMyFollowing = async (followingIds) => {
      console.log("fetchMyFollowing====================")
      console.log(followingIds)
      try {
        let following = await Promise.all(followingIds.map(async followingId => {
          const following = await whoService.findUserById(followingId)
          // console.log(following)
          return following;
        }))
        console.log("myfollowing:")
        console.log(following)
        setMyFollowing(following);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchMyFollowers = async (followerIds) => {
      console.log("fetchMyFollowers====================")
      console.log(followerIds)
      try {
        let follower = await Promise.all(followerIds.map(async followerId => {
          const follower = await whoService.findUserById(followerId)
          // console.log(follower)
          return follower;
        }))
        console.log("myfollowers:")
        console.log(follower)
        setMyFollowers(follower);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchProfile = async () => {
      // console.log("fetchProfile-----------------")
      const profile = await whoService.findUserById(profileId)
      console.log("------------- profile in fetchProfile")
      console.log(profile)
      setProfile(profile)

      await fetchMyFollowing(profile.following);
      await fetchMyFollowers(profile.followers);
    };
    const fetchMyTuits = async () => {
      // console.log("fetchMyTuits====================")
      try {
        // console.log(profile)
        const tuits = await tuitsService.findOtherTuits(profileId);
        // console.log("profile myTuit:" + tuits)
        setMyTuits(tuits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
    fetchMyTuits();
  }, [profileId]);

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
  // console.log("--------- myFollowing -----------")
  // console.log(myFollowing)
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
                    value={profile.firstName} readOnly
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
                    value={profile.lastName ?? ""} readOnly
                    onChange={(event) => {
                      const newProfile = { ...profile, lastName: event.target.value };
                      setProfile(newProfile);
                    }}
                />
              </div>
              {!profileId &&<div>
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
              </div>}
              {!profileId && <div>
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
              </div>}
              {!profileId && <button onClick={handleUpdate} className="btn btn-primary">
                Update
              </button>}
            </div>
        )}
        <ul className="list-group mt-2">
          <li className="list-group-item">
            <h4>Following</h4>
            <div>{myFollowing.length ?? ""}</div>
          </li>
          <nav className="nav nav-tabs mb-2">

          {
            myFollowing.map((user) => (
                <li className="list-group-item" key={user._id}>
                  <Link className="nav-link" to={"/tuiter/profile/"+user._id}>{user.firstName} {user.lastName}</Link>
                </li>
            ))}
          </nav>
        </ul>

        <ul className="list-group mt-2">
          <li className="list-group-item">
            <h4>Followers</h4>
            <div>{myFollowers.length ?? ""}</div>
          </li>
          <nav className="nav nav-tabs mb-2">
            {
              myFollowers.map((user) => (
                  <li className="list-group-item" key={user._id}>
                    <Link className="nav-link" to={"/tuiter/profile/"+user._id}>{user.firstName} {user.lastName}</Link>
                  </li>
              ))}
          </nav>
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

export default OtherProfileScreen;
