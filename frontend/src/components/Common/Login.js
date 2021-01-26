import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
            //date:null
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            // name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4000/user/login', newUser)
             .then(res => {
                if(res.data.msg)
                    alert(res.data.msg);
                else
                 {
                    localStorage.setItem("LoggedinUser", JSON.stringify(res.data));
                    localStorage.setItem("role", res.data.user.role);
                    //console.log(localStorage.getItem("LoggedinUser"));
                    //console.log(res.data[0]);
                    alert("Successfully Logged in\t" + res.data.user.name);console.log(res.data);
                    if(res.data.user.role==="Recruiter")
                    {
                        this.props.history.push("/RecHome");
                        window.location.reload();
                    }
                    else
                    {
                        this.props.history.push("/Applicant");
                        window.location.reload();
                    }
                 }
                })
             ;

        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}