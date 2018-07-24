import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const socket = io();

export default class App extends Component {
  constructor() {
    super();
    socket.on('update', songs => this.setState({ songs }));
  }

  state = {
    songs: null
  };

  componentDidMount() {
    axios.get('/board').then(r => this.setState({ songs: r.data }));
  }

  render() {
    return (
      <section id="main">
        <h1>Songs</h1>
        <p>Start at /register</p>
        <section>
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
