import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { auth } from '../firebase';
import firebase from 'firebase';
import * as routes from '../constants/routes';
import {
  Col, FormGroup, Label, Input, Button, Form, Card, CardBody, CardTitle
} from 'reactstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const SignInPage = ({ history }) =>
  <Card>
    <CardBody>
      <SignInForm history={history} />
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

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

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

      <div className='login-form'>
        <p><b>Sign in</b></p>

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        <br/>
        <br/>
        <p><b>Or sign in</b> with your email</p>
        <Form onSubmit={this.onSubmit}>
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
          <Col>
          <Button disabled={isInvalid} type="submit" color={isInvalid ? 'secondary' : 'success'}>
            {isInvalid ? 'Cant Submit' : 'Sign In'}
          </Button>
          </Col>
        </Form>

        {error && <p>{error.message}</p>}
        <br/>
        <br/>
        <p>Forgot your password? <Link to={routes.PASSWORD_FORGET}>Click here</Link></p>
        <p>Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>

      </div>
    )
  }
}

export default withRouter(SignInPage);

export {SignInForm};
