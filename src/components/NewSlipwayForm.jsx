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

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/slipways"
    : "production-url-here";

const INITIAL_STATE = {
  newSlipway: {
    name: "",
    suitability: "",
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
      name: this.state.newSlipway.name,
      suitability: this.state.newSlipway.suitability,
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

    console.log("result.error", result.error);

    return !result.error;
  }

  reasonNotValid() {
    const slipway = {
      name: this.state.newSlipway.name,
      suitability: this.state.newSlipway.suitability,
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

    console.log("result.error", result.error);

    return result.error.toString();
  }

  formSubmitted = event => {
    event.preventDefault();
    const userSlipway = {
      name: this.state.newSlipway.name,
      suitability: this.state.newSlipway.suitability,
      latitude: this.state.location.lat,
      longitude: this.state.location.lng
    };

    if (this.formIsValid()) {
      this.setState({
        sendingMessage: true
      });
      fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(userSlipway)
      })
        .then(res => res.json())
        .then(message => {
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
              sentMessage: true
            });
          }, 2000);
        });
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

          {!this.sendingMessage && !this.sentMessage ? (
            <Form onSubmit={this.formSubmitted}>
              <FormGroup>
                <Label for="name">Slipway Name*</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="eg The Great Valley Slipway"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="latitude">Latitude* (click on map)</Label>
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
                <Label for="longitude">Longitude* (click on map)</Label>
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
                  name="description"
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
                  name="directions"
                  id="directions"
                  placeholder=""
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="facilities">Facilities</Label>
                <Input
                  type="text"
                  name="facilities"
                  id="facilities"
                  placeholder="eg Public Bathrooms"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="navigational-hazards">Navigational Hazards</Label>
                <Input
                  type="text"
                  name="navigational-hazards"
                  id="navigational-hazards"
                  placeholder=""
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="charges">Charges</Label>
                <Input
                  type="text"
                  name="charges"
                  id="charges"
                  placeholder="eg £5 per launch"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="ramp-type">Ramp Type</Label>
                <Input
                  type="text"
                  name="ramp-type"
                  id="ramp-type"
                  placeholder="eg Concrete"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="suitability">Select Suitability*</Label>
                <Input
                  type="select"
                  name="suitability"
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
                  name="ramp-length"
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
                  name="upper-area"
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
                  name="lower-area"
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
                  name="phone-number"
                  id="phone-number"
                  placeholder="eg 079101....."
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="eg name@domain.com"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              {this.formIsValid() ? (
                <Button type="submit" color="success">
                  Submit
                </Button>
              ) : (
                <div>
                  <Button type="submit" color="warning" disabled="true">
                    Cant Submit
                  </Button>
                  <p>
                    Validation Error:
                    {this.reasonNotValid().replace(
                      /(ValidationError:|child |\[|\])*/gm,
                      ""
                    )}
                  </p>
                </div>
              )}
            </Form>
          ) : (
            <img src={ripple} alt="logo" />
          )}
        </CardBody>
      </Card>
    );
  }
}

export default NewSlipwayForm;
