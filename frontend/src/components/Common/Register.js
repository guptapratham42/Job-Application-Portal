import React, {Component} from 'react';
import axios from 'axios';
//import Popup from 'react-popup';
//import Dropdown from 'react-dropdown';

//const options = ['Recruiter', 'Applicant'];
//const defaultOption = options[0];
export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            role: "Applicant",
            password: '',
            date:null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeRole(event) {
        this.setState({ role: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
            date: Date.now()
        }
        axios.post('http://localhost:4000/user/register', newUser)
             .then(res => {
                 if(res.data.msg)
                    alert(res.data.msg);
                else if(res.data.driver)
                {
                    alert("Account with the same email id already exists!")
                }
                else{
                 alert("Created an account for\t" + res.data.name);
                }
                 console.log(res.data);
                })
             ;
        //Popup.alert('I am alert, nice to meet you');
        this.setState({
            name: '',
            email: '',
            role: "Applicant",
            password: '',
            date:null
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <br></br>
                        <select className="form-control" value={this.state.role} onChange={this.onChangeRole}>
                        <option name="Recruiter" value="Recruiter">Recruiter</option>
                        <option name="Applicant" value="Applicant">Applicant</option>
                        {/* value={this.state.role}
                        onChange={this.onChangeRole} */}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}