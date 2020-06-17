import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from '../../helpers/client';
import { SideBar } from '../SideBar/SideBar';
import { GetCurrentRoom } from '../GetCurrentRoom/GetCurrentRoom';
import { MessagePanel } from '../MessagePanel/MessagePanel';


import './App.css';

export  default function App() {
  return (
    <div className="row full-height">
      <ApolloProvider client={client}>
        <GetCurrentRoom>
          <SideBar />
          <MessagePanel />
        </GetCurrentRoom>
      </ApolloProvider>
    </div>
  );
}

// class App extends Component {

//   constructor() {
//     super();
//     this.state = {};
//   }

//   componentWillMount() {
//     this.state.username = null;
//     this.state.selectedRoom = 'general';
//   }

//   selectRoom(name) {
//     this.setState({ selectedRoom: name });
//   }

//   updateUsername(event) {
//     event.preventDefault();
//     this.setState({ username: event.target.username.value });
//   }

//   render() {
//     return (
//         <div className="row full-height">
//           {!this.state.username && <Modal updateUsername={this.updateUsername.bind(this)} />}
//           <Room 
//             selectRoom={this.selectRoom.bind(this)} 
//             selectedRoom={this.state.selectedRoom}
//           />
//           <Chat 
//             selectedRoom={this.state.selectedRoom}
//             username={this.state.username}
//           />
//         </div>
//     );
//   }
// }