import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import { AUTH_TOKEN } from "./constants";
import App from "./App";
import { setInitData } from "./baseComponents/store/actions";

import gql from "graphql-tag";
import { useDispatch } from "react-redux";

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int) {
    links(first: $first, skip: $skip) {
      url
      description
    }
  }
`;

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={FEED_QUERY}>
      {(props) => {
        console.log("props", props);
        return <App {...props} />;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);
