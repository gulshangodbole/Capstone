import {Route, Routes} from "react-router-dom";

import Homepage from "../pages/Homepage";
import {Support} from "../components/Support";

import Application from "../pages/Application";
import Login from "../pages/Login";
import {SignUp} from "../pages/SignUp";
import Calculator from "../pages/Calculator";
import {PrivateRoute} from "./PrivateRoute";
import {BankApplication} from "../pages/BankApplication";
import Bank from "../pages/Bank";
import {Admin} from "../pages/Admin";
import {Profile} from "../pages/Profile";
import Process from "../pages/Process";
import EditProfile from "../pages/EditProfile";
import Dashboard from "../pages/Dashboard";
import AdminSupport from "../pages/AdminSupport";
import Payment from "../pages/Payment";
import Loan from "../pages/Loans";
import AdminDashboard from "../pages/AdminDashboard";
import Payments from "../pages/Payments";
import LoanPayments from "../pages/LoanPayments";

import React, { useState,useEffect} from 'react';
export const MainRoutes = () => {
    
    return (
        <>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>


        </Routes>
        <Routes>
          <Route
              path="/dashboard"
              element={
                  <PrivateRoute>
                      <Dashboard/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/admin/dashboard"
              element={
                  <AdminDashboard/>
              }
          />
          <Route
              path="/loan"
              element={
                  <PrivateRoute>
                      <Loan/>
                  </PrivateRoute>
              }
          />
          <Route path="/banks" element={<Bank/>}/>
          <Route
              path="/edit"
              element={
                  <PrivateRoute>
                      {" "}
                      <EditProfile/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/verification"
              element={
                  <PrivateRoute>
                      <Application/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/paymentHistory"
              element={
                  <PrivateRoute>
                      <LoanPayments/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/payments"
              element={
                  <PrivateRoute>
                      <Payments/>
                  </PrivateRoute>
              }
          />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/support" element={<AdminSupport/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/calculator" element={<Calculator/>}/>

          {/* <Route path="/bank/:bankname/:id" element={<Bank/>} /> */}

          <Route path="/process" element={<Process/>}/>

          <Route
              path="/profile"
              element={
                  <PrivateRoute>
                      <Profile/>
                  </PrivateRoute>
              }
          />

          <Route
              path="/bankApplication"
              element={
                  <PrivateRoute>
                      <BankApplication/>
                  </PrivateRoute>
              }
          />

          <Route
              path="/payment"
              element={
                  <PrivateRoute>
                      <Payment/>
                  </PrivateRoute>
              }
          />
          </Routes>
            

        
        </>
    );
};
