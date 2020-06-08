import { Query } from "react-apollo";
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