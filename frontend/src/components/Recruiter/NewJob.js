import React, {Component} from 'react';
import axios from 'axios';
//import Popup from 'react-popup';
//import Dropdown from 'react-dropdown';

//const defaultOption = options[0];
export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            no_of_applicants: '0',
            no_of_positions: '0',
            type: "Full-Time",
            duration: '0',
            salary: '0',
            deadline: '',
            date_of_posting:null
        }

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangeno_of_applicants = this.onChangeno_of_applicants.bind(this);
        this.onChangeno_of_positions = this.onChangeno_of_positions.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeno_of_applicants(event) {
        this.setState({ no_of_applicants: parseInt(event.target.value) });
    }
    onChangeno_of_positions(event) {
        this.setState({ no_of_positions: parseInt(event.target.value) });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onChangeDuration(event) {
        this.setState({ duration: parseInt(event.target.value) });
    }
    onChangeSalary(event) {
        this.setState({ salary: parseInt(event.target.value) });
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
    var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
   // console.log(user_info.user.email);
        const newJob = {
            rec: user_info.user._id,
            title: this.state.title,
            name_of_recruiter: user_info.user.name,
            email_of_recruiter: user_info.user.email,
            no_of_applicants: this.state.no_of_applicants,
            no_of_positions: this.state.no_of_positions,
            date_of_posting: Date.now(),
            type: this.state.type,
            duration: this.state.duration,
            salary: this.state.salary,
            deadline: this.state.deadline,
            isDeleted: false,
            isActive: true
        }
        //console.log(newJob.salary);
        axios.post('http://localhost:4000/jobs/newJob', newJob)
             .then(res => {
                 console.log(res.data);
                 if(res.data.errors)
                     alert("Enter all details!!");
                else
                    alert("Created a new job with title\t" + res.data.title);
                // else if(res.data.driver)
                // {
                //     alert("Account with the same no_of_applicants id already exists!")
                // }
                // else{
                //  alert("Created an account for\t" + res.data.title);
                // }
                //  console.log(res.data);
                })
             ;
        //Popup.alert('I am alert, nice to meet you');
        this.setState({
            title: '',
            no_of_applicants: '0',
            no_of_positions: '0',
            type: "Full-Time",
            duration: '0',
            salary: '0',
            deadline: '',
            date_of_posting:null
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangetitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum number of applicants who can apply: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.no_of_applicants}
                               onChange={this.onChangeno_of_applicants}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Number of positions to be filled: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.no_of_positions}
                               onChange={this.onChangeno_of_positions}
                               />  
                    </div>
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
                        <label>Duration of Job(In Months): </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChangeDuration}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Salary per Month: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline of Application: </label>
                        <input type="Date" 
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}