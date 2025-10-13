import Post from "../post/Post";
import "./posts.css";
import { useState } from "react";
import Test from "../../Video/test";
import Type from "../../Video/Type";
import cities from "../../Video/cities";
import { useLocation, useNavigate } from "react-router-dom";

export default function Posts({ posts, loading }, props) {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState([]);
  const s = useLocation();
  let navigate = useNavigate();
const cityfilter=()=>{
  navigate(`?city=${city}`)
}
  const  handleCallback = (childData) =>{
    setCity(childData)
}
const domainfilter=()=>{
  navigate(`?cat=${category[0]}`)
}

const  handleTestCallback = (childData) =>{
    setCategory(childData)
  }
  
  // Loading skeleton component
  const PostSkeleton = () => (
    <div className="post" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '16px',
      marginBottom: '20px',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}>
      <div style={{
        width: '100%',
        height: '280px',
        background: 'var(--bg)',
        borderRadius: '10px',
        marginBottom: '16px'
      }}></div>
      <div style={{
        height: '24px',
        background: 'var(--bg)',
        borderRadius: '4px',
        marginBottom: '12px',
        width: '70%'
      }}></div>
      <div style={{
        height: '16px',
        background: 'var(--bg)',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '40%'
      }}></div>
      <div style={{
        height: '60px',
        background: 'var(--bg)',
        borderRadius: '4px',
        width: '100%'
      }}></div>
    </div>
  );

  return (
    <div className="posts">
      <div className="filter">
        <Test parentTestCallback={handleTestCallback}/>
        <button onClick={domainfilter} className="btn btn-danger">Apply</button>
        <Type iteams={cities} parentCallback={handleCallback}/>
        <button onClick={cityfilter} className="btn btn-danger">Apply</button>
      </div>
      
      {loading ? (
        // Show 3 skeleton loaders while loading
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--muted)',
          fontSize: '18px'
        }}>
          No posts found. Try adjusting your filters.
        </div>
      ) : (
        posts.map((p) => <Post key={p._id} post={p} />)
      )}
    </div>
  );
}