import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "/images/";
  return (
    <div className="post">
      {(() => {
        const value = post?.photo;
        const imageSrc = (() => {
          if (!value) return "/road.jpg";
          const str = String(value);
          const isAbsolute = /^https?:\/\//i.test(str) || /^data:|^blob:/i.test(str);
          if (isAbsolute) return str;
          if (str.startsWith("/images/")) return str;
          return `${PF}${str.replace(/^\/+/, "")}`;
        })();
        return (
          <img className="postImg" src={imageSrc} alt="" onError={(e) => { e.currentTarget.src = "/road.jpg"; }} />
        );
      })()}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, idx) => (
            <span className="postCat" key={c._id || `${post._id}-cat-${idx}`}>{c.name || c}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}