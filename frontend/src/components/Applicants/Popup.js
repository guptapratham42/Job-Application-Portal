import React, {Component} from 'react';
import axios from 'axios';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export default class Popup extends Component {
    
    constructor(props) {
        super(props);
        //console.log(props);
        this.state={
            name:'',
            email:'',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangename = this.onChangename.bind(this);
        //this.onChangeemail = this.onChangeemail.bind(this);
    }
    // componentWillUpdate(props, state)
    // {
    //     if(props.)
    // }
    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }
    onSubmit(e) {
        e.preventDefault();
        //
        console.log(this.props);
        //console.log(this.state);
        //var abc= new Date();
        var user_info=JSON.parse(localStorage.getItem("LoggedinUser"));
        const new_application ={
            applicant_name: user_info.user.name,
            applicant_id: user_info.user._id,
            date_of_application: Date.now(),
            sop: this.state.name,
            email_of_recruiter: this.props.jobs,
            job_id: this.props.id,
            job_title: this.props.title,
            salary: this.props.salary,
            name_of_recruiter: this.props.name_of_recruiter,
            stage_of_application: "Applied"
            //id: this.props.user
        }
        console.log(new_application);
        axios.post('http://localhost:4000/jobs/Newapplication', new_application)
        .then(res => {
            console.log(res.data);
            if(res.data._id)
            {
                alert("Job Application sent!");
                //window.location.reload();
            }
            else
            {
                alert("Please enter SOP");
            }
            //this.setState({jobs: res.data});
           })
        ;
        this.props.onHide();
    }
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Please enter a text Statement of Purpose(SOP)
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>SOP: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
              <Button onClick={this.onSubmit} variant="success">Save</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}