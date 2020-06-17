import React, { FunctionComponent, useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Room, Message } from '../../interfaces';
import { displayDate } from '../../helpers/commons';


const ENTER_KEY_EVENT = 13;

const CREATE_MESSAGE = gql`
    mutation createMessage($input: MessageInput) {
        createMessage(input: $input) {
            id
            message
            username
            createdAt
        }
}`;

interface AddMessageBoxProps {
    currentRoom: Room | undefined;
}

interface CreateMessageInputVars {
    message: string;
    username: string;
    roomId: number;
}

interface GetRoomMessagesQueryData {
    messages: Message[];
}

export const AddMessageBox: FunctionComponent<AddMessageBoxProps> = ({ currentRoom }) => {
    let input: any;
    const [mutate, { data }] = useMutation<any, { input: CreateMessageInputVars }>(CREATE_MESSAGE);

    const username = 'default';

    const handleKeyPress = async (e: any) => {
        if (e.charCode === ENTER_KEY_EVENT) {
            e.preventDefault();
            const message = e.target.value;
            e.target.value = '';
            await mutate({ variables: { input: { message, username, roomId: currentRoom!.id } }});
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-11  p-2 mb-2">
                <form>
                    <textarea 
                        readOnly={!currentRoom}
                        ref={node => { input = node; }}
                        style={{resize: 'none', outline: 'none' }}
                        autoFocus={true}
                        placeholder='write your message here.'
                        onKeyPress={handleKeyPress}>
                    </textarea>
                </form>
            </div>
        </div>
    );
}