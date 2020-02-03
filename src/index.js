import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components'
import {Box, Text, Flex} from 'rebass'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Map from './map'
import Dashboard from './dashboard'
import "./index.css";
import gql from "graphql-tag";


const ALL_RESOURCES = gql`
  query allEconomicResources {
    allEconomicResources {
      name
      resourceQuantityHasNumericalValue
      resourceQuantityHasUnit
      currentLocation
    }
  }
`;

const URI = "http://localhost:8888/graphql";

const client = new ApolloClient({
  uri: URI
});


function Home() {
  const { loading, error, data } = useQuery(ALL_RESOURCES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Switch>
      <Route exact path="/map">
        <div id="map">
          <Map data={data} />
        </div>
      </Route>
      <Route exact path="/">
        <Dashboard data={data} />
      </Route>
    </Switch>
  )
}



const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Header
        px={2}
        color='white'
        alignItems='center'>
        <Text p={2} fontWeight='bold'>VF::Demo</Text>
        <Box mx='auto' />
        <Nav exact activeClassName='active' to="/">
          Dashboard
        </Nav>
        <Nav activeClassName='active' to="/map">Map</Nav>
      </Header>
      <Home />
    </Router>
  </ApolloProvider>
);

const Header = styled(Flex)`
  height: 60px;
  background: #267e63;

`
const Nav = styled(NavLink)`
  color: white;
  font-weight: 800;
  text-decoration: none;
  margin-right: 32px;
  position: relative;
  color: white;
  &.active {
    color: #4dc19c;
    :before {
      position: absolute;
      content: "";
      left: 0;
      width: 100%;
      top: -22px;
      height: 4px;
      background: #4dc19c;;
      display: block;
    }
  }
`

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
