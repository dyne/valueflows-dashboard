import React, {Component} from 'react';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import ControlPanel from './control-panel';
import Pins from './pins';
import ResourceInfo from './resource-info';

const TOKEN = 'pk.eyJ1IjoiYmVybmluaSIsImEiOiJjazYyMHc5OTUwNDBlM2tuNnR0N2VrY3luIn0.gYMbW8z_4rjh-gYu4uEojA'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 52.3545362,
        longitude: 4.7638776,
        zoom: 10,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <ResourceInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;
    return (
   
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={TOKEN}
      >
        <Pins data={this.props.data.allEconomicResources} onClick={(resource) => this.setState({ popupInfo: resource })} />

        {this._renderPopup()}

        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
      
    )
  }
}
