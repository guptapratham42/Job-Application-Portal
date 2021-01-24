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
import Popup from "./Popup";
import SearchIcon from "@material-ui/icons/Search";
class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [], addModelshow:false};
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
    }
    handleClickUpdate()
    {
        this.setState({addModelshow:true});
    }
    handleClickDelete(id)
    {
        console.log(id);
        var temp= '{ "id": "'+ id + '"}';
        console.log(temp);
        var jsonid=JSON.parse(temp);
        console.log(jsonid);
        axios.post('http://localhost:4000/jobs/DeleteJob', jsonid)
        .then(
            res => {
                if(res.data.msg)
                {
                    window.location.reload();
                }
            }
        )
    }
    componentDidMount() {
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        axios.post('http://localhost:4000/jobs/MyJobs', user_info)
        .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
           })
        ;
        
    }
    render() {
        let addModelclose=() => this.setState({addModelshow:false});
        return (
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of Posting</TableCell>
                                            <TableCell>Maximum no of Applications</TableCell>
                                            <TableCell>No of Positions</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.title}</TableCell>
                                            <TableCell>{jobs.date_of_posting}</TableCell>
                                            <TableCell>{jobs.no_of_applicants}</TableCell>
                                            <TableCell>{jobs.no_of_positions}</TableCell>
                                            <TableCell><button onClick={() => this.handleClickDelete(jobs._id)}>
                                            Delete Job
                                            </button></TableCell>
                                            <TableCell><button onClick={() => this.handleClickUpdate()}>
                                            Update Job
                                            </button>
                                            <Popup onHide={addModelclose} show={this.state.addModelshow} jobs={jobs._id}></Popup>
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