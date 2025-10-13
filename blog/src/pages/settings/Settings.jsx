import "./settings.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import toast from 'react-hot-toast';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user, dispatch } = useContext(Context);
  const PF = "/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (password && password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    dispatch({ type: "UPDATE_START" });
    setIsSubmitting(true);
    setSuccess(false);
    setErrorMsg("");
    
    const toastId = toast.loading('Updating your profile...');
    
    const updatedUser = {
      userId: user._id,
      username: user.username,
      email,
      password,
    };
    
    try {
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        
        try {
          await axios.post("/api/upload", data);
        } catch (err) {
          toast.error('Failed to upload profile picture', { id: toastId });
          setIsSubmitting(false);
          dispatch({ type: "UPDATE_FAILURE" });
          return;
        }
      }
      
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      const userData = res.data.user || res.data;
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: userData });
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (err) {
      const errorMsg = "Update failed. Please try again.";
      setErrorMsg(errorMsg);
      toast.error(errorMsg, { id: toastId });
      dispatch({ type: "UPDATE_FAILURE" });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <button className="btn btn-danger settingsDeleteTitle"><i class="fa-solid fa-trash"></i>  Delete Account</button>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><i className="fa fa-spinner fa-spin"></i> Updating...</>
            ) : (
              'Update'
            )}
          </button>
          {success && (
            <div style={{
              color: "#16a34a",
              background: "rgba(22,163,74,0.12)",
              border: "1px solid rgba(22,163,74,0.35)",
              borderRadius: 10,
              padding: 10,
              marginTop: 16,
              textAlign: "center"
            }}>Profile has been updated.</div>
          )}
          {!!errorMsg && (
            <div style={{
              color: "#ef4444",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: 10,
              padding: 10,
              marginTop: 16,
              textAlign: "center"
            }}>{errorMsg}</div>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}