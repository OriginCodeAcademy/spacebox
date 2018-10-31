import React, { Component } from 'react';
import HomePage from '../HomePage/index';
import { withRouter } from 'react-router';
import { updateMessages } from './RoomAction';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class Room extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleConnection = this.handleConnection.bind(this);

        this.handleUpdate();
    }
    componentDidMount() {
        this.handleConnection();
    }
    handleUpdate() {
        const { dispatch, messageList } = this.props;
        socket.on('update', () => {
            io.to(messageList).emit('update');
            dispatch(updateMessages(messageList));
        });
    }
    handleConnection() {
        const { dispatch ,match: { params } } = this.props;
        console.log(params.queueId)
        socket.on('connected', function() {
           socket.join(params.queueId);
           dispatch(updateRoomTracks(params.queueId));
           io.to('connection').emit('connected');
        });
    }
    render() {
        const { messageList } = this.props;
        return (
            <div className='container'>
              <HomePage />
                <div>
              { messageList && messageList.map((msg, index)=>{
                  return (
                    <li>

                    </li>
                  );
                })
              }
                </div>
            </div>
        );
    };
}

export default withRouter(Room);