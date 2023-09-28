import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";

import Homepage from "../pages/Homepage";
import { Support } from "../components/Support";

import Application from "../pages/Application";
import  Login  from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import Calculator from "../pages/Calculator"
import { PrivateRoute } from "./PrivateRoute";
import { BankApplication } from "../pages/BankApplication";
import Bank from "../pages/Bank";
import { Admin } from "../pages/Admin";
import { BankApplicationMain } from "../components/BankApplicationMain";
import { Profile } from "../pages/Profile";
import Process from "../pages/Process";
import EditProfile from "../pages/EditProfile";
import Dashboard from "../pages/Dashboard";


export const MainRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={<Homepage/>} />
        <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        
        <Route path="/banks/:category" element={<Bank/>} />
        <Route path="/edit" element={<PrivateRoute> <EditProfile/></PrivateRoute>} />
        <Route path="/verification" element={<PrivateRoute>
            <Application/>
          </PrivateRoute>} />

        <Route path="/admin" element={<Admin/>} />
        <Route path='/support' element={<Support/>}/>
        <Route path='/calculator' element={<Calculator/>}/>

        {/* <Route path="/bank/:bankname/:id" element={<Bank/>} /> */}

        <Route path='/process' element={<Process />} />

        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        <Route path='/bankApplication/:id' element={<PrivateRoute><BankApplicationMain /></PrivateRoute>} />

     </Routes>
  );
};
