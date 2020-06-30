import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import ripple from "../Ripple-2.5s-200px(Red).svg";
import Joi from "joi";
import { updateSlipwayDetails, updateLatLng } from "../firebase/database";

const schema = Joi.object().keys({
  Name: Joi.string()
    .min(3)
    .max(100)
    .required()
});

const INITIAL_STATE = {
    slipwayDetail: {},
    latLngArray: ["", ""],
    activeIndex: 0,
    activeTab: "1",
    imgs: []
};

class EditSlipwayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.state.slipwayDetails !== this.state.slipwayDetails ) {

      this.setState({
        slipwayDetail: nextProps.state.slipwayDetails[this.props.state.id],
        latLngArray: nextProps.state.latLngArray,
        zoom: 12,
        loadingInfo: false
      });
    } else if (nextProps.editedLatLng !== this.props.editedLatLng) {
      this.setState({
        editedLatLng: nextProps.editedLatLng
      });
    }
  }

  formIsValid() {
    const slipway = {
      Name: this.state.slipwayDetail.Name,
    };
    const result = Joi.validate(slipway, schema);
    return !result.error;
  }

  formSubmitted = event => {

    event.preventDefault();

    if (this.formIsValid()) {
      this.setState({
        sendingMessage: true,
        loadingInfo: true
      });

      const updatedSlipwayDetails = {
        Name: this.state.slipwayDetail.Name || null,
        Suitability: this.state.slipwayDetail.Suitability|| null,
        idKey: this.state.slipwayDetail.idKey || null,
        Charges: this.state.slipwayDetail.Charges || null,
        Directions: this.state.slipwayDetail.Directions || null,
        Facilities: this.state.slipwayDetail.Facilities || null,
        LowerArea: this.state.slipwayDetail.LowerArea || null,
        NavigationalHazards: this.state.slipwayDetail.NavigationalHazards || null,
        NearestPlace: this.state.slipwayDetail.NearestPlace || null,
        RampDescription: this.state.slipwayDetail.RampDescription || null,
        RampLength: this.state.slipwayDetail.RampLength || null,
        RampType: this.state.slipwayDetail.RampType || null,
        UpperArea: this.state.slipwayDetail.UpperArea || null,
        Website: this.state.slipwayDetail.Website || null,
        Email: this.state.slipwayDetail.Email || null,
        PhoneNumber: this.state.slipwayDetail.PhoneNumber || null,
      };


      const updatedLatLng = {
        idKey: this.state.slipwayDetail.idKey || null,
        lat: this.props.editedLatLng[0] || this.state.latLngArray[0],
        lng: this.props.editedLatLng[1] || this.state.latLngArray[1]
      }


      updateSlipwayDetails(updatedSlipwayDetails, (x, err) => {
        updateLatLng(updatedLatLng, (x, err) => {

          this.setState({
            sendingMessage: false,
            loadingInfo: false
          });

        })
      })
    }
  };

  valueChanged = event => {
    const { name, value } = event.target;

    this.setState(prevState => {
      return {
        slipwayDetail: {
          ...prevState.slipwayDetail,
          [name]: value
        }
      };
    });
  };

  render() {
    return (
      <Card>
        <CardBody>
          {this.state.slipwayDetail.idKey ? <a href={`/view-slipway/`+ this.state.slipwayDetail.idKey}>
            <Button color="info" className="form-bottom-margin">
              Back
            </Button>
          </a> : ""}
          <CardTitle><b>Edit slipway</b></CardTitle>
          <Form onSubmit={this.formSubmitted}>
            <FormGroup>
              <Label for="name">Slipway Name</Label>
              <Input
                type="text"
                name="Name"
                id="name"
                placeholder=""
                value={this.state.slipwayDetail.Name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude (click on map to edit)</Label>
              <Input
                type="text"
                name="Latitude"
                id="latitude"
                placeholder="click on map"
                disabled
                value={this.props.editedLatLng[0] || this.state.latLngArray[0]}
              />
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude (click on map to edit)</Label>
              <Input
                type="text"
                name="Longitude"
                id="longitude"
                placeholder="click on map"
                disabled
                onChange={this.lngChanged}
                value={this.props.editedLatLng[1] || this.state.latLngArray[1]}
              />
            </FormGroup>
            <Button
              onClick={this.props.resetPin}
            >
              Revert pin location
            </Button>
            <br/>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="RampDescription"
                id="description"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.RampDescription}
                rows="3"
              />
            </FormGroup>
            <FormGroup>
              <Label for="directions">Directions</Label>
              <Input
                type="textarea"
                name="Directions"
                id="directions"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Directions}
              />
            </FormGroup>
            <FormGroup>
              <Label for="facilities">Facilities</Label>
              <Input
                type="textarea"
                name="Facilities"
                id="facilities"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Facilities}
              />
            </FormGroup>
            <FormGroup>
              <Label for="navigational-hazards">Navigational Hazards</Label>
              <Input
                type="text"
                name="Navigational-hazards"
                id="navigational-hazards"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.NavigationalHazards}
              />
            </FormGroup>
            <FormGroup>
              <Label for="charges">Charges</Label>
              <Input
                type="text"
                name="Charges"
                id="charges"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Charges}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ramp-type">Ramp Type</Label>
              <Input
                type="text"
                name="RampType"
                id="ramp-type"
                placeholder="eg Concrete"
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.RampType}
              />
            </FormGroup>
            <FormGroup>
              <Label for="suitability">Select Suitability</Label>
              <Input
                type="select"
                name="Suitability"
                id="suitability"
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Suitability}
              >
                <option value="Unkown">Unkown</option>
                <option value="Portable Only">Portable Only</option>
                <option value="Small trailer can be pushed">Small trailer can be pushed</option>
                <option value="Large trailer needs a car">Large trailer needs a car</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="ramp-length">Ramp Length</Label>
              <Input
                type="select"
                name="RampLength"
                id="ramp-length"
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.RampLength}
              >
                <option value="Unknown">Unkown</option>
                <option value="No Ramp">No Ramp</option>
                <option value="1/4 tidal">1/4 tidal</option>
                <option value="1/2 tidal">1/2 tidal</option>
                <option value="3/4 tidal">3/4 tidal</option>
                <option value="All of tidal range">All of tidal range</option>
                <option value="Non-tidal">Non-tidal</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="upper-area">Upper Area</Label>
              <Input
                type="select"
                name="UpperArea"
                id="upper-area"
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.UpperArea}
              >
                <option value="Unknown">Unkown</option>
                <option value="Sand">Sand</option>
                <option value="Shingle">Shingle</option>
                <option value="Rock">Rock</option>
                <option value="Harbour">Harbour</option>
                <option value="Concrete">Concrete</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="lower-area">Lower Area</Label>
              <Input
                type="select"
                name="LowerArea"
                id="lower-area"
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.LowerArea}
              >
                <option value="Unknown">Unkown</option>
                <option value="Sand">Sand</option>
                <option value="Shingle">Shingle</option>
                <option value="Rock">Rock</option>
                <option value="Harbour">Harbour</option>
                <option value="Concrete">Concrete</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone-number">Phone Number</Label>
              <Input
                type="text"
                name="PhoneNumber"
                id="phone-number"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.PhoneNumber}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="Email"
                id="email"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input
                type="text"
                name="Website"
                id="website"
                placeholder=""
                onChange={this.valueChanged}
                value={this.state.slipwayDetail.Website}
              />
            </FormGroup>
            <Button
              type="submit"
              color={this.formIsValid() && !this.state.sendingMessage ? "success" : "warning"}
              disabled={!this.formIsValid() && !this.state.sendingMessage}
            >
              {!this.state.sendingMessage ? "Submit" : "Cant Submit"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default EditSlipwayForm;
