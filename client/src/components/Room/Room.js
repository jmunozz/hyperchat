import React, { Component } from 'react';
import { Query } from 'react-apollo';
import fetchRoomsQuery from '../../queries/fetchRooms';

import './Room.css';

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        }
    }

    setRooms(rooms) {
        const newRooms = [...this.state.rooms, ...rooms];
        console.log(newRooms);
        this.setState({
            rooms: newRooms
        })
    }

    addRoom(event) {
        event.preventDefault();
        const room = event.target.room.value;
        event.target.room.value = '';
        this.setRooms([{name:room, messages:0}])
        this.props.selectRoom(room);
    }

    render() {
      return (
        <div className="col-md-3 roomsbox">
            <div className="col-md-12"> Rooms </div>
                <FetchRooms 
                    rooms={this.state.rooms}
                    selectedRoom={this.props.selectedRoom}
                    selectRoom={this.props.selectRoom}
                    setRooms={this.setRooms.bind(this)}
                />
            <div className='addroombox'>
                <form onSubmit={this.addRoom.bind(this)} className="input-group">
                    <input type="text" name="room" className="form-control" placeholder="Room's name"/>
                    <div class="input-group-append">
                        <button type="submit" className="btn btn-outline-secondary">Add</button>
                    </div>
                </form>
            </div>
        </div>
      );
    }
}

class FetchRooms extends React.Component {

    render() {
        const isRoomsLoaded = this.props.rooms.length;
        if (!isRoomsLoaded) {
            return (
                <Query query={fetchRoomsQuery} >
                    {({ loading, error, data }) => {
                        if (loading)
                            return <p>Loading...</p>;
                        else if (error) {
                            return <p>Error </p>;
                        }
                        else {
                            let { rooms } = data;
                            // Add General if not present.
                            if (!rooms.find(room => room.name === 'general')) {
                                rooms = [{name: 'general', messages: 0}, ...rooms];
                            }
                            this.props.setRooms(rooms);
                            // Save rooms in state.
                            return <div></div>;
                        }
                    }}
                </Query>
            )
        } else {
            return <RoomsDisplay
            rooms={this.props.rooms}
            selectedRoom={this.props.selectedRoom}
            selectRoom={this.props.selectRoom} />
        }
    }
}

class RoomsDisplay extends React.Component {
    render() {
        return (
            <ul>
                {this.props.rooms.map((room) => {
                    return <li 
                        className={this.props.selectedRoom === room.name  ? 'selected' : ''} 
                        onClick={() => {this.props.selectRoom(room.name)}}>
                            {`#${room.name}`}<span className="badge badge-secondary">{room.messages}</span>
                    </li>
                })}
            </ul>
        )
    }
}

export default Room;