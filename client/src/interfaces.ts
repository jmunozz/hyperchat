import { Dispatch } from 'react';

export interface Message {
    id: string;
    username: string;
    message: string;
    room: string;
    createdAt: Date;
}

export interface Room {
    id: number;
    name: string;
    createdAt: Date;
}

export interface RoomContextData {
    rooms: Room[];
    isGettingRooms: boolean;
    currentRoom: Room | undefined;
    setCurrentRoom: Dispatch<Room>;
    refetchRooms: () => any;
}