import gql from "graphql-tag";

export default gql`
subscription  {
    messageCreated {
        id
        message
        username
        room
        createdAt
    }
}`;