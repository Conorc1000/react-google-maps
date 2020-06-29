import React, { Component } from 'react';
import { auth } from '../firebase';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE ={
  email: ''
}

const byPropKey = ( propertyName, value) => () => ({
  [propertyName] : value,
});

class PasswordForgetPage extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {email} = this.state;

    console.log("", this.state)


    auth.doPasswordReset(email).then(function() {
      console.log("success")

      alert("Email sent - Please check your inbox");

    }).catch(function(error) {

      console.log("error")
      alert("Unable to send password reset email. Please contact us if the problem persists");
    });

    event.preventDefault();

  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Would you like to reset your password?</CardTitle>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="Email"
                id="email"
                placeholder="eg name@domain.com"
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                value={this.state.Email}
              />
            </FormGroup>
            <Button color="warning" type="submit">
              Send password reset email
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(PasswordForgetPage);
