import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import SearchIcon from "@material-ui/icons/Search";
class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [], email:''};
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.email);
        const file=
        {
            title: this.state.email
        }
        axios.post('http://localhost:4000/jobs/SearchJobs', file)
        .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
           })
        this.setState({
            email: '',
            jobs: []
           // password: ''
        });
    }        
    componentDidMount() {
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        axios.post('http://localhost:4000/jobs/AllJobs', user_info)
        .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
           })
        ;
        
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Name of Recruiter</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.title}</TableCell>
                                            <TableCell>{jobs.name_of_recruiter}</TableCell>
                                            <TableCell>{jobs.salary}</TableCell>
                                            <TableCell>{jobs.duration}</TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}

export default UsersList;