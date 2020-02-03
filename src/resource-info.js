import React, {PureComponent} from 'react';
import styled from 'styled-components'
import {Box, Text, Image} from 'rebass'

export default class CityInfo extends PureComponent {
  render() {
    const {info} = this.props;
    console.log(info)
    return (
      <Box>
        <Title>{info.quantity + ' ' + info.unit + ' of ' + info.name}</Title>
        <Description mt={2}>{info.description}</Description>
        {/* <Infos p={2} mt={3}>Amount: </Infos> */}
        <Text sx={{fontWeight: 200}} mt={2}>{info.note}</Text>
        <Image src={info.image} />
        {info.tags && 
        <Box mt={2}>
          {info.tags
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
        </Box>
        }
      </Box>
    )
  }
}

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
`
const Description = styled(Text)`

`
