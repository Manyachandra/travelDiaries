import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import toast from 'react-hot-toast';
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!userRef.current.value || !passwordRef.current.value) {
      toast.error('Please fill in all fields');
      return;
    }
    
    dispatch({ type: "LOGIN_START" });
    
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
     
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success(`Welcome back, ${res.data.username}!`);
      navigate('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      const errorMsg = err.response?.status === 400 
        ? 'Invalid username or password' 
        : 'Unable to login. Please try again later.';
      toast.error(errorMsg);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? (
            <><i className="fa fa-spinner fa-spin"></i> Logging in...</>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}