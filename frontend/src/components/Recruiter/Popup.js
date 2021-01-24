import React, {Component} from 'react';
import axios from 'axios';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export default class Popup extends Component {
    
    constructor(props) {
        super(props);
        //console.log(props);
        this.state={
            applicants:'',
            positions:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeapplicants = this.onChangeapplicants.bind(this);
        this.onChangepositions = this.onChangepositions.bind(this);
    }
    // componentWillUpdate(props, state)
    // {
    //     if(props.)
    // }
    onSubmit(e) {
        e.preventDefault();
        //
        //console.log(this.props.jobs);
        const job_info ={
            applicants: parseInt(this.state.applicants),
            positions: parseInt(this.state.positions),
            id: this.props.jobs
        }
        console.log(job_info);
        axios.post('http://localhost:4000/jobs/UpdateJob', job_info)
        .then(res => {
            console.log(res.data);
            if(res.data.msg)
            {
                window.location.reload();
            }
            //this.setState({jobs: res.data});
           })
        ;
        this.props.onHide();
    }
    onChangepositions(event) {
        this.setState({ positions: event.target.value });
    }
    onChangeapplicants(event) {
        this.setState({ applicants: event.target.value });
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
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>No of Positions: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.positions}
                               onChange={this.onChangepositions}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum number of Applicants: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.applicants}
                               onChange={this.onChangeapplicants}
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