import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import {
  Col, FormGroup, Label, Input, Button, Form, Card, CardBody, CardTitle
} from 'reactstrap';

const SignInPage = ({ history }) =>
  <Card className='authenticationCard'>
    <CardBody>
      <CardTitle>Sign In</CardTitle>
      <SignInForm history={history} />
      <SignUpLink />
    </CardBody>
  </Card>


const byPropKey = ( propertyName, value) => () => ({
  [propertyName] : value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {history} = this.props;
    
    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE});
        history.push(routes.LANDING)
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      })

    event.preventDefault();

  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = 
      password === '' ||
      email === '';

    return (
      <Form className='form' onSubmit={this.onSubmit}>
        <Col>
          <FormGroup>
            <Label>Email </Label>
            <Input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type='text'
              placeholder='Email Address'
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type='password'
              placeholder='Password'
            />
          </FormGroup>
        </Col>

        <Button disabled={isInvalid} type="submit">
          {isInvalid ? 'Cant Submit' : 'Submit'} 
        </Button> 

        {error && <p>{error.message}</p>}

      </Form>
    )
  }
}

export default withRouter(SignInPage);

export {SignInForm};