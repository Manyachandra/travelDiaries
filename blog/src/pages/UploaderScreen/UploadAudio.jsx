import React, { useState, useContext, } from "react";
import { storage } from "../../firebase/index";
import ReactPlayer from 'react-player'
import "./upload.css"
import "./uploaderScreen.css"
import axios from "axios"
import { Link } from "react-router-dom";
import Type from "../../Video/Type";
import Test from "../../Video/test";
import cities from "../../Video/cities";
import { Context } from "../../context/Context";
const UploadAudio = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [video, setVideos] = useState(null);
    const [image, setImages] = useState(null);
    const { user } = useContext(Context);
    const [city, setCity] = useState("");
    const [category, setCategory] = useState([]);
    const [vidupload, setVideosUpload] = useState(false)
    const [viddelete, setVideosDelete] = useState(false)
    const [imgupload, setImagesUpload] = useState(false)
    const [imgdelete, setImagesDelete] = useState(false)
    const [imgchange, setimgChange] = useState(false)
    const [vidchange, setvidChange] = useState(false)
    const [Imgurl, setImgUrl] = useState("");
    const [Vidurl, setVidUrl] = useState("");
    const [imgprogress, setimgProgress] = useState(0);
    const [vidprogress, setvidProgress] = useState(0);
    // var Url = "https://firebasestorage.googleapis.com/v0/b/game-24c03.appspot.com/o/images%2FReveal%20your%20logo%20with%20HORROR%20Lamp%20Bloody%20wall%20Halloween%20video%20intro.mp4?alt=media&token=7ed98970-8e7f-467f-866b-53b55c988bf4"
    if (video)
        var VideoRef = storage.ref(`videos/${video.name}`);
    else
        var VideoRef = storage.ref("videos/");
    if (image)
        var ImageRef = storage.ref(`images/${image.name}`);
    else
        var ImageRef = storage.ref("images/");

    const videoDeleteUpload = () => {
        VideoRef.delete().then(() => {
            setVideosDelete(true)
        }).catch((error) => {
            console.log(error);

            alert("Video cant be delete!!! Please try again after sometime")
        });
    }
    const imageDeleteUpload = () => {
        ImageRef.delete().then(() => {
            setImagesDelete(true)
        }).catch((error) => {
            alert("Video cant be delete!!! Please try again after sometime")
        });
    }
    const handleVideoChange = e => {
        if (e.target.files[0]) {
            setVideos(e.target.files[0]);
            setVideosUpload(true)
        }
    };
    const handleImageChange = e => {
        if (e.target.files[0]) {
            setImages(e.target.files[0]);
            if (vidupload)
                setImagesUpload(true)
            else
                alert("Please upload a video first")
        }
    };

    const Imgsave = async (url) => {
        try {
            console.log("called")
            handleCallback()
            var s = city;
            const res = await axios.post(
                "http://localhost:5000/api/audio",
                {

                    Poster: url,
                    audio: Vidurl,
                    city,
                    username: user.username,
                    categories: category.flat(Infinity),
                    title: title,
                    desc: desc
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(res) //check now
        } catch (e) {
            console.log(e)

        }
    }
    const handleVideoUpload = async () => {
        if (video === null) alert("Please Upload a Video")
        else {
            const uploadTask = storage.ref(`audios/${video.name}`).put(video);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const vidprogress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setvidProgress(vidprogress);
                },
                error => {
                    console.log(error);
                },
                async () => {
                    storage
                        .ref("audios")
                        .child(video.name)
                        .getDownloadURL()
                        .then(url => {
                            setVidUrl(url);

                            console.log(Vidurl);

                        });
                    // console.log("Url is" + URL.createObjectURL(video))
                    ///





                }

            );
            setvidChange(true)
            // console.log("This the url" + Vidurl)


        }
    };
    const handleImageUpload = () => {
        if (image === null) alert("Please Upload a Video")
        else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const imgprogress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setimgProgress(imgprogress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {

                            Imgsave(url)
                        });
                }
            );
            setimgChange(true)
        }
    };
    const handleCallback = (childData) => {
        setCity(childData)
        console.log("hii" + city)
    }
    const handleTestCallback = (childData) => {
        console.log(childData);

        setCategory(childData)

        console.log(category)
    }

    return (
        <div className="S-parent">
            <div className="main-tag">
                <Test parentTestCallback={handleTestCallback} />
                <Type iteams={cities} parentCallback={handleCallback} />
            </div>

            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
            <div className="S-uploader">

                <div className="S-upload">

                    {vidupload ? <div className="S-react-player">
                        <div>PREVIEW</div>
                        <div className="S-preview">
                            <ReactPlayer url={URL.createObjectURL(video)} controls={true} width="60%" />
                            <div className="S-inputs">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="S-writeInput1"
                                    autoFocus={true}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <textarea
                                    placeholder="Tell your story..."
                                    type="text"
                                    className="S-writeInput2 S-writeText"
                                    onChange={e => setDesc(e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                    </div> : <div>Upload   your Podcast</div>}
                    <div className="video-upload">

                        {vidchange && vidprogress !== 100 ? <div className="S-progress">
                            <progress className="S-progress-bar" value={vidprogress} max="100" /><span>{vidprogress}%</span>
                        </div> : ""}
                        <div className="S-video">Video Upload</div>
                        <input type="file" onChange={handleVideoChange} accept="audio/*" />

                        <button className={vidprogress === 100 ? "btn btn-success S-button" : "btn btn-dark S-btn"} onClick={handleVideoUpload}>{vidprogress !== 100 ? <div><span><i class="fad fa-play-circle  S-icon"></i></span><span>Upload</span></div> : <div><span><i class="fad fa-check-circle S-icon"></i></span><span>Uploaded</span></div>}</button>
                        {vidprogress === 100 ? <button onClick={videoDeleteUpload} className="btn btn-danger">{!viddelete ? <div><span><i class="fad fa-times-circle S-icon"></i></span><span>Delete</span></div> : <span>Deleted</span>}</button> : ""}

                    </div>

                    {vidupload ? imgupload ? <div className="S-react-player"><div>PREVIEW</div><img src={URL.createObjectURL(image)} alt="" width="40%" height="20%" /></div> : <div>Upload a Thumbnail</div> : ""}
                    {vidupload ? <div className="image-upload">
                        {imgchange && imgprogress !== 100 ? <div className="S-progress">
                            <progress className="S-progress-bar" value={imgprogress} max="100" /><span>{imgprogress}%</span>
                        </div> : ""}
                        <div className="S-video">Thumbnail Upload</div>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        <button className={imgprogress === 100 ? "btn btn-success S-button" : "btn btn-dark S-btn"} onClick={handleImageUpload}>{imgprogress !== 100 ? <div><span><i class="fal fa-image S-icon"></i></span><span>Upload</span></div> : <div><span><i class="fad fa-check-circle S-icon"></i></span><span>Uploaded</span></div>}</button>
                        {imgprogress === 100 ? <button onClick={imageDeleteUpload} className="btn btn-danger">{!imgdelete ? <div><span><i class="fad fa-times-circle S-icon"></i></span><span>Delete</span></div> : <span>Deleted</span>}</button> : ""}
                    </div> : ""}
                </div>
            </div>
            <div className="S-final">
                {vidupload ? <Link to="/audiolist"><button className="btn btn-success"><span><i class="fad fa-check-square S-icon"></i></span><span>Done</span></button></Link> : ""}
                {vidupload ? <Link to="/audiolist"><button className="btn btn-danger"><span></span><i class="fad fa-times-circle S-icon"></i><span>Cancel</span></button></Link> : ""}
            </div>
        </div>

    );
};


export default UploadAudio;