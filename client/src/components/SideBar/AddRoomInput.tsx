import React, { FunctionComponent, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RoomContext } from '../../contexts/RoomContext';


const CREATE_ROOM = gql`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
      createdAt
    }
  }
`;

interface CreatRoomMutationVars {
    name: string;
}

export const AddRoomInput: FunctionComponent<{}> = () => {
    
    let input: any;
    const { refetchRooms } = useContext(RoomContext);    
    const [mutate, { data }] = useMutation<CreatRoomMutationVars>(CREATE_ROOM);

    const createRoom = async (e: any) => {
        e.preventDefault();
        const name = input.value;
        input.value = '';
        await mutate({ variables: { name }});
        refetchRooms();
    }
    
    return (
      <div className="row">
        <div className="p-2 mb-2 col-12">
          <form onSubmit={(e) => createRoom(e)} className="input-group">
              <input ref={node => { input = node }} type="text" name="room" className="form-control" placeholder="Room's name"/>
              <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">Add</button>
              </div>
          </form>
        </div>
      </div>
    );
}
