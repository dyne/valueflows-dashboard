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
import {Globe, MapPin} from 'react-feather'

const ALL_RESOURCES = gql`
  query allEconomicResources {
    allEconomicResources {
      name
      resourceQuantityHasNumericalValue
      resourceQuantityHasUnit
      currentLocation
      note
      conformsTo
    }
  }
`;

const URI = "http://localhost:8888/graphql";

const client = new ApolloClient({
  uri: URI,
  
});


function Home() {
  const { loading, error, data } = useQuery(ALL_RESOURCES, {fetchPolicy: 'no-cache'});
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
          <Flex p={2} alignItems="center">
            <Globe size="20" color="#fff" />
            <Text ml={2} fontWeight='bold'>ValueNetwork</Text>
          </Flex>
        <Box mx='auto' />
        <Nav exact activeClassName='active' to="/">
          Dashboard
        </Nav>
        <Nav activeClassName='active' to="/map">
          
          <MapPin size="20" color="#fff" />
          Map</Nav>
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
  display: flex;
  color: white;
  svg {
    margin-right: 8px;
  }
  &.active {
    color: #4dc19c;
    svg {
      stroke: "#4dc19c"
    }
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
