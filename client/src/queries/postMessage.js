import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
mutation createMessage($message: String!, $username: String!, $room: String!) {
    createMessage(message: $message, username: $username, room: $room) {
        id
        message
        room
        username
        createdAt
    }
}`;