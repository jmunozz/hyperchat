import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
{
  messages {
    id
    username
    message
    room
    createdAt
  }
}`;