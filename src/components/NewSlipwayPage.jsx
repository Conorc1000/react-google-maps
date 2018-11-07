import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
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
  suitability: Joi.string()
    .min(3)
    .max(100)
    .required()
});

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/slipways"
    : "production-url-here";

class NewSlipway extends Component {
  formIsValid() {
    const slipway = {
      name: this.props.state.newSlipway.name,
      suitability: this.props.state.newSlipway.suitability
    };
    const result = Joi.validate(slipway, schema);

    return !result.error && this.haveUsersLocation;
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

    this.setState((prevState, props) => {
      console.log("props", props)
      return ({
      newSlipway: {
        ...props.newSlipway,
        [name]: value
      }
      })
    });
  };

  render() {
    return (
      <div className="message-form">
        <Card body>
          <CardTitle>Welcome To BoatLaunch</CardTitle>
          <CardText>Add a slipway at your location.</CardText>
          {!this.sendingMessage && !this.sentMessage ? (
            <Form onSubmit={this.formSubmitted}>
              <FormGroup>
                <Label for="name">Slipway Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add Slipway Name Here"
                  onChange={this.valueChanged}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select Suitability</Label>
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
              <Button type="submit" color="info" disabled={!this.formIsValid()}>
                Submit
              </Button>
            </Form>
          ) : (
            <img src={ripple} alt="logo" />
          )}
        </Card>
      </div>
    );
  }
}

export default NewSlipway;
