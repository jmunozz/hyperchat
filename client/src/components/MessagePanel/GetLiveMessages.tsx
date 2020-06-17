import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import {  useSubscription } from '@apollo/react-hooks';

import { Room, Message } from '../../interfaces';

const SUBSCRIBE_MESSAGE_CREATED = gql`
    subscription messageCreated($roomId: Int!) {
        messageCreated(roomId: $roomId) {
            id
            message
            username
            createdAt
        }
}`;

interface GetLiveMessagesProps {
    currentRoom: Room;
    messages: Message[];
    children: (msg: Message[]) => any;
}

interface MessageCreatedSubscriptionData {
    messageCreated: Message;
}

interface MessageCreatedSubscriptionVars {
    roomId: number;
}


export const GetLiveMessages: FunctionComponent<GetLiveMessagesProps> = ({ messages, children, currentRoom }) => {
    
    const [ liveMessages, setLiveMessages ] = useState<Message[]>(messages);
    const [ lastMessageReceived, setLastMessageReceived ] = useState<Message | undefined>();
 
    const { data, loading } = useSubscription<MessageCreatedSubscriptionData, MessageCreatedSubscriptionVars>(
        SUBSCRIBE_MESSAGE_CREATED,
        { variables: { roomId: currentRoom.id } }
    );

    if ((data && !lastMessageReceived) || (data && lastMessageReceived!.id !== data.messageCreated.id)) {
        setLastMessageReceived(data.messageCreated)
        setLiveMessages([...liveMessages, data.messageCreated])
    }

    return children(liveMessages);
}