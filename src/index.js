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
      disabled: false,
      songs: []
    }
    socket.on('update', songs => this.setState({ songs }));
    this.getUri = this.getUri.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }


  componentDidMount() {
    axios.get('/api/playlist').then(r => this.setState({ songs: r.data }));
  }

  getUri(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch() {
    this.setState({disabled: true});
    axios.post('/api/request', {uri: this.state.uri})
    .then( res => { 
      if (res.data.error) alert(res.data.error)
      return res.data
    })
    .then(() => this.setState({disabled: false}))
    .catch(err => {
      alert(err.message)
      this.setState({disabled: true})
    })
  }

  render() {
    return (
      <section id="main">
        <h1 className="glitch" data-text="SPACEBOX">SPACEBOX</h1>
        <div className="request">
          <input type="text" placeholder="spotify:track:URI" name="uri" onChange={this.getUri} value={this.state.uri}/>
          <button name="button" onClick={this.handleSearch} disabled={this.state.disabled}>Add Song</button>
        </div>
        <section className="playlist">
          {this.state.songs.map((song, index) => {
            if (index < 3) {
              return (
              <div className={index === 0 ? "currently-playing" : "up-next"}>
                <img src={song.albumCover}/>
                <div className='song-info'>
                {index === 0 && <p>// Recently Playing</p>}
                <h2>{song.name}</h2>
                <h3>{song.artist}</h3>
                </div>
              </div>
              )
            }
            return (
              <li className ="queue" key={song.id}>{song.name}</li>
            )
          })}
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
