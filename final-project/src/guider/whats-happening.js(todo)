import React, {useState} from "react";
import {useDispatch} from "react-redux";
// import {createTuit} from "./reducers/tuits-reducer";
import {createTuitThunk} from "./services/tuits-thunks";    // wont be using the reducer function anymore we'll be using the createTuitThunk instead
import { AiOutlinePicture } from "react-icons/ai"
import { HiOutlineGif } from "react-icons/hi2"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdFormatListBulleted } from "react-icons/md"
import { BsEmojiSmile } from "react-icons/bs"
import { TbCalendarStats } from "react-icons/tb"
import { BiBold, BiItalic } from "react-icons/bi"

const WhatsHappening = () => {
    let [whatsHappening, setWhatsHappening] = useState('');
    const dispatch = useDispatch();
    const tuitClickHandler = () => {
        const newTuit = {
            tuit: whatsHappening
        }
        // dispatch(createTuit(newTuit));
        dispatch(createTuitThunk(newTuit));             // use thunk instead of reducer function
        setWhatsHappening("");

        // console.log(whatsHappening);
    }
    return (
        <div className="row">
            <div className="col-auto">
                <img src="/images/NASA.png" width={60}/>
            </div>
            
            <div className="col-10">
                <textarea value={whatsHappening} 
                    placeholder="What's happening?"
                    className="form-control border-0"
                    onChange={(event) => setWhatsHappening(event.target.value)}>
                </textarea>
                <div>
                
                    <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                            onClick={tuitClickHandler}>
                            Tuit
                    </button>
                    <div className="text-primary fs-2">
                        <AiOutlinePicture className="me-3" />
                        <HiOutlineGif className="me-3" />
                        <MdFormatListBulleted className="me-3" />
                        <BsEmojiSmile className="me-3" />
                        <TbCalendarStats className="me-3" />
                        <HiOutlineLocationMarker className="me-3" />
                        <BiBold className="me-3" />
                        <BiItalic className="me-3" />
                        {/* <i className="bi bi-card-image me-3"></i>
                        <i className="bi bi-filetype-gif me-3"></i>
                        <i className="bi bi-bar-chart me-3"></i>
                        <i className="bi bi-emoji-smile me-3"></i>
                        <i className="bi bi-geo-alt me-3"></i>  */}
                        {/* 这边需要吗 */}
                    </div>
                </div>
            </div>

            <div className="col-12"><hr/></div>
        </div>
    );
}
export default WhatsHappening;