import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
mutation createMessage($message: String!, $userHash: String!, $room: String!) {
    createMessage(message: $message, userHash: $userHash, room: $room) {
        id
        message
        room
        userHash
        createdAt
    }
}`;