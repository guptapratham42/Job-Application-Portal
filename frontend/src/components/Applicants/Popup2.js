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
        this.onChangeemail = this.onChangeemail.bind(this);
    }
    // componentWillUpdate(props, state)
    // {
    //     if(props.)
    // }
    onSubmit(e) {
        e.preventDefault();
        //
        console.log(this.props);
        //console.log(this.state);
        const rec_info ={
            name: this.state.name,
            email: this.state.email,
            id: this.props.user
        }
        console.log(rec_info);
        axios.post('http://localhost:4000/user/AppProfile', rec_info)
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
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
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
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
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