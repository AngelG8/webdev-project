import React, {useEffect} from "react";
import WhoToFollowListItem from "./who-to-follow-list-item";
import {useDispatch, useSelector} from "react-redux";
import {findWhoThunk} from "../services/who-thunks";

const WhoToFollowList = () => {
  const { who, loading } = useSelector(state => state.who);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findWhoThunk())
  }, [])
  console.log(who)
  // var loading = true
  // var whoArray = []
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
                who.map(who =>
                    <WhoToFollowListItem
                        key={who._id}
                        who={who} />
                )
            }
        </ul>
    );
};
export default WhoToFollowList;