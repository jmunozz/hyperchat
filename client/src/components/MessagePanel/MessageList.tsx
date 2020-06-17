import React, { FunctionComponent, useRef, useEffect } from 'react';

import { Room, Message } from '../../interfaces';
import { displayDate } from '../../helpers/commons';
import { GetMessages } from './GetMessages';


interface MessageListProps {
    currentRoom: Room | undefined;
}

interface MessageListListProps {
    messages: Message[];
}

export const MessagesListList: FunctionComponent<MessageListListProps> = ({ messages }) => {
    
    
    const bottomRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef!.current!.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ messages]);
    
    return (
        <ul className="w-100 m-2">
        { messages.map((message) => {
            return (
                <li className="msg" key={message.id}>
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
                </li>
                );
            })
        }
        <li ref={bottomRef}></li>
    </ul>
    )
}



export const MessageList: FunctionComponent<MessageListProps> = ({ currentRoom }) => {
    
    if (!currentRoom) {
        return (
            <React.Fragment>
            <div className="row">
                <div className="col p-2 mt-2 font-weight-bold border-bottom">
                    {`# select a room`}
                </div>
            </div>
            <div className="row flex-grow-1 overflow-auto">
                <MessagesListList messages={[]} />
            </div>
         </React.Fragment>
        );
    }


    return (
        <GetMessages currentRoom={currentRoom}>
            {(messages: Message[]) => (
                <React.Fragment>
                    <div className="row">
                        <div className="col p-2 mt-2 font-weight-bold border-bottom">
                            {`# ${currentRoom.name}`}
                        </div>
                    </div>
                    <div className="row flex-grow-1 overflow-auto">
                        <MessagesListList messages={messages} />
                    </div>
                </React.Fragment>
            )}
        </GetMessages>
    );
}