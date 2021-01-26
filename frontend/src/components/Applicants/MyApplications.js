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
class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: []};
    }
    componentDidMount() {
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        console.log(user_info);
        axios.post('http://localhost:4000/jobs/MyApplications', user_info)
        .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
           })
        ;
    }
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.job_title}</TableCell>
                                            <TableCell>{jobs.salary}</TableCell>
                                            <TableCell>{jobs.name_of_recruiter}</TableCell>
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