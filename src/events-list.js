import React from 'react';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import {Box, Text, Image, Flex} from 'rebass'
import styled from 'styled-components'

const ALL_EVENTS = gql`
  query allEconomicEvents {
    allEconomicEvents {
      action
      resourceDescription
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
      resourceConformsTo
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
              <Flex sx={{
                borderBottom: "1px solid #dadada",
              }} 
              p={3} 
              mb={2}
              key={i}>
                <Image
                  src='https://picsum.photos/id/1025/130/130'
                  variant='avatar'
                  mr={3}
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",}}
                />
                <Box>
                  <Flex mb={1}>
                    <Text sx={{fontWeight: 700, marginRight: "4px"}} >Jo Freeman</Text>
                    <Text>{' ' + item.action + ' '}
                    {item.resourceQuantityHasNumericalValue + ' '}
                    {item.resourceQuantityHasUnit} 
                    {item.action !== "work" &&
                     <span>{' of '}
                    {item.action === 'transfer' ? 
                    item.toResourceInventoriedAs.name
                    : item.resourceInventoriedAs.name}
                    </span>
                    }
                    </Text>
                  </Flex>
                  <Note>{item.resourceDescription || item.note}</Note>
                  {item.resourceConformsTo && 
                  <TagsList mt={2}>{item.resourceConformsTo
                    .split(",")
                    .map((tag, i) => (<Box
                      key={i}
                      mr={1}
                      sx={{
                        display: 'inline-block',
                        color: 'white',
                        bg: '#9f75cf',
                        px: 2,
                        py: 1,
                        fontSize: "14px",
                        borderRadius: 9999,
                      }}>
                      #{tag}
                    </Box>))}
                  </TagsList>
                  }
                </Box>
              </Flex>
            ))
          )
    
}

const TagsList = styled(Box)`
`
const Note = styled(Text)`
color: #2e2e2e;
font-weight: 300;
`