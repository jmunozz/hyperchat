import React, { FunctionComponent, useContext } from 'react';

import { RoomContext } from '../../contexts/RoomContext';


export const RoomList: FunctionComponent<{}> = () => {
    
    const { rooms, setCurrentRoom, currentRoom } = useContext(RoomContext);    
    const currentRoomId = currentRoom ? currentRoom.id : undefined;
    
    return (
            <div className="row flex-grow-1">
                <ul className="w-100">
                {rooms.map((room) => {
                    return <li
                        key={room.id}
                        className={`text-nowrap overflow-hidden pl-2 ${currentRoomId === room.id  ? 'selected' : ''}`} 
                        onClick={() => {setCurrentRoom(room)}}>
                            {`# ${room.name}`}<span className="badge badge-secondary"></span>
                    </li>
                })}
                </ul>
            </div>
    );
}