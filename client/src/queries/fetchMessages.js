import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
{
  messages {
    id
    message
    room
    createdAt
  }
}`;