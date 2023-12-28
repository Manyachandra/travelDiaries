import Topbar from "./Components/topbar/TopBar";
import Homepage from "./pages/home/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Upload from "./pages/UploaderScreen/upload";
import ListDisplay from "./pages/lists/List";
import Display from "./pages/DisplayScreen/Display";

import Test from "./Video/test";
import List from "./pages/Podcast/list";
import UploadAudio from "./pages/UploaderScreen/UploadAudio";
import ListDisplayAudio from "./pages/listAudio/List";
import Player from "./pages/Podcast/components/Player/Player";

function App() {
   const { user } = useContext(Context);
   return (
      <Router>
         <Topbar />
         <Routes>
            <Route exact path="/" element={<Homepage />}>

            </Route>
            <Route path="/posts" element={<Homepage />}>

            </Route>
            <Route path="/register" element={user ? <Homepage /> : <Register />}>

            </Route>
            <Route path="/login" element={user ? <Homepage /> : <Login />}></Route>
            <Route path="/post/:id" element={<Single />}>

            </Route>
            <Route path="/write" element={user ? <Write /> : <Login />}></Route>
            <Route path="/settings"
               element={user ? <Settings /> : <Login />}>
            </Route>
            <Route path="/upload"
               element={user ? <Upload /> : <Login />}>
            </Route>
            <Route path="/videolist"
               element={user ? <ListDisplay /> : <Login />}>
            </Route>
            <Route path="/audiolist"
               element={user ? <ListDisplayAudio /> : <Login />}>
            </Route>
            <Route path="/player"
               element={user ? <Player /> : <Login />}>
            </Route>
            <Route path="/Display"
               element={user ? <Display /> : <Login />}>
            </Route>
            <Route path="/test"
               element={user ? <Test /> : <Login />}>
            </Route>
            
            <Route path="/Uploadpodcast"
               element={user ? <UploadAudio /> : <Login />}>
            </Route>
         </Routes>


      </Router>
   );
}

export default App;