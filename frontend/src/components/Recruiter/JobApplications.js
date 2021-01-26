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
        this.handleClickdd=this.handleClickdd.bind(this);
        this.handleClickdi=this.handleClickdi.bind(this);
        this.handleClickni=this.handleClickni.bind(this);
        this.handleClicknd=this.handleClicknd.bind(this);
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((jobs,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{jobs.applicant_name}</TableCell>
                                            <TableCell>{jobs.date_of_application}</TableCell>
                                            <TableCell>{jobs.sop}</TableCell>
                                            <TableCell>{jobs.stage_of_appliaction}</TableCell>
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