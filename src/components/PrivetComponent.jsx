import React from "react";
import {Navigate ,Outlet } from 'react-router-dom'
const Pravitecom =()=>{
    const auth = localStorage.getItem("UserData");

    return auth? <Outlet/>:<Navigate to="/"/>
}
export default Pravitecom