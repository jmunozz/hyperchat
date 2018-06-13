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
    this.state.userHash = null;
    this.state.selectedRoom = 'general';
  }

  selectRoom(name) {
    this.setState({ selectedRoom: name });
  }

  updateUserHash(event) {
    event.preventDefault();
    this.setState({ userHash: event.target.userHash.value });
  }

  render() {
    return (
        <div className="App col-md-12">
          {!this.state.userHash && <Modal updateUserHash={this.updateUserHash.bind(this)} />}
          <Room 
            selectRoom={this.selectRoom.bind(this)} 
            selectedRoom={this.state.selectedRoom}
          />
          <Chat 
            selectedRoom={this.state.selectedRoom}
            userHash={this.state.userHash}
          />
        </div>
    );
  }
}

export default App;
