import { useEffect, useState } from "react";
import Header from "../../Components/header/Header";
import Posts from "../../Components/posts/Posts";
import Sidebar from "../../Components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useLocation,useNavigate } from "react-router";

export default function Home(props) {
  
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
      console.log( "this is search" +  search )
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}