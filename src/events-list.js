import React from 'react';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import {Box, Text} from 'rebass'
import styled from 'styled-components'

const ALL_EVENTS = gql`
  query allEconomicEvents {
    allEconomicEvents {
      action
      note
      resourceInventoriedAs {
        name
      }
      toResourceInventoriedAs {
        name
      }
      resourceQuantityHasNumericalValue
      resourceQuantityHasUnit
      currentLocation
    }
  }
`;


export const EventsList = () => {
  const { loading, error, data } = useQuery(ALL_EVENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
            data.allEconomicEvents
            .reverse()
            .map((item, i) => (
              <Box sx={{
                borderRadius: "4px",
                border: "1px solid #dadada",
              }} 
              p={3} 
              mb={2}
              key={i}>
                <Text>{item.action + ' '}
                {item.resourceQuantityHasNumericalValue + ' '}
                {item.resourceQuantityHasUnit} of {' '}
                {item.action === 'transfer' ? 
                item.toResourceInventoriedAs.name
                : item.resourceInventoriedAs.name}
                </Text>
                <Note>{item.note}</Note>
              </Box>
            ))
          )
    
}

const Note = styled(Text)``