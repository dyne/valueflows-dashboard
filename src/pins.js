import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {
  render() {
    const {data, onClick} = this.props;
    const pins = data
                  .filter((resource) => (resource.currentLocation !== null))
                  .map((resource) => {
                    const location = resource.currentLocation.split(",")
                    return ({
                      longitude: Number(location[1]),
                      latitude: Number(location[0]),
                      name: resource.name,
                      quantity: resource.resourceQuantityHasNumericalValue,
                      unit: resource.resourceQuantityHasUnit,
                      note: resource.note,
                      tags: resource.conformsTo
                    })
                  })
    return pins
    .filter(pin => pin.quantity > 0)
    .map((resource, index) => 
      <Marker key={`marker-${index}`} longitude={resource.longitude} latitude={resource.latitude}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          onClick={() => onClick(resource)}
        >
          <path d={ICON} />
        </svg>
      </Marker>)
  }
}

export class IntentPins extends PureComponent {
  render() {
    const {data, onClick} = this.props;
    const pins = data
                  .filter((intent) => (intent.atLocation !== null))
                  .map((intent) => {
                    const location = intent.atLocation.split(",")
                    return ({
                      longitude: Number(location[1]),
                      latitude: Number(location[0]),
                      note: intent.description,
                      tags: intent.conformsTo
                    })
                  })
    return pins
    .map((intent, index) => 
      <Marker key={`marker-${index}`} longitude={intent.longitude} latitude={intent.latitude}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#4381d3',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          onClick={() => onClick(intent)}
        >
          <path d={ICON} />
        </svg>
      </Marker>)
  }
}