import React, { Component } from 'react';
import HomePage from '../HomePage/index';
import { withRouter } from 'react-router';
import { updateRoom, connectToRoom } from './RoomAction';
import io from 'socket.io-client';
const socket = io();

class Room extends Component {
    constructor(props) {
        super(props);
        socket.on('update', queueId =>
			dispatch(updateRoom(queueId)));
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        socket.join(params.queueId);
    }
    render() {
        return (
            <div className='container'>
              <HomePage />
            </div>
        );
    };
}

export default withRouter(Room);