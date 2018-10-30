import React, { Component } from 'react';
import HomePage from '../HomePage/index';
import { withRouter } from 'react-router';
import { updateRoom, connectToRoom } from './RoomAction';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class Room extends Component {
    constructor(props) {
        super(props);
        socket.on('update', queueId =>
			dispatch(updateRoomTracks(queueId)));
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.queueId);
        socket.emit('room', params.queueId);
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