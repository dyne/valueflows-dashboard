import React, {PureComponent} from 'react';
import { Image, Box } from 'rebass';
import Cafudda from './cafudda.jpg'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  > div {
    max-width: 180px !important;
    padding: 8px !important;
  }
  h3 {
    font-size: 12px;
    margin: 0;
  }
  p {
    text-transform: lowercase;
    line-height: 18px;
    margin-top: 4px;
    margin-bottom: 0;
  }
  a {
    color: #267e63;
    font-size: 14px;
    font-weight: 700;
  }
`


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Wrapper>
      <Container>
        <Image sx={{width: "180px"}} src={Cafudda}/>
        <h3>Distributed inventories</h3>
        <p>
          This demo shows how a p2p inventory management system can facilitate the exchange of materials among a network
        </p>
        <a href="https://github.com/dyne/valueflows" target="blank">code</a>
      </Container>
      </Wrapper>
    );
  }
}