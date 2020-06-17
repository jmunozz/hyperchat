import React from 'react';

import { RoomContextData } from '../interfaces';

export const RoomContext = React.createContext<RoomContextData>({
    rooms: [],
    currentRoom: undefined,
    setCurrentRoom: () => {},
    isGettingRooms: false,
    refetchRooms: () => {},
});