import React, {useEffect} from "react";
import WhoToFollowListItem from "./who-to-follow-list-item";
import {useDispatch, useSelector} from "react-redux";
import {findWhoToFollowListThunk} from "../services/who-thunks";

const WhoToFollowList = () => {
  const { whoToFollowList, loading } = useSelector(state => state.whoToFollowList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findWhoToFollowListThunk())
  }, [dispatch])
  return (
        <ul className="list-group">
            <li className="list-group-item">
                <h3>Who to follow</h3>
            </li>
            {loading &&
                <li className="list-group-item">
                  Loading...
                </li>
            }
            {
              whoToFollowList.map(whoToFollow =>
                    <WhoToFollowListItem
                        key={whoToFollow._id}
                        whoToFollow={whoToFollow} />
                )
            }
        </ul>
    );
};
export default WhoToFollowList;