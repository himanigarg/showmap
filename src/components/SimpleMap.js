import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import AntPath from "react-leaflet-ant-path";



class Map extends React.Component {
  render() {
    return (
      <LeafletMap
        center={[50, 10]}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <AntPath positions={[this.props.sourceAnchor,this.props.destinationAnchor]} />
        <Marker position={this.props.sourceAnchor}>
          <Popup>Source information.</Popup>
        </Marker>
        <Marker position={this.props.destinationAnchor}>
          <Popup>Destination information.</Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;
