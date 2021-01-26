import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import RecHome from './components/Recruiter/RecHome'
import Applicant from './components/Applicants/EditApplicant'
import NewJob from './components/Recruiter/NewJob'
import MyJobs from './components/Recruiter/MyJobs'
import AllJobs from './components/Applicants/AllJobs'
import MyApplications from './components/Applicants/MyApplications'
import JobApplications from './components/Recruiter/JobApplications'
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/login" component={Login}/>
        <Route path="/RecHome" component={RecHome}/>
        <Route path="/NewJob" component={NewJob}/>
        <Route path="/MyJobs" component={MyJobs}/>
        <Route path="/Applicant" component={Applicant}/>
        <Route path="/Alljobs" component={AllJobs}/>
        <Route path="/MyApplications" component={MyApplications}/>
        <Route path="/JobApplications" component={JobApplications}/>
      </div>
    </Router>
  );
}

export default App;
