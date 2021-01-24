import React, {Component} from 'react';
import axios from 'axios';

export default class RecHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                Happy not so Coding!
           </div>
        )
    }
}