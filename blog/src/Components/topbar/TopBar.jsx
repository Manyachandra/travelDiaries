import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const apiBase = process.env.REACT_APP_API_BASE_URL || "";
  const PF = `${apiBase.replace(/\/+$/, "")}/images/`;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/videolist">
              Videos
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/audiolist">
              Podcast
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>

        </ul>
      </div>
      <div className="topRight">
        <button className="nav-btn ghost" onClick={toggleTheme}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
        {user ? (
          <></>
        ) : (
          <div className="nav-actions">
            <Link className="link" to="/login"><button className="nav-btn primary">Login</button></Link>
            <Link className="link" to="/register"><button className="nav-btn">Register</button></Link>
          </div>
        )}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
        {user &&
          <>
            <div className="nav-actions">
              <Link className="link" to="/Uploadpodcast"><button className="nav-btn primary"> <i className="fa-solid fa-arrow-up-from-bracket nav-icon"></i> Upload Pod </button></Link>
              <Link className="link" to="/upload"><button className="nav-btn primary"> <i className="fa-solid fa-arrow-up-from-bracket nav-icon"></i> Uploads </button></Link>
              <Link to="/settings" aria-label="Settings">
                <img className="topImg" src={PF + user.profilePic} alt="" />
              </Link>
              <button className="nav-btn signout" onClick={handleLogout}>

                <i className="fa-solid fa-user-slash nav-icon"></i>


                Sign Out


              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
}