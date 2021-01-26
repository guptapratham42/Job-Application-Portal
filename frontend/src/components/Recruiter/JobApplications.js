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
import SearchIcon from "@material-ui/icons/Search";
import Button from 'react-bootstrap/Button';
class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: []};
        this.handleClickdd=this.handleClickdd.bind(this);
        this.handleClickdi=this.handleClickdi.bind(this);
        this.handleClickni=this.handleClickni.bind(this);
        this.handleClicknd=this.handleClicknd.bind(this);
        this.handleClickAccept= this.handleClickAccept.bind(this);
        this.handleClickShortlist= this.handleClickShortlist.bind(this);
        this.handleClickReject= this.handleClickReject.bind(this);
    }
    componentDidMount() {
        var user_info=localStorage.getItem("job_id");
        console.log(user_info);
        axios.post('http://localhost:4000/jobs/MyApplications2', {id: user_info})
        .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
           })
        ;
    }
    handleClickni()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.applicant_name > b.applicant_name) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClicknd()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.applicant_name < b.applicant_name) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClickdd()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.date_of_application < b.date_of_application) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClickdi()
    {
        let thiss=this.state.jobs;
        thiss.sort((a, b) => (a.date_of_application > b.date_of_application) ? 1 : -1);
        this.setState({jobs: thiss});
    }
    handleClickShortlist(id)
    {
        axios.post('http://localhost:4000/jobs/Shortlist', {id: id})
        .then(res => {
            console.log(res.data);
            if(res.data.msg)
            {
                window.location.reload();
            }
            //this.setState({jobs: res.data});
           })
        ;
    }
    handleClickAccept(id)
    {
        axios.post('http://localhost:4000/jobs/Accept', {id: id})
        .then(res => {
            console.log(res.data);
            if(res.data.msg)
            {
                window.location.reload();
            }
            //this.setState({jobs: res.data});
           })
        ;
    }
    handleClickReject(id)
    {
        axios.post('http://localhost:4000/jobs/Reject', {id: id})
        .then(res => {
            console.log(res.data);
            if(res.data.msg)
            {
                window.location.reload();
            }
            //this.setState({jobs: res.data});
           })
        ;
    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClickni()}>Name Increasing</button>
                <button onClick={() => this.handleClicknd()}>Name Decreasing</button>
                <button onClick={() => this.handleClickdi()}>Date of Application Increasing</button>
                <button onClick={() => this.handleClickdd()}>Date of Application Decreasing</button>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Applicant Name</TableCell>
                                            <TableCell>Date of Application</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell>Stage of Application</TableCell>
                                            <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.applicant_name}</TableCell>
                                            <TableCell>{jobs.date_of_application}</TableCell>
                                            <TableCell>{jobs.sop}</TableCell>
                                            <TableCell>{jobs.stage_of_application}</TableCell>
                                            <th>
                                                {jobs.stage_of_application==="Applied" ? <button onClick={() => this.handleClickShortlist(jobs._id)}>Shortlist</button> :
                                                (jobs.stage_of_application==="Shortlisted" ? <button onClick={() => this.handleClickAccept(jobs._id)}>Accept</button> :
                                                <button>GG</button>)}
                                            </th>
                                            <TableCell>
                                                <button onClick={() => this.handleClickReject(jobs._id)}>Reject</button>
                                            </TableCell>
                                            {/* <th> {jobs.type === "Applied" ?  <Button style = {{backgroundColor:'aqua'}} variant="contained" onClick={(event)=>{this.changestate(jobs._id,jobs.type,jobs.app,event)}}>Shortlist</Button> : (  jobs.type === "Shortlisted" ?  <Button style = {{backgroundColor:'yellow'}} variant="contained" onClick={(event)=>{this.changestate(jobs._id,jobs.type,jobs.app,event)}}>Accept</Button> : <Button style = {{backgroundColor:'green'}} variant="contained" onClick={(event)=>{this.changestate(jobs._id,jobs.type,jobs.app,event)}}>Badhai Ho</Button> )} </th> */}
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