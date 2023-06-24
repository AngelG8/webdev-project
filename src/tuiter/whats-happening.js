import React, { useState } from "react";
import { AiOutlinePicture, AiOutlineGif } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdFormatListBulleted } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { BiBold, BiItalic } from "react-icons/bi";
import { TbCalendarStats } from "react-icons/tb";

import { createTuitThunk } from "./services/tuits-thunks";
import { useDispatch } from "react-redux";
import { templateTuit } from "./templates/template-tuit"

const WhatsHappening = () => {
    let [whatsHappening, setWhatsHappening] = useState('');
    const dispatch = useDispatch();
    const tuitClickHandler = () => {
        const newTuit = {
            ...templateTuit,
            tuit: whatsHappening
        }
        dispatch(createTuitThunk(newTuit));
        setWhatsHappening("");
        console.log(whatsHappening);
    }
    return (
        <div className="row">
            <div className="col-auto">
                <img className="rounded-circle" src="/images/blahaj-face.jpg" width={64} />
            </div>
            <div className="col-10">
                <textarea value={whatsHappening} placeholder="What's poppin?"
                    className="form-control border-0"
                    onChange={(event) => setWhatsHappening(event.target.value)}>
                </textarea>
                <br />
                <div>
                    <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                        onClick={tuitClickHandler}>
                        Tuit
                    </button>
                    <div className="text-primary fs-2">
                        <AiOutlinePicture className="me-3" />
                        <AiOutlineGif className="me-3" />
                        <MdFormatListBulleted className="me-3" />
                        <BsEmojiSmile className="me-3" />
                        <TbCalendarStats className="me-3" />
                        <HiOutlineLocationMarker className="me-3" />
                        <BiBold className="me-3" />
                        <BiItalic className="me-3" />
                    </div>
                </div>
            </div>
            <div className="col-12"><hr /></div>
        </div>
    );
}
export default WhatsHappening;