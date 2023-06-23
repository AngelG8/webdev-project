// 3.1 Re-implement the WhoToFollowList component to use Redux
import React from "react";
// import whoArray from './who.json';           // we moved the data into the reducer instead
import {useSelector} from "react-redux";        // import hook to retrieve state from reducer
import WhoToFollowListItem from "./who-to-follow-list-item";

const WhoToFollowList = () => {
    const whoArray = useSelector((state) => state.who);     // retrieve state from the store
    return(
        <ul className="list-group">
            <li className="list-group-item">
                <h3>Who to follow</h3>
            </li> 
            {
                // <p>Test</p>
                whoArray.map(who => 
                    <WhoToFollowListItem
                        key={who._id}
                        who={who}/>
                )
            }
        </ul>
    );
};
export default WhoToFollowList;