import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import TuitSearch from "../tuits/tuit-search";

function DetailsScreen() {
    const routeParams = useParams();
    const navigate = useNavigate();
    const tuit_1 = {
        
        
            "_id": {
              "$oid": "6497fab4273a536ff1934bda"
            },
            "tuit": "Blahaj is shark",
            "username": "Blahaj",
            "handle": "@Blahaj",
            "image": "blahaj-face.jpg",
            "topic": "Generic",
            "time": "0m",
            "liked": false,
            "disliked": false,
            "likes": 0,
            "dislikes": 0,
            "replies": 0,
            "retuits": 0,
            "__v": 0
          
        }

    const tuit_2 = {
    
    
        
        "_id": {
            "$oid": "649a05bace89cf83159336a5"
        },
        "tuit": "Bear is big",
        "username": "Djungelskog",
        "handle": "@Djungelskog",
        "image": "big-bear.png",
        "topic": "Generic",
        "time": "0m",
        "liked": false,
        "disliked": false,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "retuits": 0,
        "__v": 0
        
    }



    const tuit_3 = {
        
        
        "_id": {
            "$oid": "649a0673ce89cf83159336a6"
        },
        "tuit": "Whale likes sea",
        "username": "Blavingad",
        "handle": "@Blavingad",
        "image": "blavingad.png",
        "topic": "Generic",
        "time": "0m",
        "liked": false,
        "disliked": false,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "retuits": 0,
        "__v": 0
      
    }

    const handleprofileShark = async () => {
        try {
          navigate("/tuiter/profile");
        } catch (error) {
          console.error(error);
        }
      }

    
    const handleprofileBear = async () => {
    try {
        navigate("/tuiter/profile");
    } catch (error) {
        console.error(error);
    }
    }
    
    const handleprofileWhale = async () => {
    try {
        navigate("/tuiter/profile");
    } catch (error) {
        console.error(error);
    }
    }
    
    return (
        <div>
    {routeParams.id == "Blahaj" && (
        <div>
        <ul className="list-group">
    <li className="list-group-item">
    <div  className="row">
        <div className="col-2">
            <img width={70} className="float-end rounded-3" src={`/images/${tuit_1.image}`}  />
        </div>
        <div className="col-10">
            
            <div className="row">
                <div><span className="fw-bolder">{tuit_1.userName}</span> <i className="fas fa-check-circle wd-blue"></i> {tuit_1.handle} • {tuit_1.time}</div>
                <div>{tuit_1.tuit}</div>
            </div>
            <br></br>
            
        </div>
    </div>
</li></ul>
<br></br>
<h2>     Replies :</h2>
<ul className="list-group">
<li className="list-group-item">
<div className="row">
    <div className="col-2">
        <img width={70} className="float-end rounded-3" src={`/images/big-bear.png`} onClick={() => handleprofileBear()}/>
    </div>
    <div className="col-10">
    <div><span className="fw-bolder">Djungelskog</span> <i className="fas fa-check-circle wd-blue"></i> @Djungelskog : Hi Blahaj. I am Djungelskog. Djungelskog is a big bear.</div>
        
    </div>
</div>
</li>
<li className="list-group-item">
<div className="row">
    <div className="col-2">
        <img width={70} className="float-end rounded-3" src={`/images/blavingad.png`} onClick={() => handleprofileWhale()}/>
    </div>
    <div className="col-10">
    <div><span className="fw-bolder">Blavingad</span> <i className="fas fa-check-circle wd-blue"></i> @Blavingad : Hi Blahaj. I am Blavingad. Blavingad is a big whale.</div>
        
    </div>
</div>
</li>
</ul>

</div>
        )}
    {routeParams.id == "Djungelskog" && (
            <div>
            <ul className="list-group">
        <li className="list-group-item">
        <div  className="row">
            <div className="col-2">
                <img width={70} className="float-end rounded-3" src={`/images/${tuit_2.image}`}  />
            </div>
            <div className="col-10">
                
                <div className="row">
                    <div><span className="fw-bolder">{tuit_2.userName}</span> <i className="fas fa-check-circle wd-blue"></i> {tuit_2.handle} • {tuit_2.time}</div>
                    <div>{tuit_2.tuit}</div>
                </div>
                <br></br>
                
            </div>
        </div>
    </li></ul>
    <br></br>
    <h2>     Replies :</h2>
    <ul className="list-group">
    <li className="list-group-item">
    <div className="row">

        <div className="col-2">
            <img width={70} className="float-end rounded-3" src={`/images/${tuit_1.image}`} onClick={() => handleprofileShark()}/>
        </div>
        <div className="col-10">
        <div><span className="fw-bolder">Blahaj</span> <i className="fas fa-check-circle wd-blue"></i> @Blahaj : Hi Djungelskog. I am Blahaj. Blahaj is a big shark.</div>
            
        </div>
    </div>
    </li>
    <li className="list-group-item">
    <div className="row">
        <div className="col-2">
            <img width={70} className="float-end rounded-3" src={`/images/blavingad.png`} onClick={() => handleprofileWhale()}/>
        </div>
        <div className="col-10">
        <div><span className="fw-bolder">Blavingad</span> <i className="fas fa-check-circle wd-blue"></i> @Blavingad : Hi Djungelskog. I am Blavingad. Blavingad is a big whale.</div>
            
        </div>
    </div>
    </li>
    </ul>
    </div>
    )}
    {routeParams.id == "Blavingad" && (
           <div>
           <ul className="list-group">
       <li className="list-group-item">
       <div  className="row">
           <div className="col-2">
               <img width={70} className="float-end rounded-3" src={`/images/${tuit_3.image}`} />
           </div>
           <div className="col-10">
               
               <div className="row">
                   <div><span className="fw-bolder">{tuit_3.userName}</span> <i className="fas fa-check-circle wd-blue"></i> {tuit_3.handle} • {tuit_3.time}</div>
                   <div>{tuit_3.tuit}</div>
               </div>
               <br></br>
               
           </div>
       </div>
   </li></ul>
   <br></br>
   <h2>     Replies :</h2>
   <ul className="list-group">
   <li className="list-group-item">
   <div className="row">

       <div className="col-2">
           <img width={70} className="float-end rounded-3" src={`/images/${tuit_1.image}`} onClick={() => handleprofileShark()}/>
       </div>
       <div className="col-10">
       <div><span className="fw-bolder">Blahaj</span> <i className="fas fa-check-circle wd-blue"></i> @Blahaj : Hi Blavingad. I am Blahaj. Blahaj is a big shark.</div>
           
       </div>
   </div>
   </li>
   <li className="list-group-item">
   <div className="row">
       <div className="col-2">
           <img width={70} className="float-end rounded-3" src={`/images/${tuit_2.image}`} onClick={() => handleprofileBear()}/>
       </div>
       <div className="col-10">
       <div><span className="fw-bolder">Djungelskog</span> <i className="fas fa-check-circle wd-blue"></i> @Djungelskog : Hi Blavingad. I am Djungelskog. Djungelskog is a big bear.</div>
           
       </div>
   </div>
   </li>
   </ul>
   </div>
    )}
    </div>


    
    )
    console.log(routeParams.id)
}
export default DetailsScreen;