import React from "react";
const TuitSummaryItem = (
    {
        tuit = {
            "topic": "Web Development",
            "userName": "ReactJS",
            "time": "2h",
            "title": `React.js is a component based front end library that makes 
            it very easy to build Single Page Applications or SPAs`,
            "image": "react-logo.png"
        }
    }
) => {
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-10">
                    <div>{tuit.userName} . {tuit.time}</div>
                    <div className="fw-bolder">{tuit.topic}</div>
                    <div>{tuit.title}</div>
                </div>
                <div className="col-2">
                    <img width={70} className="float-end rounded-3" src={`./images/${tuit.image}`} />
                </div>
            </div>
        </li>
    );
};
export default TuitSummaryItem;