import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const PF = "/images/"

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
        <button className="btn btn-dark m-2" onClick={toggleTheme}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
        {user &&
          <>
            <Link className="link m-2" to="/Uploadpodcast"><button className="btn btn-danger"> <i className="fa-solid fa-arrow-up-from-bracket"></i> Upload Pod </button></Link>
            <Link className="link m-2" to="/upload"><button className="btn btn-danger"> <i className="fa-solid fa-arrow-up-from-bracket"></i> Uploads </button></Link>
            <button className="btn btn-dark m-2 topListItem" onClick={handleLogout}>

              <i className="fa-solid fa-user-slash"></i>


              "Sign-Off"


            </button>
          </>
        }
      </div>
    </div>
  );
}