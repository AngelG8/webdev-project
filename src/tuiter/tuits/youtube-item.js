import React from "react"
import "./tuit-item.css";

const YoutubeItem = (
    {
        youtube = {
            "kind": "youtube#searchResult",
            "etag": "wXKJlzVo9fldfBvEoXQr1bfPlNc",
            "id": {
                "kind": "youtube#video",
                "videoId": "JStAYvbeSHc"
            },
            "snippet": {
                "publishedAt": "2023-06-21T14:44:34Z",
                "channelId": "UCGIY_O-8vW4rfX98KlMkvRg",
                "title": "Super Mario Bros. Wonder - Nintendo Direct 6.21.2023",
                "description": "Super Mario Bros. Wonder is releasing for Nintendo Switch on October 20, 2023. Pre-order today: ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/JStAYvbeSHc/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/JStAYvbeSHc/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/JStAYvbeSHc/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Nintendo of America",
                "liveBroadcastContent": "none",
                "publishTime": "2023-06-21T14:44:34Z"
            }
        },
    }

) => {
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-4">
                    <a href={`https://www.youtube.com/watch?v=${youtube.id.videoId}`} target="_blank" rel="noopener noreferrer">
                        <img className="float-end rounded-3 img-fluid" src={youtube.snippet.thumbnails.high.url} />
                    </a>
                </div>
                <div className="col-8">
                    <div className="row">
                        <a href={`https://www.youtube.com/watch?v=${youtube.id.videoId}`} target="_blank" rel="noopener noreferrer">
                            <div><span className="fw-bolder">{youtube.snippet.title}</span></div>
                        </a>
                        <div>{youtube.snippet.description}</div>
                    </div>
                    <br></br>
                </div>
            </div>
        </li>
    );
};
export default YoutubeItem;