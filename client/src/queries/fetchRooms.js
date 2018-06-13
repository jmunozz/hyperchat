import { Query } from "react-apollo";
import gql from "graphql-tag";

export default gql`
{
  rooms {
    name
    messages
  }
}`;