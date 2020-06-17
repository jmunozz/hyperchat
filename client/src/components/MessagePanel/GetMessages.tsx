import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Room, Message } from '../../interfaces';
import { GetLiveMessages } from './GetLiveMessages';


const GET_ROOM_MESSAGES = gql`
  query messages($roomId: Int!) {
    messages(roomId: $roomId) {
        id
        username
        message
        createdAt
    }
  }
`;

interface GetMessagesProps {
    currentRoom: Room;
    children: (msg: Message[]) => any;
}

interface GetRoomMessagesQueryVars {
    roomId: number;
}

interface GetRoomMessagesQueryData {
    messages: Message[];
}

export const GetMessages: FunctionComponent<GetMessagesProps> = ({ children, currentRoom }) => {
    
    const { loading, error, data } = useQuery<GetRoomMessagesQueryData, GetRoomMessagesQueryVars>(GET_ROOM_MESSAGES, {
        variables: { roomId: currentRoom.id },
        fetchPolicy: 'no-cache',
    });

    if (loading || !data) {
        return <div>get messages for room {currentRoom.name}...</div>
    }


    return (
        <GetLiveMessages currentRoom={currentRoom} messages={data.messages} children={children} />
    );
}