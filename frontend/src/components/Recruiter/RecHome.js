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
import Popup2 from "./Popup2";
import SearchIcon from "@material-ui/icons/Search";
class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [], addModelshow:false, user_new:''};
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
    }
    handleClickUpdate()
    {
        this.setState({addModelshow:true});
    }
    componentDidMount() {
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        const UpdatedUser=
        {
            id: user_info.user._id
        }
        axios.post('http://localhost:4000/user/update', UpdatedUser)
        .then(res => {
            console.log(res.data);
            this.setState({user_new: res.data});
            console.log(this.state.user_new);
           })
        ;
        
    }
    render() {
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        let addModelclose=() => this.setState({addModelshow:false});
        return (
            <div>
                <Grid container>
                    <Grid>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email id</TableCell>
                                            <TableCell>Contact No.</TableCell>
                                            <TableCell>Bio</TableCell>
                                            <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow>
                                            <TableCell>{this.state.user_new.name}</TableCell>
                                            <TableCell>{this.state.user_new.email}</TableCell>
                                            <TableCell>{this.state.user_new.number}</TableCell>
                                            <TableCell>{this.state.user_new.Bio}</TableCell>
                                            <TableCell><button onClick={() => this.handleClickUpdate()}>
                                            Update Profile
                                            </button>
                                            <Popup2 onHide={addModelclose} show={this.state.addModelshow} user={this.state.user_new._id}></Popup2>
                                            </TableCell>
                                        </TableRow>
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