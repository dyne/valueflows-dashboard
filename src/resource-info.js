import React, {PureComponent} from 'react';
import styled from 'styled-components'
import {Box, Text, Image} from 'rebass'

export default class CityInfo extends PureComponent {
  render() {
    const {info} = this.props;
    console.log(info)
    return (
      <Box>
        <Title>{info.name}</Title>
        <Description mt={2}>{info.description}</Description>
        <Infos p={2} mt={2}>Available quantity: {info.quantity + ' ' + info.unit}</Infos>
        <Image src={info.image} />
      </Box>
    )
  }
}

const Title = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
`
const Description = styled(Text)`

`
const Infos = styled(Box)`
  background: #dedede;
  border-radius: 4px;
  
`