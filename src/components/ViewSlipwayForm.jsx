import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

const INITIAL_STATE = {
  slipwayDetail: {
    slipwayName: ""
  },
  latLngArray: ["", ""]
};

class NewSlipwayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.state.slipwayDetails !== this.state.slipwayDetails
    ) {
      this.setState({
        slipwayDetail: nextProps.state.slipwayDetails[this.props.state.id],
        latLngArray: nextProps.state.latLngArray,
        editUrl : '/edit-slipway/' + nextProps.state.latLngArray[2]
      });
    }
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Slipway Name: {this.state.slipwayDetail.Name}</CardTitle>

          <a href ={this.state.editUrl} >Edit</a>

          <p> Latitude: {this.state.latLngArray[0]} </p>
          <p> Longitude: {this.state.latLngArray[1]} </p>

          <p> Description: {this.state.slipwayDetail.Description} </p>
          <p> Directions: {this.state.slipwayDetail.Directions} </p>
          <p> Facilities: {this.state.slipwayDetail.Facilities} </p>
          <p> Navigational Hazards: {this.state.slipwayDetail.NavigationalHazards} </p>
          <p> Charges: {this.state.slipwayDetail.Charges} </p>
          <p> Ramp Type: {this.state.slipwayDetail.RampType} </p>
          <p> Suitability: {this.state.slipwayDetail.Suitability} </p>
          <p> Ramp Length: {this.state.slipwayDetail.RampLength} </p>
          <p> Upper Area: {this.state.slipwayDetail.UpperArea} </p>
          <p> Lower Area: {this.state.slipwayDetail.LowerArea} </p>
          <p> Phone Number: {this.state.slipwayDetail.PhoneNumber} </p>
          <p> Email: {this.state.slipwayDetail.Email} </p>
        
        </CardBody>
      </Card>
    );
  }
}

export default NewSlipwayForm;
