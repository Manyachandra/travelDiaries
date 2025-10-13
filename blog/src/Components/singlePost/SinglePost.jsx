import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import toast from 'react-hot-toast';
import "./singlepost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get("/api/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (err) {
        setError(true);
        toast.error('Failed to load post. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    setIsDeleting(true);
    const toastId = toast.loading('Deleting post...');
    
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      toast.success('Post deleted successfully!', { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error('Failed to delete post. Please try again.', { id: toastId });
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !desc.trim()) {
      toast.error('Title and description cannot be empty');
      return;
    }
    
    setIsUpdating(true);
    const toastId = toast.loading('Updating post...');
    
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      toast.success('Post updated successfully!', { id: toastId });
    } catch (err) {
      toast.error('Failed to update post. Please try again.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="singlePost">
        <div className="singlePostWrapper" style={{animation: 'pulse 1.5s ease-in-out infinite'}}>
          <div style={{
            width: '100%',
            height: '300px',
            background: 'var(--bg)',
            borderRadius: '10px',
            marginBottom: '20px'
          }}></div>
          <div style={{
            height: '36px',
            background: 'var(--bg)',
            borderRadius: '4px',
            marginBottom: '16px',
            width: '70%'
          }}></div>
          <div style={{
            height: '20px',
            background: 'var(--bg)',
            borderRadius: '4px',
            marginBottom: '24px',
            width: '40%'
          }}></div>
          <div style={{
            height: '120px',
            background: 'var(--bg)',
            borderRadius: '4px',
            width: '100%'
          }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="singlePost">
        <div className="singlePostWrapper" style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text)'
        }}>
          <i className="fa fa-exclamation-circle" style={{fontSize: '48px', color: 'var(--muted)', marginBottom: '20px'}}></i>
          <h2 style={{marginBottom: '12px'}}>Failed to load post</h2>
          <p style={{color: 'var(--muted)', marginBottom: '24px'}}>The post you're looking for could not be found or failed to load.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
            style={{padding: '10px 24px', fontSize: '16px'}}
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => !isDeleting && setUpdateMode(true)}
                  style={{opacity: isDeleting ? 0.5 : 1, cursor: isDeleting ? 'not-allowed' : 'pointer'}}
                ></i>
                <i
                  className={isDeleting ? "singlePostIcon fa fa-spinner fa-spin" : "singlePostIcon far fa-trash-alt"}
                  onClick={handleDelete}
                  style={{cursor: isDeleting ? 'not-allowed' : 'pointer'}}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button 
            className="singlePostButton" 
            onClick={handleUpdate}
            disabled={isUpdating}
            style={{opacity: isUpdating ? 0.7 : 1}}
          >
            {isUpdating ? (
              <><i className="fa fa-spinner fa-spin"></i> Updating...</>
            ) : (
              'Update'
            )}
          </button>
        )}
      </div>
    </div>
  );
}