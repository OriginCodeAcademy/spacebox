import React, { Component } from 'react';
import HomePage from '../HomePage/index';
import { withRouter } from 'react-router';
import { updateSongs } from '../SongQueue/SQueueActions';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class Room extends Component {
    constructor(props) {
        super(props);
        const { dispatch ,match: { params } } = this.props;

        socket.on('connect', () => {
            socket.emit('room', params.queueId)
        })
        socket.on('update', (tracks) => {
            dispatch(updateSongs(tracks));
        });
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
