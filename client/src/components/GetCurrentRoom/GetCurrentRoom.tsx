import React, { useState, FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Room, RoomContextData } from '../../interfaces';
import { RoomContext } from '../../contexts/RoomContext';

const GET_ROOMS = gql`
{
  rooms {
    id
    name
  }
}`;

interface RoomData {
    rooms: Room[];
}

export const GetCurrentRoom: FunctionComponent<{}> = ({ children }) => {
    
    const { loading, error, data, refetch } = useQuery<RoomData>(GET_ROOMS);
    const [ currentRoom, setCurrentRoom ] = useState<Room | undefined>(undefined);

    const context: RoomContextData = {
        rooms: data ? data.rooms : [],
        isGettingRooms: loading,
        currentRoom,
        setCurrentRoom,
        refetchRooms: refetch,
    };
    console.log(context);

    return (
        <RoomContext.Provider value={context}>
            {children}
        </RoomContext.Provider>
    )
}
