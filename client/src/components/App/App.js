import React, { Component } from 'react';

import logo from '../../logo.svg';
import Room from '../Room/Room';
import Chat from '../Chat/Chat';
import Modal from '../Modal/Modal';
import fetchAll from '../../queries/fetchAll';

import './App.css';

const KEY_ENTER = 13;

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.state.username = null;
    this.state.selectedRoom = 'general';
  }

  selectRoom(name) {
    this.setState({ selectedRoom: name });
  }

  updateUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.username.value });
  }

  render() {
    return (
        <div className="row full-height">
          {!this.state.username && <Modal updateUsername={this.updateUsername.bind(this)} />}
          <Room 
            selectRoom={this.selectRoom.bind(this)} 
            selectedRoom={this.state.selectedRoom}
          />
          <Chat 
            selectedRoom={this.state.selectedRoom}
            username={this.state.username}
          />
        </div>
    );
  }
}

export default App;
