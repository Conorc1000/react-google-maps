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
import { updateSlipwayDetails, updateLatLng, getLatLngsSnapshot } from "../firebase/database";


const schema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),
  suitability: Joi.string().required(),
  latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required()
});

const INITIAL_STATE = {
  newSlipway: {
    Name: "",
    Suitability: "",
    latitude: 0,
    longitude: 0
  }
};

class NewSlipwayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  formIsValid() {
    const slipway = {
      name: this.state.newSlipway.Name,
      suitability: this.state.newSlipway.Suitability,
      latitude: this.state.newSlipway.latitude,
      longitude: this.state.newSlipway.longitude
    };
    const result = Joi.validate(slipway, schema);

    if (
      this.props.state.newLatitude === 0 &&
      this.props.state.newLongitude === 0
    ) {
      return false;
    }

    return !result.error;
  }

  reasonNotValid() {
    const slipway = {
      name: this.state.newSlipway.Name,
      suitability: this.state.newSlipway.Suitability,
      latitude: this.state.newSlipway.latitude,
      longitude: this.state.newSlipway.longitude
    };
    const result = Joi.validate(slipway, schema);

    if (
      this.props.state.newLatitude === 0 &&
      this.props.state.newLongitude === 0
    ) {
      return "Latitude and Longitude cant both be 0";
    }

    console.log("result.error", result.error)

    if( result.error ) {
      return result.error.toString();
    } else {
      return "";
    }
  }

  formSubmitted = event => {

    event.preventDefault();

    if (this.formIsValid()) {
      this.setState({
        sendingSlipway: true
      });

      getLatLngsSnapshot ((x, err) => {

        const largestKey = Object.keys(x).reduce((a, b) => a > b ? a : b)

        const thisKey = Number(largestKey) + 1

        const newSlipwayDetails = {
          Name: this.state.newSlipway.Name || null,
          Suitability: this.state.newSlipway.Suitability|| null,
          idKey: this.state.newSlipway.idKey || null,
          Charges: this.state.newSlipway.Charges || null,
          Directions: this.state.newSlipway.Directions || null,
          Facilities: this.state.newSlipway.Facilities || null,
          LowerArea: this.state.newSlipway.LowerArea || null,
          NavigationalHazards: this.state.newSlipway.NavigationalHazards || null,
          NearestPlace: this.state.newSlipway.NearestPlace || null,
          RampDescription: this.state.newSlipway.RampDescription || null,
          RampLength: this.state.newSlipway.RampLength || null,
          RampType: this.state.newSlipway.RampType || null,
          UpperArea: this.state.newSlipway.UpperArea || null,
          Website: this.state.newSlipway.Website || null,
          Email: this.state.newSlipway.Email || null,
          PhoneNumber: this.state.newSlipway.PhoneNumber || null,
          idKey:thisKey
        };

        const newLatLng = {
          idKey: thisKey,
          lat: this.props.state.newLatitude,
          lng: this.props.state.newLongitude
        }

        updateSlipwayDetails(newSlipwayDetails, (x, err) => {
          updateLatLng(newLatLng, (x, err) => {
            this.setState({
              createdSlipwayId: thisKey,
              sendingSlipway: false
            });

            console.log("this.state", this.state)
            console.log("this.props.state", this.props.state)

            return;
          })
        })
      })
    }
  };

  valueChanged = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        newSlipway: {
          ...prevState.newSlipway,
          [name]: value
        }
      };
    });
  };

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Add a new slipway</CardTitle>

          {!this.state.createdSlipwayId ? (
            <Form onSubmit={this.formSubmitted}>
              <FormGroup>
                <Label for="name">Slipway Name (Required)*</Label>
                <Input
                  type="text"
                  name="Name"
                  id="name"
                  placeholder="eg The Great Valley Slipway"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="latitude">Latitude (Required)* (click on map)</Label>
                <Input
                  type="text"
                  name="latitude"
                  id="latitude"
                  placeholder="click on map"
                  onChange={this.valueChanged}
                  value={this.props.state.newLatitude}
                />
              </FormGroup>
              <FormGroup>
                <Label for="longitude">Longitude (Required)* (click on map)</Label>
                <Input
                  type="text"
                  name="longitude"
                  id="longitude"
                  placeholder="click on map"
                  onChange={this.valueChanged}
                  value={this.props.state.newLongitude}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="RampDescription"
                  id="description"
                  placeholder=""
                  onChange={this.valueChanged}
                  rows="3"
                />
              </FormGroup>
              <FormGroup>
                <Label for="directions">Directions</Label>
                <Input
                  type="text"
                  name="Directions"
                  id="directions"
                  placeholder=""
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="facilities">Facilities</Label>
                <Input
                  type="text"
                  name="Facilities"
                  id="facilities"
                  placeholder="eg Public Bathrooms"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="navigational-hazards">Navigational Hazards</Label>
                <Input
                  type="text"
                  name="NavigationalHazards"
                  id="navigational-hazards"
                  placeholder=""
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="charges">Charges</Label>
                <Input
                  type="text"
                  name="Charges"
                  id="charges"
                  placeholder="eg £5 per launch"
                  onChange={this.valueChanged}
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="suitability">Select Suitability (Required)*</Label>
                <Input
                  type="select"
                  name="Suitability"
                  id="suitability"
                  onChange={this.valueChanged}
                >
                  <option value="unknown">Unkown</option>
                  <option value="portable">Portable Only</option>
                  <option value="small">Small trailer can be pushed</option>
                  <option value="large">Large trailer needs a car</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ramp-length">Ramp Length</Label>
                <Input
                  type="select"
                  name="RampLength"
                  id="ramp-length"
                  onChange={this.valueChanged}
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
                  placeholder="eg 079101....."
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="Email"
                  id="email"
                  placeholder="eg name@domain.com"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              {this.formIsValid() && !this.state.sendingSlipway ? (
                <Button type="submit" color="success">
                  Submit
                </Button>
              ) : (
                <div>
                  <Button type="submit" color="warning" disabled="true">
                    Cant Submit
                  </Button>

                  <p>
                    {this.reasonNotValid().replace(
                      /(ValidationError:|child |\[|\])*/gm,
                      ""
                    )}
                  </p>
                </div>
              )}
            </Form>
          ) : (
            <div>
              <h3>Slipway created</h3>
              <a href={(`/view-slipway/`+ this.state.createdSlipwayId)}>View Slipway</a>
            </div>
          )}
        </CardBody>
      </Card>
    );
  }
}
//<img src={ripple} alt="logo" />

export default NewSlipwayForm;
