import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Type from '../../Video/Type';
import cities from '../../Video/cities'
import Test from "../../Video/test";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      city,
      categories: category.flat(Infinity)
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) { }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) { }
  };
const  handleCallback = (childData) =>{
    setCity(childData)
    console.log(city)
}
const  handleTestCallback = (childData) =>{
 console.log(childData);
 
   setCategory(childData)
  
  console.log(category)
 }
  return (
    <div className="write">
    
      <div className="btn-div ">
      <Test parentTestCallback = {handleTestCallback} />
      <Type iteams={cities} parentCallback = {handleCallback} />
      
      </div>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup1 m-2">
          <label htmlFor="fileInput">
            <i className="fa-solid fa-images m-2 imgupload"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />

        </div>
        <div className="writeFormGroup2 m-2">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-success writeSubmit m-2" type="submit">

Publish
</button>
      </form>
 
    </div>
  );
}