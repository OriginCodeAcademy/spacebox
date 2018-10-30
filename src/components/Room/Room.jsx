import React, { Component } from 'react';
import HomePage from '../HomePage/index';
import { withRouter } from 'react-router';
import { updateRoom, connectToRoom } from './RoomAction';
import io from 'socket.io-client';
<<<<<<< HEAD
const socket = io('http://localhost:3000');
=======
const socket = io();
>>>>>>> Added socket.io

class Room extends Component {
    constructor(props) {
        super(props);
        socket.on('update', queueId =>
<<<<<<< HEAD
			dispatch(updateRoomTracks(queueId)));
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.queueId);
        socket.emit('room', params.queueId);
=======
			dispatch(updateRoom(queueId)));
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        socket.join(params.queueId);
>>>>>>> Added socket.io
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