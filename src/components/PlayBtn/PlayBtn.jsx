import React, { Component } from 'react';
import togglePlay from './PlayBtnActions'

export default class PlayBtn extends Component {
  constructor(props) {
    super(props);

    this.togglePlay = this.togglePlay.bind(this);
  }

  render() {
    return (
      <div id='play-btn' className='btn' onClick={this.togglePlay}>
      </div>
    )
  }
}
