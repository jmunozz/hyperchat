import React, { Component } from 'react';
import { Query, Subscription } from 'react-apollo';
import { Mutation } from "react-apollo";

import fetchMessagesQuery from '../../queries/fetchMessages';
import postMessageMutation from '../../queries/postMessage';
import subscribeCreatedMessage  from '../../queries/subscribeCreatedMessage';
import { displayDate } from '../../helpers/commons';

import './Chat.css';


class Chat extends Component {

    render() {
        const selectedRoom = this.props.selectedRoom || ''
        return (
            <div className="col-md-9 full-height">
                <div class="h-10 row">
                    <div className="col-md-12" style={{fontWeight:'900', paddingTop:10, borderBottom: '1px solid whitesmoke'}}>{`#${selectedRoom}`}</div>
                </div>
                <div class="h-70 row">
                    <FetchMessages selectedRoom={this.props.selectedRoom} />
                </div>
                <div class="mh-20 row">
                    <AddMessage username={this.props.username} selectedRoom={this.props.selectedRoom} />
                </div>
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
        <div id="messagesbox" class="full-height">
            {
                this.props.messages.filter((message) => {
                    return message.room === this.props.selectedRoom;
                }).map((message) => {
                        return (
                            <div className="col-sm-12 msg" key={message.id}>
                                <div className="row">
                                    <div className='col-sm-auto d-inline align-text-bottom'>
                                        <span className='align-baseline' style={{fontWeight:'bold'}}>{message.username}</span>
                                        <span className='align-baseline' style={{fontSize:'0.9em', color:'lightgray', marginLeft: '10px' }}>{displayDate(message.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-sm content'>
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                            );
                        })
                    }
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
                    <div className="col-md-12 full-height">
                        <form class="full-height p-3">
                            <textarea 
                                style={{resize: 'none', outline: 'none' }}
                                disabled={!this.props.username || !this.props.selectedRoom}
                                autoFocus={!this.props.username || !this.props.selectedRoom}
                                placeholder='Écrivez votre message ici'
                                onKeyPress={(event) => {
                                    if (event.charCode === 13) {
                                        event.preventDefault();
                                        postMessage({ variables: {
                                            message: event.target.value, 
                                            username: this.props.username,
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