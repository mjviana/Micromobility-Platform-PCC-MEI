import {Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Activation from "./components/views/Activation";
import Forgot from "./components/views/Forgot";
import ResetPassword from "./components/views/ResetPassword";
import Home from "./components/views/Home/index";
import About from "./components/views/About/index";
import Navbar from "./components/views/Navbar/index";
import Users from "./components/views/Users/Users";
import Vehicles from "./components/views/Vehicles/Vehicles";
import Trips from "./components/views/Trips/Trips";
import React from "react";

const Auth = () => {
  return (
    <React.Fragment> {}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot-password' element={<Forgot/>} />
        <Route path='/activation' element={<Activation/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/vehicles' element={<Vehicles/>} />
        <Route path='/trips' element={<Trips/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
    </React.Fragment>
  );
};

export default Auth;



