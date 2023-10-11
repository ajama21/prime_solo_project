import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Onboarding from '../Onboarding/Onboarding'
import Dashboard from '../Dashboard/Dashboard';
import DriverPage from '../DriverPage/DriverPage';
import NewTruck from '../NewTruck/NewTruck';


import './App.css';
import Testing from '../Testing/Testing';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
          >
            <LandingPage />
          </Route>
          <Route
            exact
            path="/about"
          >
            <AboutPage />
          </Route>
          <Route
            exact
            path="/register"
          >
            <RegisterPage />
          </Route>
          <Route
            exact
            path="/login"
          >
            <LoginPage />
          </Route>
          <Route
            exact
            path="/testing"
          >
            <Testing />
          </Route>

          <ProtectedRoute
            exact
            path="/dashboard/onboarding"
          >
            <Onboarding />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/dashboard/driverpage/:id"
          >
            <DriverPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/dashboard/newtruck"
          >
            <NewTruck />
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
