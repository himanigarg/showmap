import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Icon } from "antd";
import axios from "axios";
import SimpleMap from "./components/SimpleMap";
import "./App.css";

class App extends Component {
  state = {
    sourcekey: [],
    destinationkey: [],
    locations: [],
    source: {
      lat: 50.902,
      long: 4.689
    },
    destination: {
      lat: 50.902,
      long: 4.689
    }
  };
  componentDidMount() {
    return axios
      .get("http://www.mocky.io/v2/5dd6bb533200009d5a888ced")
      .then(locationsResponse => {
        this.setState({
          locations: locationsResponse.data.Locations
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const onSourceClick = ({ key }) => {
      this.setState({
        source: {
          lat: this.state.locations[key].lat,
          long: this.state.locations[key].long
        },
        sourcekey: [key]
      });
    };
    const onDestinationClick = ({ key }) => {
      this.setState({
        destination: {
          lat: this.state.locations[key].lat,
          long: this.state.locations[key].long
        },
        destinationkey: [key]
      });
    };

    const sourceMenu = (
      <Menu selectedKeys={this.state.sourcekey} onClick={onSourceClick}>
        {this.state.locations.map((e, index) => (
          <Menu.Item key={index}>{e.name}</Menu.Item>
        ))}
      </Menu>
    );
    const destinationMenu = (
      <Menu
        selectedKeys={this.state.destinationkey}
        onClick={onDestinationClick}
      >
        {this.state.locations.map((e, index) => (
          <Menu.Item key={index}>{e.name}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Dropdown overlay={sourceMenu}>
          <span style={{ marginRight: "20px", fontSize: "18px" }}>
            {this.state.sourcekey.length === 0
              ? "Select source"
              : this.state.locations[this.state.sourcekey].name}
            <Icon type="down" />
          </span>
        </Dropdown>
        <Dropdown overlay={destinationMenu}>
          <span style={{ marginRight: "20px", fontSize: "18px" }}>
            {this.state.destinationkey.length === 0
              ? "Select Destination"
              : this.state.locations[this.state.destinationkey].name}
            <Icon type="down" />
          </span>
        </Dropdown>
        <SimpleMap
          style={{ marginTop: "20px" }}
          destinationAnchor={[
            parseFloat(this.state.destination.lat),
            parseFloat(this.state.destination.long)
          ]}
          sourceAnchor={[
            parseFloat(this.state.source.lat),
            parseFloat(this.state.source.long)
          ]}
        />
      </div>
    );
  }
}

export default App;
