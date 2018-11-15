import React, {Component} from 'react';
import { 
    Link,
    withRouter, 
  } from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import {
  Col, FormGroup, Label, Input, Button, Form, Card, CardBody, CardTitle
} from 'reactstrap';

const SignUpPage = ({history}) =>
  <Card>
    <CardBody>
      <CardTitle>Sign Up</CardTitle>
      <SignUpForm history={history} />
    </CardBody>
  </Card>


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
   //   username,
      email,
      passwordOne,
    } = this.state;
    
    const {
      history,
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.LANDING)
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      })
    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Form onSubmit={this.onSubmit}>
       <Col>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              value = {username}
              onChange = {event => this.setState(byPropKey('username', event.target.value))}
              type = "text"
              placeholder = "Full Name"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </FormGroup>
        </Col>      
        <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
           />
          </FormGroup>
        </Col>   
        <Col>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
          </FormGroup>
        </Col>                  
       
        <Button disabled={isInvalid} type="submit">
          {isInvalid ? 'Cant Submit' : 'Submit'} 
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    )
  }

}

const SignUpLink = () =>
  <p>
    Dont have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink
}