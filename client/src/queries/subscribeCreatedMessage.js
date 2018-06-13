import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
subscription  {
    messageCreated {
        id
        message
        userHash
        room
        createdAt
    }
}`;