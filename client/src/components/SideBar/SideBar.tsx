import React, { FunctionComponent, useContext } from 'react';

import { AddRoomInput } from './AddRoomInput';
import { RoomList } from './RoomList';

import './SideBar.css';

export const SideBar: FunctionComponent<{}> = () => {
    
    return (
        <div className="col-md-3 d-flex flex-column bg-primary text-light h-100">
            <div className="row">
                <div className="col-md-12 p-2 mt-2 font-weight-bold">
                    Rooms
                </div>
            </div>
            <RoomList />
            <AddRoomInput />
        </div>
    );
}