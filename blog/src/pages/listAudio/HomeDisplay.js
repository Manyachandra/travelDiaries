

import { Add, PlayArrow, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined } from '@material-ui/icons'

import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from 'react-router-dom'
import "./home.css"

export const HomeDisplay = ({ index, url, img, desc, title, date, city, username }) => {
    const [isHover, setisHoverd] = useState(true);
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);

    const PF = "http://localhost:5000/images/"


    return (
        <Link className='link' to={{
            pathname: `/player?${url}~${img}~${title}`,
            query: {
                url
            }
        }}>
            <div className="listItem" style={{ left: isHover && index * 380 - 50 }}
                onMouseEnter={() => setisHoverd(true)} onMouseLeave={() => setisHoverd(true)}
            >

                <img src={img}></img>
                {isHover && (
                    <div className="ishover">

                        {/* <ReactPlayer className="video" url={url} playing={true} mute="muted"
                        loop
                        object-fit="contain"


                    /> */}


                        <div className="iteminfo">

                            <div className="Aicons">
                                <PlayArrow className="Aicon"></PlayArrow>
                                <Add className="Aicon" />
                                <ThumbUpAltOutlined className="Aicon" />
                                <ThumbDownAltOutlined className="Aicon" />

                            </div>
                            <div className="titleline">
                                <div className="Atittle">{title}</div>

                                <div className="username"><i className="fa-solid fa-user S-icons"></i>  {username}</div>
                            </div>
                            <div className="listiteminfo">

                                <span>1 hr 14 min</span>
                                <span className="limit">Certified +</span>
                                <span>{new Date(date).toDateString()}</span>
                            </div>
                            <div className="desc">
                                {desc}


                            </div>
                            <div className="genre">{city}</div>

                        </div>

                    </div>
                )}


            </div>
        </Link>
    )
}




export default HomeDisplay
