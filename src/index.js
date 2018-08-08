import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const socket = io();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      uri: "",
      songs: []
    }
    socket.on('update', songs => this.setState({ songs }));
    this.getUri = this.getUri.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }


  componentDidMount() {
    axios.get('/board').then(r => this.setState({ songs: r.data }));
  }

  getUri(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch() {
    axios.post('/api/request', {uri: this.state.uri})
    .then( res => { 
      console.log(res.data)
      return res.data
    }); 
  }

  render() {
    return (
      <section id="main">
        <h1>Songs</h1>
        <p>Start at /register</p>
        <div>
          <input type="text" name="uri" onChange={this.getUri} value={this.state.uri}/>
          <button name="button" onClick={this.handleSearch}>Search</button>
        </div>
        <section>
          {this.state.songs.map((song) => {
            return <li>{song.name}</li>
          })}
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
