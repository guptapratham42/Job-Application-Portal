import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import moment from 'moment';
import axios from 'axios';
import Popup from "./Popup";
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
        this.state = {jobs: [], email:'', type:'Full-Time', minsal:0, maxsal:0, duration:1, tempjobs: [], addModelshow:false};
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeminsal = this.onChangeminsal.bind(this);
        this.onChangemaxsal = this.onChangemaxsal.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2= this.onSubmit2.bind(this);
        this.onSubmit3= this.onSubmit3.bind(this);
        this.onSubmit4= this.onSubmit4.bind(this);
        this.handleClickApply= this.handleClickApply.bind(this);
        this.handleClickdd=this.handleClickdd.bind(this);
        this.handleClickdi=this.handleClickdi.bind(this);
        this.handleClicksi=this.handleClicksi.bind(this);
        this.handleClicksd=this.handleClicksd.bind(this);
        //this.handleClickUpdate = this.handleClickUpdate.bind(this);
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeminsal(event) {
        this.setState({ minsal: event.target.value });
    }
    onChangemaxsal(event) {
        this.setState({ maxsal: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
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
    onSubmit2(e) {
        e.preventDefault();
        console.log(this.state.type);
        let newjobs= this.state.jobs.filter(jobs => jobs.type===this.state.type);
        this.setState({
            email: '',
            jobs: newjobs,
            type: 'Full-Time'
           // password: ''
        });
       // window.location.reload();
    }
    onSubmit3(e) {
        e.preventDefault();
        
        console.log(this.state.maxsal);
        let newjobs= this.state.jobs.filter(jobs => jobs.salary <= this.state.maxsal & jobs.salary >= this.state.minsal);
         this.setState({
             email: '',
             jobs: newjobs,
             type: 'Full-Time'
        //    // password: ''
         });
       // window.location.reload();
    }    
    onSubmit4(e) {
        e.preventDefault();
        
        console.log(parseInt(this.state.duration));
        let newjobs= this.state.jobs.filter(jobs => jobs.duration < this.state.duration);
         this.setState({
             email: '',
             jobs: newjobs,
             type: 'Full-Time'
        //    // password: ''
         });
       // window.location.reload();
    }
    handleClickApply(id)
    {
        this.setState({addModelshow:true});
        //console.log(id);
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
    handleClicksi()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.salary > b.salary) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClicksd()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.salary < b.salary) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClickdd()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.duration < b.duration) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClickdi()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.duration > b.duration) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    render() {
        let addModelclose=() => this.setState({addModelshow:false});
        return (
            <div>
                <button onClick={() => this.handleClicksi()}>Salary Increasing</button>
                <button onClick={() => this.handleClicksd()}>Salary Decreasing</button>
                <button onClick={() => this.handleClickdi()}>Duration Increasing</button>
                <button onClick={() => this.handleClickdd()}>Duration Decreasing</button>
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
                <form onSubmit={this.onSubmit2}>
                <div className="form-group">
                        <label>Type of Job: </label>
                        <br></br>
                        <select className="form-control" value={this.state.type} onChange={this.onChangeType}>
                        <option title="Part-Time" value="Part-Time">Part-Time</option>
                        <option title="Full-Time" value="Full-Time">Full-Time</option>
                        <option title="Work from Home" value="Work from Home">Work From Home</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                    </form>
                    <form onSubmit={this.onSubmit3}>
                    <div className="form-group">
                        <label>Min Salary: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.minsal}
                               onChange={this.onChangeminsal}
                               />
                        <label>Max Salary: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.maxsal}
                               onChange={this.onChangemaxsal}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                <form onSubmit={this.onSubmit4}>
                <div className="form-group">
                        <label>Duration of Job: </label>
                        <br></br>
                        <select className="form-control" value={this.state.duration} onChange={this.onChangeduration}>
                        <option title="1" value="1">1</option>
                        <option title="2" value="2">2</option>
                        <option title="3" value="3">3</option>
                        <option title="4" value="4">4</option>
                        <option title="5" value="5">5</option>
                        <option title="6" value="6">6</option>
                        <option title="7" value="7">7</option>
                        </select>
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
                                            <TableCell>Type of job</TableCell>
                                            <TableCell>Deadline of job</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.title}</TableCell>
                                            <TableCell>{jobs.name_of_recruiter}</TableCell>
                                            <TableCell>{jobs.salary}</TableCell>
                                            <TableCell>{jobs.duration}</TableCell>
                                            <TableCell>{jobs.type}</TableCell>
                                            <TableCell>{jobs.deadline}</TableCell>
                                            <TableCell><button onClick={() => this.handleClickApply(jobs.email_of_recruiter)}>
                                            Apply
                                            </button>
                                            <Popup onHide={addModelclose} show={this.state.addModelshow} jobs={jobs.email_of_recruiter} id={jobs._id} title={jobs.title} salary={jobs.salary} name_of_recruiter={jobs.name_of_recruiter}></Popup>
                                            </TableCell>
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