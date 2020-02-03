import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Distributed inventories</h3>
        <p>
          This demo shows how a p2p inventory management system can facilitate the exchange of materials among a network
        </p>
      </Container>
    );
  }
}