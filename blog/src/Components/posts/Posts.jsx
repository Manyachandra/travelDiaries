import Post from "../post/Post";
import "./posts.css";
import { useState } from "react";
import Test from "../../Video/test"
import Type from "../../Video/Type"
import cities from "../../Video/cities"
import { useLocation,useNavigate } from "react-router-dom";
export default function Posts({posts},props) {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState([]);
  const s = useLocation();
  let navigate = useNavigate();
const cityfilter=()=>{
  navigate(`?city=${city}`)
}
  const  handleCallback = (childData) =>{
    setCity(childData)
   
    console.log(city)
}
const domainfilter=()=>{
  navigate(`?cat=${category[0]}`)
}

const  handleTestCallback = (childData) =>{
 
  
    setCategory(childData)
   
   console.log(category)
  }
  console.log(s)
  return (

    <div className="posts">
    <div className="filter">
      <Test parentTestCallback = {handleTestCallback}/>
      <button onClick={domainfilter} className="btn btn-danger">Apply</button>
      <Type iteams={cities} parentCallback = {handleCallback}/>
     <button onClick={cityfilter} className="btn btn-danger">Apply</button>
    </div>
    {posts.map((p)=>(   <Post post={p}/>)
   
    )}
      
     
    </div>
  );
}