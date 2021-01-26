import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/RecHome" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/NewJob" className="nav-link">Create Job</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/MyJobs" className="nav-link">My Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/" className="nav-link" onClick={() => {localStorage.clear(); window.location.href="/";}}>Logout</Link>
                            </li>                              
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}