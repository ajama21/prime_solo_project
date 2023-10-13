import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Onboarding from "../Onboarding/Onboarding";
import Dashboard from "../Dashboard/Dashboard";
import DriverPage from "../DriverPage/DriverPage";
import NewTruck from "../NewTruck/NewTruck";

import "./App.css";
import Testing from "../Testing/Testing";
import ViewTruck from "../ViewTruck/ViewTruck";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/register">
            {user.id ? <Redirect to="/dashboard?view=drivers" /> : <RegisterPage />}
          </Route>
          <Route exact path="/login">
            {user.id ? <Redirect to="/dashboard?view=drivers" /> : <LoginPage />}
          </Route>
          <Route exact path="/testing">
            <Testing />
          </Route>

          <ProtectedRoute exact path="/dashboard/onboarding">
            {!user.id ? <Redirect to="/login" /> : <Onboarding />}
          </ProtectedRoute>
          <ProtectedRoute exact path="/dashboard">
            {!user.id ? <Redirect to="/dashboard" /> : <Dashboard />}
          </ProtectedRoute>
          <ProtectedRoute exact path="/dashboard/driverpage/:id">
            {!user.id ? <Redirect to="/dashboard?view=drivers" /> : <DriverPage />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/dashboard/newtruck">
            {!user.id ? <Redirect to="/dashboard?view=drivers" /> : <NewTruck />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/dashboard/truckpage/:id">
            {!user.id ? <Redirect to="/dashboard?view=drivers" /> : <ViewTruck />}
          </ProtectedRoute>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
