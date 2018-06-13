import React, { Component } from 'react';
import { Query, Subscription } from 'react-apollo';
import { Mutation } from "react-apollo";

import fetchMessagesQuery from '../../queries/fetchMessages';
import postMessageMutation from '../../queries/postMessage';
import subscribeCreatedMessage  from '../../queries/subscribeCreatedMessage';

import './Chat.css';


class Chat extends Component {

    render() {
        const selectedRoom = this.props.selectedRoom || ''
        return (
            <div className="col-md-9 contentbox">
                <div className="col-md-12">{`Room: #${selectedRoom}`}</div>
                <FetchMessages selectedRoom={this.props.selectedRoom} />
                <AddMessage userHash={this.props.userHash} selectedRoom={this.props.selectedRoom} />
            </div>
        );
    }
}

/**
 * Get All Messages and pass them as props to children.
 */
class FetchMessages extends React.Component {
    
    render() {
        return (
            <Query query={fetchMessagesQuery} >
                {({ loading, error, data }) => {
                    if (loading)
                        return <p>Loading...</p>;
                    else if (error) 
                        return <p>Error :(</p>;
                    else {
                        const { messages } = data;
                        return <MessageCreated 
                            messages={messages}
                            selectedRoom={this.props.selectedRoom}
                        />
                    }
                    
                }}
            </Query>
        )
    }
}

/**
 * Subscribe to new message and add them to messages list.
 */
class MessageCreated extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            refresh: false,
        }
    }

    render() {
        return (
            <Subscription subscription={subscribeCreatedMessage} shouldResubscribe={false} >
                {({data, loading, error}) => {
                    if (data && !this.state.refresh) {
                        const { messageCreated } = data;
                        this.state.messages = [...this.state.messages, messageCreated]
                        return <MessagesDisplay 
                            messages={this.state.messages}
                            selectedRoom={this.props.selectedRoom} />
                    }
                    else {
                        this.state.refresh = false;
                        return <MessagesDisplay 
                            messages={this.state.messages} 
                            selectedRoom={this.props.selectedRoom} />
                    }
                }}
            </Subscription>
        )
    }

    componentWillUpdate() {
        // Skip messages concatenation if it is a component update.
        this.state.refresh = true
    }
}
/**
 * Display messages list from props.
 */
class MessagesDisplay extends React.Component {
    render() {
        return (
            <div id="messagesbox" className='col-md-12 messagesbox'>
                <ul>
                    {this.props.messages.filter((message) => {
                        return message.room === this.props.selectedRoom;
                    }).map((message) => {
                        return <li key={message.id}>{message.message}<span>{message.createdAt}</span></li>
                    })}
                </ul>
            </div>
        )
    }

    componentDidUpdate() {
        // Scroll down message box.
        const messagesbox = document.getElementById('messagesbox');
        messagesbox.scrollTop = messagesbox.scrollHeight;
    }
}

/**
 * Appollo Mutation React Component for posting Message.
 */
class AddMessage extends React.Component {
    render() {
        return (
            <Mutation mutation={postMessageMutation}>
                {(postMessage, { data }) => (
                    <div className="col-md-12 chatbox">
                        <form>
                            <label style={{display:'block', textAlign: 'center'}}>
                                Ecrivez votre message ici...
                            </label>
                            <textarea 
                                disabled={!this.props.userHash || !this.props.selectedRoom}
                                autoFocus={!this.props.userHash || !this.props.selectedRoom}
                                onKeyPress={(event) => {
                                    if (event.charCode === 13) {
                                        event.preventDefault();
                                        postMessage({ variables: {
                                            message: event.target.value, 
                                            userHash: this.props.userHash,
                                            room: this.props.selectedRoom,
                                        }});
                                        event.target.value = '';
                                    }
                                }}>
                            </textarea>
                        </form>
                     </div>

                )}
            </Mutation>
        )
    }
}

export default Chat;